import { InternalLinkSuggestion, InboundLinkOpportunity, BidirectionalLinkReport, Article } from '@/lib/types';
import { ALL_ARTICLES } from '@/lib/data/articles-data';

/**
 * Generates Bidirectional Internal Linking Intelligence:
 * 1. Outbound Suggestions: What the new article should link out to among existing articles.
 * 2. Inbound Opportunities: Which existing articles should be edited to link into this new page.
 */
export function generateBidirectionalLinks(article: Partial<Article>): BidirectionalLinkReport {
  const outboundSuggestions: InternalLinkSuggestion[] = [];
  const inboundOpportunities: InboundLinkOpportunity[] = [];

  const currentTitleWords = (article.title || '').toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const currentQuery = (article.primaryQuery || article.title || '').toLowerCase();
  const currentSlug = article.slug || '';

  for (const candidate of ALL_ARTICLES) {
    if (candidate.id === article.id || candidate.slug === currentSlug) {
      continue;
    }

    const candidateTitleWords = candidate.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const common = currentTitleWords.filter(w => candidateTitleWords.includes(w));
    const isSameCategory = candidate.categorySlug === article.categorySlug;
    const isSameCluster = candidate.topicClusterId === article.topicClusterId;

    // 1. OUTBOUND SUGGESTIONS (New Article -> Existing)
    if (isSameCluster || isSameCategory || common.length > 0) {
      let reason = '';
      if (isSameCluster) {
        reason = `Topic Cluster Proximity (${candidate.parentTopic || 'Styles'} Cluster)`;
      } else if (isSameCategory) {
        reason = `Taxonomy Match in "${candidate.categoryName}"`;
      } else {
        reason = `Thematic overlap on terms: "${common.join(', ')}"`;
      }

      outboundSuggestions.push({
        id: `out-${candidate.id}`,
        targetArticleTitle: candidate.title,
        targetSlug: candidate.slug,
        categoryName: candidate.categoryName,
        reason,
        accepted: true
      });

      // 2. INBOUND OPPORTUNITIES (Existing -> New Article)
      // Identify contextual insertion opportunities in the existing article
      let targetSection = 'Related Prompts & Styles';
      let suggestedAnchor = article.primaryQuery || article.title || 'related guide';

      if (currentQuery.includes('retro') || currentQuery.includes('80s')) {
        targetSection = 'Era & Period Photography Section';
        suggestedAnchor = '80s retro prompt recipes';
      } else if (currentQuery.includes('film') || currentQuery.includes('kodachrome')) {
        targetSection = 'Film Emulation & Color Tuning';
        suggestedAnchor = 'vintage analog film formulas';
      } else if (currentQuery.includes('neon') || currentQuery.includes('arcade')) {
        targetSection = 'Lighting Techniques & Optical Glow';
        suggestedAnchor = 'neon arcade lighting setup';
      }

      inboundOpportunities.push({
        id: `inb-${candidate.id}`,
        sourceArticleId: candidate.id,
        sourceArticleTitle: candidate.title,
        sourceSlug: candidate.slug,
        suggestedAnchorText: suggestedAnchor,
        targetSection,
        reason: `Existing high-authority article "${candidate.title}" discusses topics directly relevant to this new page and should pass PageRank equity.`,
        reviewed: false,
        accepted: false
      });
    }
  }

  return {
    outboundSuggestions,
    inboundOpportunities
  };
}

/**
 * Legacy compatibility helper
 */
export function suggestInternalLinks(currentArticle: Partial<Article>): InternalLinkSuggestion[] {
  return generateBidirectionalLinks(currentArticle).outboundSuggestions;
}
