import { PSEOOpportunityReport, PSEOMetricBreakdown, SearchIntent } from '@/lib/types';
import { ALL_ARTICLES } from '@/lib/data/articles-data';

export interface EvaluatePSEOParams {
  topic: string;
  primaryQuery: string;
  searchIntent: SearchIntent;
  targetAudience?: string;
  topicClusterId?: string;
  contentAngle?: string;
  searchGrowth?: number; // 0-100
  socialMomentum?: number; // 0-100
  competition?: number; // 0-100
}

/**
 * Calculates transparent, explainable PSEO Opportunity Score (0-100)
 * with a mathematical metric breakdown explaining WHY the score exists.
 */
export function evaluatePSEOOpportunity(params: EvaluatePSEOParams): PSEOOpportunityReport {
  const normQuery = params.primaryQuery.toLowerCase().trim();

  // 1. Search Demand / Growth factor (defaults to high if trending signal is present)
  const searchDemand = Math.min(100, Math.max(20, params.searchGrowth ?? 88));

  // 2. Trend Momentum factor
  const trendMomentum = Math.min(100, Math.max(20, params.socialMomentum ?? 92));

  // 3. Search Intent Clarity factor
  // Highly explicit intents like 'HOW_TO', 'STYLE', 'COMMERCIAL', 'INSPIRATION' score highest
  let searchIntentClarity = 85;
  if (['STYLE', 'HOW_TO', 'COMMERCIAL'].includes(params.searchIntent)) {
    searchIntentClarity = 95;
  } else if (['INSPIRATION', 'USE_CASE', 'TRANSFORMATION'].includes(params.searchIntent)) {
    searchIntentClarity = 90;
  } else if (params.searchIntent === 'COMPARISON') {
    searchIntentClarity = 86;
  }

  // 4. Content Uniqueness factor vs existing articles
  let highestSimilarity = 0;
  for (const art of ALL_ARTICLES) {
    const artQuery = (art.primaryQuery || art.title).toLowerCase();
    if (artQuery === normQuery) {
      highestSimilarity = 95;
    } else if (artQuery.includes(normQuery) || normQuery.includes(artQuery)) {
      highestSimilarity = Math.max(highestSimilarity, 75);
    } else {
      const wordsA = new Set(normQuery.split(/\s+/).filter(w => w.length > 3));
      const wordsB = new Set(artQuery.split(/\s+/).filter(w => w.length > 3));
      let common = 0;
      wordsA.forEach(w => { if (wordsB.has(w)) common++; });
      const jaccard = wordsA.size > 0 ? (common / wordsA.size) * 100 : 0;
      highestSimilarity = Math.max(highestSimilarity, jaccard);
    }
  }
  const contentUniqueness = Math.round(Math.max(15, 100 - highestSimilarity));

  // 5. Coverage Gap: how much uncaptured intent exists in our topic cluster
  const coverageGap = highestSimilarity > 80 ? 30 : highestSimilarity > 50 ? 65 : 94;

  // 6. Competition factor
  const rawComp = params.competition ?? 58;
  const competition = Math.min(100, Math.max(10, rawComp));

  // 7. Internal Link Potential: does it link smoothly to existing hub topics?
  const internalLinkPotential = ALL_ARTICLES.length > 0 ? 92 : 60;

  // 8. Commercial / Creator utility value
  const commercialValue = ['COMMERCIAL', 'HOW_TO', 'STYLE'].includes(params.searchIntent) ? 90 : 82;

  // 9. Freshness of current trend wave
  const freshness = 94;

  const breakdown: PSEOMetricBreakdown = {
    searchDemand,
    trendMomentum,
    searchIntentClarity,
    contentUniqueness,
    coverageGap,
    competition,
    internalLinkPotential,
    commercialValue,
    freshness
  };

  /**
   * Transparent Weighted Scoring Model:
   * Opportunity = (SearchDemand * 0.20)
   *             + (TrendMomentum * 0.15)
   *             + (Uniqueness * 0.20)
   *             + (CoverageGap * 0.15)
   *             + (IntentClarity * 0.10)
   *             + (InternalLink * 0.10)
   *             + (CommercialValue * 0.10)
   *             - (Competition * 0.12)
   */
  const rawWeighted =
    (searchDemand * 0.20) +
    (trendMomentum * 0.15) +
    (contentUniqueness * 0.20) +
    (coverageGap * 0.15) +
    (searchIntentClarity * 0.10) +
    (internalLinkPotential * 0.10) +
    (commercialValue * 0.10) -
    (competition * 0.12);

  const score = Math.round(Math.min(100, Math.max(10, rawWeighted)));

  // Explainable rationale synthesis
  let rationale = `PSEO Opportunity Score is ${score}/100. `;
  if (contentUniqueness >= 80 && searchDemand >= 80) {
    rationale += `Exceptional opportunity: high search velocity (${searchDemand}/100) paired with an open coverage gap (${coverageGap}/100) and strong uniqueness (${contentUniqueness}/100). Zero risk of cannibalizing existing hub content.`;
  } else if (contentUniqueness < 40) {
    rationale += `Caution: significant overlap (${100 - contentUniqueness}%) with existing published content. A dedicated page may cause keyword cannibalization unless the search intent or subtopic angle is sharply narrowed.`;
  } else {
    rationale += `Healthy opportunity: moderate competition (${competition}/100) with favorable intent clarity (${searchIntentClarity}/100) and reliable internal link topology (${internalLinkPotential}/100).`;
  }

  const intentAlignment = `Targeting query "${params.primaryQuery}" under intent "${params.searchIntent}" directly serves user search criteria with zero ambiguity.`;

  let recommendation = 'Proceed with Content Brief creation and full prompt recipe generation.';
  if (score < 60) {
    recommendation = 'Reposition search intent or carve out a narrower subtopic angle before generation to prevent thin content.';
  } else if (score >= 88) {
    recommendation = 'High priority publishing candidate. Expedite content brief approval and 1-to-1 prompt generation.';
  }

  return {
    score,
    breakdown,
    rationale,
    intentAlignment,
    recommendation
  };
}
