import { InternalLinkSuggestion, Article } from '@/lib/types';
import { ALL_ARTICLES } from '@/lib/data/articles-data';

export function suggestInternalLinks(currentArticle: Partial<Article>): InternalLinkSuggestion[] {
  const suggestions: InternalLinkSuggestion[] = [];

  for (const candidate of ALL_ARTICLES) {
    if (candidate.id === currentArticle.id || candidate.slug === currentArticle.slug) {
      continue;
    }

    // Check category match
    if (candidate.categorySlug === currentArticle.categorySlug) {
      suggestions.push({
        id: `sug-${candidate.id}`,
        targetArticleTitle: candidate.title,
        targetSlug: candidate.slug,
        categoryName: candidate.categoryName,
        reason: `Shared taxonomy category (${candidate.categoryName}) within same visual cluster`,
        accepted: true
      });
      continue;
    }

    // Check semantic keyword overlap
    const currentTitleWords = (currentArticle.title || '').toLowerCase().split(/\s+/);
    const candidateTitleWords = candidate.title.toLowerCase().split(/\s+/);
    const common = currentTitleWords.filter(w => w.length > 3 && candidateTitleWords.includes(w));

    if (common.length > 0) {
      suggestions.push({
        id: `sug-${candidate.id}`,
        targetArticleTitle: candidate.title,
        targetSlug: candidate.slug,
        categoryName: candidate.categoryName,
        reason: `Shared thematic keywords: "${common.join(', ')}"`,
        accepted: false
      });
    }
  }

  return suggestions;
}
