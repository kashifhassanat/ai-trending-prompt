import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { RETRO_80S_PROMPTS } from '@/lib/data/prompts-data';
import { ARTICLE_80S_RETRO } from '@/lib/data/articles-data';
import { PromptCard } from '@/components/PromptCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Latest Trending AI Prompts | AI Trending Prompt',
  description: 'Explore the complete directory of trending AI prompts with real examples, copyable prompt formulas, and step-by-step guidance.',
  alternates: {
    canonical: 'https://ai-trending-prompt.com/prompts',
  },
};

export default function PromptsIndexPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Prompts' },
  ];

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      <Breadcrumbs items={breadcrumbItems} />

      <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem' }}>
        <span className="section-label">Directory</span>
        <h1 className="editorial-h1" style={{ fontSize: '2.75rem', marginBottom: '0.75rem' }}>
          Trending AI Prompts & Formulas
        </h1>
        <p className="editorial-subtitle" style={{ maxWidth: '680px' }}>
          Curated collection of tested prompts across photography, retro styles, cinematic lighting, and portraiture.
        </p>
      </header>

      {/* Featured Collection Callout */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '2rem',
        marginBottom: '3.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Featured Story
          </span>
          <h2 className="editorial-h2" style={{ fontSize: '1.5rem', marginTop: '0.25rem', marginBottom: '0.4rem' }}>
            {ARTICLE_80S_RETRO.title}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '640px' }}>
            {ARTICLE_80S_RETRO.subtitle}
          </p>
        </div>
        <Link href={`/prompts/${ARTICLE_80S_RETRO.slug}`} className="btn-editorial">
          Read Guide & View 7 Prompts →
        </Link>
      </div>

      <div className="section-header-row">
        <div>
          <h2 className="editorial-h3">All Curated Prompts</h2>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing {RETRO_80S_PROMPTS.length} verified prompts
        </span>
      </div>

      <div className="grid-3">
        {RETRO_80S_PROMPTS.map(prompt => (
          <PromptCard key={prompt.id} prompt={prompt} articleSlug={ARTICLE_80S_RETRO.slug} />
        ))}
      </div>
    </div>
  );
}
