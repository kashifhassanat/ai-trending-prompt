import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GOALS_DATA } from '@/lib/data/goals-data';
import { CATEGORIES_DATA } from '@/lib/data/categories-data';
import { RETRO_80S_PROMPTS } from '@/lib/data/prompts-data';
import { ARTICLE_80S_RETRO } from '@/lib/data/articles-data';
import { GoalCard } from '@/components/GoalCard';
import { PromptCard } from '@/components/PromptCard';
import { CopyPromptButton } from '@/components/CopyPromptButton';

export default function HomePage() {
  const trendingArticle = ARTICLE_80S_RETRO;
  const trendingPrompts = RETRO_80S_PROMPTS.slice(0, 3);
  const latestPrompts = RETRO_80S_PROMPTS.slice(3, 7);
  const recentlyUpdated = trendingArticle.relatedArticles;

  return (
    <>
      {/* Hero Section: Strictly NO search bar, CTA button, or example chips inside hero */}
      <section className="hero-section">
        <div className="container hero-content">
          <span className="section-label">Editorial Prompt Directory</span>
          <h1 className="editorial-h1 hero-headline">
            Create What’s Trending With AI
          </h1>
          <p className="editorial-subtitle hero-subtitle">
            Discover trending AI prompts with real examples and step-by-step instructions.
          </p>
        </div>
      </section>

      {/* 1. Trending Now */}
      <section style={{ padding: '4.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-label">Section 01</span>
              <h2 className="editorial-h2">Trending Now</h2>
            </div>
            <Link href="/prompts/80s-retro-photo-prompts" className="view-all-link">
              View Feature Story →
            </Link>
          </div>

          {/* Lead Editorial Feature Banner */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            marginBottom: '3rem'
          }}>
            <div style={{ position: 'relative', minHeight: '340px', width: '100%' }}>
              <Image
                src={trendingArticle.featuredMedia.url}
                alt={trendingArticle.featuredMedia.altText}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '0.75rem' }}>
                Trending Collection • {trendingArticle.categoryName}
              </span>
              <h3 className="editorial-h3" style={{ fontSize: '1.85rem', marginBottom: '1rem' }}>
                <Link href={`/prompts/${trendingArticle.slug}`} style={{ color: 'inherit' }}>
                  {trendingArticle.title}
                </Link>
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.975rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                {trendingArticle.subtitle}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href={`/prompts/${trendingArticle.slug}`} className="btn-editorial">
                  Explore All 7 Prompts →
                </Link>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  {trendingArticle.readingTimeMinutes} min read • Tested on Midjourney & Flux
                </span>
              </div>
            </div>
          </div>

          {/* Trending Prompts Preview Cards */}
          <div className="grid-3">
            {trendingPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} articleSlug={trendingArticle.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Browse by Goal */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-surface-muted)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-label">Section 02</span>
              <h2 className="editorial-h2">Browse by Goal</h2>
            </div>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Curated workflows for creators
            </span>
          </div>

          <div className="goals-grid">
            {GOALS_DATA.map(goal => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Latest AI Prompts */}
      <section style={{ padding: '4.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-label">Section 03</span>
              <h2 className="editorial-h2">Latest AI Prompts</h2>
            </div>
            <Link href="/prompts" className="view-all-link">
              Browse Directory →
            </Link>
          </div>

          <div className="grid-2">
            {latestPrompts.map(prompt => (
              <div key={prompt.id} style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))'
              }}>
                <div style={{ position: 'relative', minHeight: '260px' }}>
                  <Image
                    src={prompt.media.url}
                    alt={prompt.media.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600 }}>
                      PROMPT #{prompt.number}
                    </span>
                    <h3 className="editorial-h3" style={{ fontSize: '1.2rem', marginTop: '0.25rem', marginBottom: '0.65rem' }}>
                      <Link href={`/prompts/${trendingArticle.slug}#prompt-${prompt.number || prompt.slug}`}>
                        {prompt.title}
                      </Link>
                    </h3>
                    <p style={{
                      fontSize: '0.825rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--bg-surface-muted)',
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '1rem',
                      lineHeight: '1.5',
                      maxHeight: '4.5em',
                      overflow: 'hidden'
                    }}>
                      {prompt.promptText}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <CopyPromptButton promptText={prompt.promptText} buttonLabel="Copy" />
                    <Link href={`/prompts/${trendingArticle.slug}#prompt-${prompt.number || prompt.slug}`} style={{ fontSize: '0.825rem', fontWeight: 600 }}>
                      How to Use →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Popular Categories */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-surface-muted)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-label">Section 04</span>
              <h2 className="editorial-h2">Popular Categories</h2>
            </div>
            <Link href="/categories" className="view-all-link">
              All Categories →
            </Link>
          </div>

          <div className="grid-3">
            {CATEGORIES_DATA.map(category => (
              <Link key={category.id} href={`/categories#${category.slug}`} className="category-card">
                {category.featuredMedia && (
                  <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                    <Image
                      src={category.featuredMedia.url}
                      alt={category.featuredMedia.altText}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <h3 className="category-card-name">
                  {category.name}
                </h3>
                <p className="category-card-desc">
                  {category.description}
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>{category.promptCount} Prompts</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Recently Updated */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-label">Section 05</span>
              <h2 className="editorial-h2">Recently Updated</h2>
            </div>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Latest articles & prompt revisions
            </span>
          </div>

          <div className="grid-2">
            {recentlyUpdated.map(article => (
              <div key={article.id} className="related-article-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                <div style={{ position: 'relative', minHeight: '190px' }}>
                  <Image
                    src={article.media.url}
                    alt={article.media.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.725rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: '0.4rem' }}>
                    {article.categoryName}
                  </span>
                  <h3 className="editorial-h3" style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                    <Link href={`/prompts/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
                    {article.description}
                  </p>
                  <Link href={`/prompts/${article.slug}`} style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Read Guide →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
