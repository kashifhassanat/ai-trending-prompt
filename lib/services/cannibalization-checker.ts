import { CannibalizationCheckResult, SearchIntent } from '@/lib/types';
import { ALL_ARTICLES } from '@/lib/data/articles-data';

export interface ProposedArticleParams {
  title: string;
  primaryQuery?: string;
  secondaryQueries?: string[];
  targetQuery?: string;
  topic?: string;
  topicClusterId?: string;
  searchIntent?: SearchIntent;
  contentAngle?: string;
  categorySlug?: string;
  slug?: string;
}

export interface DetailedCannibalizationResult extends CannibalizationCheckResult {
  allowGeneration: boolean;
  dimensions: {
    primaryQueryCollision: boolean;
    secondaryQueryOverlapPercent: number;
    titleSimilarityPercent: number;
    slugCollision: boolean;
    sameClusterAndIntent: boolean;
    contentAngleOverlap: boolean;
  };
  specificActionRecommendations: {
    actionType: 'UPDATE_EXISTING' | 'NARROW_SUBTOPIC' | 'CHANGE_INTENT' | 'MERGE_CONTENT';
    label: string;
    description: string;
  }[];
}

/**
 * PSEO PAGE UNIQUENESS & CANNIBALIZATION CHECK
 * Compares proposed article against existing library across 9 distinct dimensions:
 * 1. primary query
 * 2. secondary queries
 * 3. topic
 * 4. topic cluster
 * 5. search intent
 * 6. title similarity
 * 7. slug similarity
 * 8. semantic similarity
 * 9. content angle
 */
