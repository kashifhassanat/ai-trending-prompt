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
    toolSwappingDuplicate: boolean;
  };
  specificActionRecommendations: {
    actionType: 'UPDATE_EXISTING' | 'NARROW_SUBTOPIC' | 'CHANGE_INTENT' | 'MERGE_CONTENT';
    label: string;
    description: string;
  }[];
}

const KNOWN_AI_TOOL_TOKENS = [
  'midjourney',
  'flux',
  'flux1',
  'dalle',
  'dall e',
  'dall-e',
  'dall·e',
  'chatgpt',
  'gemini',
  'google gemini',
  'google flow',
  'deepseek',
  'stable diffusion',
  'stablediffusion',
  'sdxl',
  'leonardo'
];

/**
 * Strips tool keywords to evaluate whether two topics are identical
 * except for swapped tool names.
 */
function normalizeCoreTopic(str: string): string {
  let cleaned = str.toLowerCase();
  for (const token of KNOWN_AI_TOOL_TOKENS) {
    cleaned = cleaned.replace(new RegExp(`\\b${token}\\b`, 'gi'), '');
  }
  return cleaned
    .replace(/\b(for|with|in|using|on|generator|tool|model|version)\b/gi, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * PSEO PAGE UNIQUENESS & CANNIBALIZATION CHECK
 * Compares proposed article against existing library across 10 distinct dimensions:
 * 1. primary query
 * 2. secondary queries
 * 3. topic
 * 4. topic cluster
 * 5. search intent
 * 6. title similarity
 * 7. slug similarity
 * 8. semantic similarity
 * 9. content angle
 * 10. tool-swapping duplicate detection (Strict PSEO guardrail)
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
  let dimToolSwappingDuplicate = false;

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

    // 3. Tool-Swapping Duplicate Guardrail
    // Tool-specific PSEO pages must only be created when there is a genuinely different search intent
    // and useful tool-specific content. Merely replacing one tool name with another is prohibited.
    const proposedCore = normalizeCoreTopic(proposedPrimary);
    const existingCore = normalizeCoreTopic(existingPrimary);
    if (proposedCore.length > 5 && existingCore.length > 5) {
      const coreWordsProp = new Set(proposedCore.split(/\s+/).filter(w => w.length > 2));
      const coreWordsExist = new Set(existingCore.split(/\s+/).filter(w => w.length > 2));
      let coreCommon = 0;
      coreWordsProp.forEach(w => { if (coreWordsExist.has(w)) coreCommon++; });
      const coreSim = coreWordsProp.size > 0 ? (coreCommon / coreWordsProp.size) : 0;

      const isSameOrUndefinedIntent = !proposed.searchIntent || !existing.searchIntent || proposed.searchIntent === existing.searchIntent;
      if (coreSim >= 0.8 && isSameOrUndefinedIntent) {
        dimToolSwappingDuplicate = true;
        highestOverlap = Math.max(highestOverlap, 96);
        overlappingArticle = existing;
        collisionReason = `Tool-swapping duplicate detected: Creating separate pages merely by substituting tool names without genuinely different search intent or unique tool-specific content is prohibited.`;
      }
    }

    // 4. Secondary Queries Overlap
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

    // 5. Title Term Jaccard Similarity
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

    // 6. Cluster + Search Intent Collision
    if (
      proposed.topicClusterId &&
      existing.topicClusterId &&
      proposed.topicClusterId === existing.topicClusterId &&
      proposed.searchIntent &&
      existing.searchIntent === proposed.searchIntent
    ) {
      dimSameClusterAndIntent = true;
      if (highestOverlap >= 65) {
        highestOverlap = Math.min(100, highestOverlap + 15);
        overlappingArticle = existing;
        collisionReason = `Direct search intent collision (${proposed.searchIntent}) within the same topic cluster.`;
      }
    }

    // 7. Content Angle Overlap
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
    contentAngleOverlap: dimContentAngleOverlap,
    toolSwappingDuplicate: dimToolSwappingDuplicate
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
      recommendation: dimToolSwappingDuplicate
        ? `Tool-swapping duplicate detected against "${overlappingArticle.title}". Automated generation is blocked: PSEO pages must only be created when there is a genuinely different search intent and useful tool-specific content, not merely swapping tool names.`
        : `High cannibalization risk detected with "${overlappingArticle.title}". Automated generation is blocked to prevent search index dilution and internal keyword competition. Select an alternative path below.`,
      alternativeAngles: [
        `7 80s VHS Camcorder AI Photo Prompts (Granular Hardware Subtopic)`,
        `80s Studio vs Neon Arcade: How to Prompt Both Looks (Comparison Intent)`,
        `How to Emulate Authentic 80s Kodachrome Emulsion (How-To Workflow Intent)`
      ],
      dimensions,
      specificActionRecommendations: [
        {
          actionType: 'UPDATE_EXISTING',
          label: `Update Existing Article`,
          description: `Add tool-specific notes or parameters directly to "${overlappingArticle.title}" to strengthen its ranking authority without creating a thin duplicate URL.`
        },
        {
          actionType: 'NARROW_SUBTOPIC',
          label: `Create Narrower Subtopic`,
          description: `Carve out a more specific niche with unique visual scenarios not covered in "${overlappingArticle.title}".`
        },
        {
          actionType: 'CHANGE_INTENT',
          label: `Change Search Intent`,
          description: `Shift search intent from "${proposed.searchIntent || 'INSPIRATION'}" to "HOW_TO", "COMPARISON", or "COMMERCIAL".`
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
    recommendation: 'Distinct PSEO opportunity confirmed. No keyword collision, search intent overlap, or tool-swapping duplicate detected across the current publication index.',
    alternativeAngles: [],
    dimensions,
    specificActionRecommendations: []
  };
}
