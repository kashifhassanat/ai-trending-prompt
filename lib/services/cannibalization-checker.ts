import { CannibalizationCheckResult, SearchIntent } from '@/lib/types';
import { ALL_ARTICLES } from '@/lib/data/articles-data';

export interface ProposedArticleParams {
  title: string;
  targetQuery: string;
  searchIntent?: SearchIntent;
  categorySlug?: string;
  slug?: string;
}

/**
 * Checks existing site content to prevent keyword cannibalization and thin duplicate PSEO pages.
 */
export function checkCannibalization(proposed: ProposedArticleParams): CannibalizationCheckResult {
  const proposedNormalized = proposed.title.toLowerCase().trim();
  const proposedQuery = (proposed.targetQuery || proposed.title).toLowerCase().trim();
  const proposedSlug = (proposed.slug || proposed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).trim();

  let highestOverlap = 0;
  let overlappingArticle: (typeof ALL_ARTICLES)[0] | null = null;
  let reason = '';

  for (const existing of ALL_ARTICLES) {
    const existingTitle = existing.title.toLowerCase();
    const existingSlug = existing.slug.toLowerCase();
    const existingTarget = (existing.targetQuery || existing.title).toLowerCase();

    // 1. Exact slug match
    if (existingSlug === proposedSlug) {
      highestOverlap = 100;
      overlappingArticle = existing;
      reason = `Exact URL slug collision with published article "${existing.title}".`;
      break;
    }

    // 2. Exact keyword target match
    if (existingTarget.includes(proposedQuery) || proposedQuery.includes(existingTarget)) {
      const overlap = 90;
      if (overlap > highestOverlap) {
        highestOverlap = overlap;
        overlappingArticle = existing;
        reason = `Both articles target the same primary query "${proposedQuery}".`;
      }
    }

    // 3. High word overlap in titles
    const proposedWords = new Set(proposedNormalized.split(/\s+/).filter(w => w.length > 3));
    const existingWords = new Set(existingTitle.split(/\s+/).filter(w => w.length > 3));

    let commonCount = 0;
    proposedWords.forEach(w => {
      if (existingWords.has(w)) commonCount++;
    });

    const jaccard = proposedWords.size > 0 ? (commonCount / proposedWords.size) * 100 : 0;
    if (jaccard > 70 && jaccard > highestOverlap) {
      highestOverlap = Math.round(jaccard);
      overlappingArticle = existing;
      reason = `High semantic similarity (${Math.round(jaccard)}% title term overlap) with "${existing.title}".`;
    }
  }

  if (highestOverlap >= 85) {
    return {
      status: 'RED',
      primaryMatch: {
        articleId: overlappingArticle!.id,
        title: overlappingArticle!.title,
        slug: overlappingArticle!.slug,
        overlapScore: highestOverlap,
        reason
      },
      recommendation: `Do NOT publish a separate article for this intent. Instead, either: (1) Expand the existing article "${overlappingArticle!.title}", (2) Carve out a distinct subtopic (e.g. focusing specifically on VHS or Neon portraits), or (3) Change the search intent to HOW_TO or COMPARISON.`,
      alternativeAngles: [
        `7 80s VHS Camcorder AI Photo Prompts (Style Subtopic)`,
        `80s Studio vs Neon Arcade: How to Prompt Both Looks (Comparison Intent)`,
        `How to Emulate Authentic 80s Kodachrome in Midjourney (How-To Intent)`
      ]
    };
  }

  if (highestOverlap >= 50) {
    return {
      status: 'YELLOW',
      primaryMatch: {
        articleId: overlappingArticle!.id,
        title: overlappingArticle!.title,
        slug: overlappingArticle!.slug,
        overlapScore: highestOverlap,
        reason
      },
      recommendation: `Potential topical overlap detected with "${overlappingArticle!.title}". Ensure your content angle, prompt examples, and search intent are explicitly differentiated and cross-linked.`,
      alternativeAngles: [
        `Specify a more granular niche (e.g., decade sub-genre or specific camera model)`,
        `Target a specific creator use case (e.g. Album Covers or Lookbooks)`
      ]
    };
  }

  return {
    status: 'GREEN',
    recommendation: 'New distinct search opportunity. No significant keyword cannibalization detected with existing published pages.',
    alternativeAngles: []
  };
}