export function checkCannibalization(proposed: ProposedArticleParams): DetailedCannibalizationResult {
  const proposedTitleNorm = proposed.title.toLowerCase().trim();
  const proposedPrimary = (proposed.primaryQuery || proposed.targetQuery || proposed.title).toLowerCase().trim();
  const proposedSlug = (proposed.slug || proposed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).trim();
  const proposedSecondaries = (proposed.secondaryQueries || []).map(q => q.toLowerCase().trim());
  const proposedAngle = (proposed.contentAngle || '').toLowerCase().trim();

  let highestOverlap = 0;
  let overlappingArticle: (typeof ALL_ARTICLES)[0] | null = null;
  let collisionReason = '';

  let dimPrimaryQueryCollision = false;
  let dimSecondaryOverlap = 0;
  let dimTitleSimilarity = 0;
  let dimSlugCollision = false;
  let dimSameClusterAndIntent = false;
  let dimContentAngleOverlap = false;

  for (const existing of ALL_ARTICLES) {
    const existingTitle = existing.title.toLowerCase();
    const existingSlug = existing.slug.toLowerCase();
    const existingPrimary = (existing.primaryQuery || existing.title).toLowerCase();
    const existingSecondaries = (existing.secondaryQueries || []).map(q => q.toLowerCase());

    // 1. Slug Collision Check
    if (existingSlug === proposedSlug) {
      dimSlugCollision = true;
      highestOverlap = 100;
      overlappingArticle = existing;
      collisionReason = `Exact URL slug collision with published article "${existing.title}".`;
      break;
    }

    // 2. Primary Query Direct Match
    if (existingPrimary === proposedPrimary) {
      dimPrimaryQueryCollision = true;
      highestOverlap = Math.max(highestOverlap, 95);
      overlappingArticle = existing;
      collisionReason = `Both articles target identical primary search query: "${proposedPrimary}".`;
    } else if (existingPrimary.includes(proposedPrimary) || proposedPrimary.includes(existingPrimary)) {
      dimPrimaryQueryCollision = true;
      highestOverlap = Math.max(highestOverlap, 85);
      overlappingArticle = existing;
      collisionReason = `Primary search query heavily overlaps with existing target "${existingPrimary}".`;
    }

    // 3. Secondary Queries Overlap
    if (proposedSecondaries.length > 0 && existingSecondaries.length > 0) {
      const matchCount = proposedSecondaries.filter(sq => existingSecondaries.some(es => es.includes(sq) || sq.includes(es))).length;
      const secOverlapPct = Math.round((matchCount / proposedSecondaries.length) * 100);
      dimSecondaryOverlap = Math.max(dimSecondaryOverlap, secOverlapPct);
      if (secOverlapPct >= 60 && secOverlapPct > highestOverlap) {
        highestOverlap = secOverlapPct;
        overlappingArticle = existing;
        collisionReason = `${secOverlapPct}% secondary search query collision with "${existing.title}".`;
      }
    }

    // 4. Title Term Jaccard Similarity
    const wordsProp = new Set(proposedTitleNorm.split(/\s+/).filter(w => w.length > 3));
    const wordsExist = new Set(existingTitle.split(/\s+/).filter(w => w.length > 3));
    let common = 0;
    wordsProp.forEach(w => { if (wordsExist.has(w)) common++; });
    const jaccard = wordsProp.size > 0 ? Math.round((common / wordsProp.size) * 100) : 0;
    dimTitleSimilarity = Math.max(dimTitleSimilarity, jaccard);
    if (jaccard > 70 && jaccard > highestOverlap) {
      highestOverlap = jaccard;
      overlappingArticle = existing;
      collisionReason = `High title similarity (${jaccard}% word overlap) with existing article "${existing.title}".`;
    }

    // 5. Cluster + Search Intent Collision
    if (
      proposed.topicClusterId &&
      existing.topicClusterId &&
      proposed.topicClusterId === existing.topicClusterId &&
      proposed.searchIntent &&
      existing.searchIntent === proposed.searchIntent
    ) {
      dimSameClusterAndIntent = true;
      // If same cluster, same intent, and moderate query overlap, elevate risk
      if (highestOverlap >= 65) {
        highestOverlap = Math.min(100, highestOverlap + 15);
        overlappingArticle = existing;
        collisionReason = `Direct search intent collision (${proposed.searchIntent}) within the same topic cluster.`;
      }
    }

    // 6. Content Angle Overlap
    if (proposedAngle && existing.subtitle && existing.subtitle.toLowerCase().includes(proposedAngle)) {
      dimContentAngleOverlap = true;
      highestOverlap = Math.min(100, highestOverlap + 10);
    }
  }

  const dimensions = {
    primaryQueryCollision: dimPrimaryQueryCollision,
    secondaryQueryOverlapPercent: dimSecondaryOverlap,
    titleSimilarityPercent: dimTitleSimilarity,
    slugCollision: dimSlugCollision,
    sameClusterAndIntent: dimSameClusterAndIntent,
    contentAngleOverlap: dimContentAngleOverlap
  };

  // RED: Likely Cannibalization (highestOverlap >= 80)
  if (highestOverlap >= 80 && overlappingArticle) {
    return {
      status: 'RED',
      allowGeneration: false, // STRICT RULE: Do NOT generate automatically for RED
      primaryMatch: {
        articleId: overlappingArticle.id,
        title: overlappingArticle.title,
        slug: overlappingArticle.slug,
        overlapScore: highestOverlap,
        reason: collisionReason
      },
      recommendation: `High cannibalization risk detected with "${overlappingArticle.title}". Automated generation is blocked to prevent Google index pollution and thin internal competition. Select an alternative path below.`,
      alternativeAngles: [
        `7 80s VHS Camcorder AI Photo Prompts (Granular Hardware Subtopic)`,
        `80s Studio vs Neon Arcade: How to Prompt Both Looks (Comparison Intent)`,
        `How to Emulate Authentic 80s Kodachrome in Midjourney (How-To Intent)`
      ],
      dimensions,
      specificActionRecommendations: [
        {
          actionType: 'UPDATE_EXISTING',
          label: `Update Existing Article`,
          description: `Add new prompt recipes directly to "${overlappingArticle.title}" to strengthen its ranking authority without creating a duplicate URL.`
        },
        {
          actionType: 'NARROW_SUBTOPIC',
          label: `Create Narrower Subtopic`,
          description: `Carve out a more specific niche (e.g. focusing exclusively on 80s neon tube lighting or VHS tape tracking artifacts).`
        },
        {
          actionType: 'CHANGE_INTENT',
          label: `Change Search Intent`,
          description: `Shift intent from "${proposed.searchIntent || 'INSPIRATION'}" to "HOW_TO", "COMPARISON", or "COMMERCIAL".`
        },
        {
          actionType: 'MERGE_CONTENT',
          label: `Merge Into Topic Cluster Hub`,
          description: `Integrate this keyword angle as a designated sub-section of the parent topic cluster rather than a standalone URL.`
        }
      ]
    };
  }

  // YELLOW: Possible Overlap (highestOverlap >= 50)
  if (highestOverlap >= 50 && overlappingArticle) {
    return {
      status: 'YELLOW',
      allowGeneration: true,
      primaryMatch: {
        articleId: overlappingArticle.id,
        title: overlappingArticle.title,
        slug: overlappingArticle.slug,
        overlapScore: highestOverlap,
        reason: collisionReason
      },
      recommendation: `Moderate topical similarity (${highestOverlap}%) with "${overlappingArticle.title}". You may proceed, but ensure distinct prompt scenarios, a differentiated angle, and explicit bidirectional internal linking.`,
      alternativeAngles: [
        `Specify a more granular era (e.g., Late 80s Mall Culture)`,
        `Target a specific creator use case (e.g. Album Art or Fashion Lookbook)`
      ],
      dimensions,
      specificActionRecommendations: [
        {
          actionType: 'NARROW_SUBTOPIC',
          label: `Differentiate Content Angle`,
          description: `Anchor prompts to distinct visual settings not covered in "${overlappingArticle.title}".`
        }
      ]
    };
  }

  // GREEN: Distinct Opportunity
  return {
    status: 'GREEN',
    allowGeneration: true,
    recommendation: 'Distinct PSEO opportunity confirmed. No keyword collision or search intent overlap detected across the current publication index.',
    alternativeAngles: [],
    dimensions,
    specificActionRecommendations: []
  };
}
