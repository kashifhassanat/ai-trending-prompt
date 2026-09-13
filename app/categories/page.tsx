import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES_DATA } from '@/lib/data/categories-data';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Prompt Categories | AI Trending Prompt',
  description: 'Browse curated AI prompt categories including Retro & Vintage, Portraiture, 35mm Film, Commercial Product, and Social Media Trends.',
  alternates: {
    canonical: 'https://ai-trending-prompt.com/categories',
  },
};

export default function CategoriesPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories' },
  ];

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      <Breadcrumbs items={breadcrumbItems} />

      <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem' }}>
        <span className="section-label">Taxonomy</span>
        <h1 className="editorial-h1" style={{ fontSize: '2.75rem', marginBottom: '0.75rem' }}>
          Prompt Categories
        </h1>
        <p className="editorial-subtitle" style={{ maxWidth: '680px' }}>
          Explore prompts organized by visual style, genre, photographic medium, and creative intention.
        </p>
      </header>

      <div className="editorial-grid">
        {CATEGORIES_DATA.map(category => (
          <div key={category.id} id={category.slug} className="category-card" style={{ padding: '0', overflow: 'hidden' }}>
            {category.featuredMedia && (
              <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                <Image
                  src={category.featuredMedia.url}
                  alt={category.featuredMedia.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h2 className="category-card-name">
                {category.name}
              </h2>
              <p className="category-card-desc">
                {category.description}
              </p>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {category.promptCount} Prompts • {category.articleCount} Guides
                </span>
                <Link
                  href={category.slug === 'retro-vintage' ? '/prompts/80s-retro-photo-prompts' : '/prompts'}
                  style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)' }}
                >
                  View Collection →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
