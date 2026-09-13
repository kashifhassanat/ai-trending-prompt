import { MetadataRoute } from 'next';
import { ALL_ARTICLES } from '@/lib/data/articles-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai-trending-prompt.com';

  // Public indexable routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/prompts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic article routes - STRICT: Only PUBLISHED and indexable articles enter sitemap
  const articleRoutes: MetadataRoute.Sitemap = ALL_ARTICLES
    .filter(article => article.status === 'PUBLISHED' && article.indexable === true)
    .map(article => ({
      url: article.canonicalUrl || `${baseUrl}/prompts/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));

  return [...staticRoutes, ...articleRoutes];
}
