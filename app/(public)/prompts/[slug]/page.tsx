import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ALL_ARTICLES } from '@/lib/data/articles-data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArticlePromptItem } from '@/components/ArticlePromptItem';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_ARTICLES.map(article => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ALL_ARTICLES.find(a => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found | AI Trending Prompt',
    };
  }

  const canonicalUrl = article.canonicalUrl || `https://ai-trending-prompt.com/prompts/${article.slug}`;
  const isIndexable = article.indexable && article.status === 'PUBLISHED';

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    keywords: [
      article.primaryQuery,
      ...(article.secondaryQueries || []),
      article.categoryName,
      'AI prompt recipes',
    ],
    openGraph: {
      title: article.ogTitle || article.metaTitle,
      description: article.ogDescription || article.metaDescription,
      url: canonicalUrl,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.ogImage || article.featuredMedia.url,
          width: article.featuredMedia.width || 1280,
          height: article.featuredMedia.height || 720,
          alt: article.featuredMedia.altText,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.ogTitle || article.metaTitle,
      description: article.ogDescription || article.metaDescription,
      images: [article.ogImage || article.featuredMedia.url],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = ALL_ARTICLES.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Article JSON-LD Schema with visible ImageObject items
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    image: `https://ai-trending-prompt.com${article.featuredMedia.url}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Trending Prompt',
      url: 'https://ai-trending-prompt.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ai-trending-prompt.com/images/prompts/80s-retro/cover.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ai-trending-prompt.com/prompts/${article.slug}`,
    },
    associatedMedia: article.prompts.map(p => ({
      '@type': 'ImageObject',
      contentUrl: `https://ai-trending-prompt.com${p.media.url}`,
      description: p.media.altText,
      caption: p.title,
    })),
  };

  // BreadcrumbList JSON-LD Schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ai-trending-prompt.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Prompts',
        item: 'https://ai-trending-prompt.com/prompts',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.categoryName,
        item: `https://ai-trending-prompt.com/categories#${article.categorySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: article.title,
        item: `https://ai-trending-prompt.com/prompts/${article.slug}`,
      },
    ],
  };

  // FAQPage JSON-LD Schema (Strictly mirrors visible FAQ section)
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Prompts', href: '/prompts' },
    { label: article.categoryName, href: `/categories#${article.categorySlug}` },
    { label: article.title },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="container-reading" style={{ paddingTop: '2.5rem' }}>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Article Header */}
        <header className="article-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="article-category-badge">
              {article.categoryName}
            </span>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              backgroundColor: '#EFF6FF',
              color: '#1D4ED8',
              border: '1px solid #DBEAFE'
            }}>
              {article.contentType}
            </span>
          </div>

          <h1 className="editorial-h1 article-title">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="article-subtitle">
              {article.subtitle}
            </p>
          )}

          <div className="article-byline">
            <div className="article-author-info">
              {article.author.avatarUrl && (
                <Image
                  src={article.author.avatarUrl}
                  alt={article.author.name}
                  width={36}
                  height={36}
                  className="author-avatar"
                />
              )}
              <div>
                <div className="author-name">{article.author.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{article.author.role}</div>
              </div>
            </div>

            <div>
              <span>Published: </span>
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>

            <div>
              <span>Last Reviewed: </span>
              <time dateTime={article.lastReviewedAt}>
                {new Date(article.lastReviewedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>

            <div>
              <span>Reading time: </span>
              <span>{article.readingTimeMinutes} min</span>
            </div>
          </div>
        </header>

        {/* Featured Cover Figure */}
        <figure className="article-cover-figure">
          <div className="article-cover-wrapper">
            <Image
              src={article.featuredMedia.url}
              alt={article.featuredMedia.altText}
              fill
              sizes="(max-width: 768px) 100vw, 780px"
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
          {article.featuredMedia.caption && (
            <figcaption className="article-cover-caption">
              {article.featuredMedia.caption}
            </figcaption>
          )}
        </figure>

        {/* Introduction */}
        <section className="article-intro-block" aria-label="Introduction">
          {article.introduction.map((p, idx) => (
            <p key={idx} className="article-intro-paragraph">
              {p}
            </p>
          ))}
        </section>

        {/* Quick Overview Table */}
        <section className="quick-overview-card" aria-label="Quick Overview">
          <h2 className="quick-overview-title">
            {article.quickOverviewHeading || 'Quick Overview: The 7 Prompts'}
          </h2>
          <div className="quick-overview-list">
            {article.prompts.map(p => (
              <div key={p.id} className="quick-overview-item">
                <a href={`#prompt-${p.number || p.slug}`} className="quick-overview-item-link">
                  {p.number}. {p.title}
                </a>
                <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  {p.recommendedTools && p.recommendedTools.length > 0
                    ? `Optimized for ${p.recommendedTools.length} leading AI tools`
                    : p.modelRecommended}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Tailored Content Type Blueprint Section (Requirement 7) */}
        <section style={{
          margin: '2rem 0 3rem 0',
          padding: '1.5rem',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderLeft: '4px solid #2563EB',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: '#1E40AF' }}>
              {article.contentType} Blueprint
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>•</span>
            <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>Intent: {article.searchIntent}</span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>•</span>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Audience: {article.targetAudience}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#334155', lineHeight: 1.5 }}>
            {article.contentType === 'Visual Prompt Recipe' && 'Every recipe below pairs an exact generation prompt with tested aspect ratios, model configurations, and optical simulation notes for direct copying.'}
            {article.contentType === 'How-To Guide' && 'Follow this step-by-step workflow to configure camera prompts, bypass AI digital smoothing, and reproduce authentic visual realism.'}
            {article.contentType === 'Trend Guide' && 'Analyze the rapid velocity of this creative wave across social platforms with actionable prompts engineered to capture rising search demand.'}
            {article.contentType === 'Style Guide' && 'Master the color grading, film emulsion physics, and lighting geometry defining this distinct visual aesthetic.'}
            {article.contentType === 'Commercial Prompt Guide' && 'Produce high-converting product and brand photography prompts with clean negative prompting and professional studio setups.'}
            {article.contentType === 'Use-Case Guide' && 'Tailored prompt blueprints engineered for specific production workflows, editorial shoots, and lookbook creation.'}
          </p>
        </section>

        {/* The 7 Prompts: Exactly 7 prompts, each with 1 unique example image */}
        <section aria-label="Prompt List">
          <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <span className="section-label">Curated Prompts</span>
            <h2 className="editorial-h2">
              7 Tested 80s Retro Prompts & Examples
            </h2>
          </div>

          {article.prompts.map((prompt, index) => (
            <ArticlePromptItem
              key={prompt.id}
              prompt={prompt}
              priority={index === 0}
            />
          ))}
        </section>

        {/* How to Get Better Results */}
        <section className="results-guide-card" aria-label="How to Get Better Results">
          <span className="section-label">Masterclass</span>
          <h2 className="editorial-h2" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            {article.howToGetBetterResults.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Achieving authentic 1980s texture requires understanding how AI generators interpret analog optics and lighting.
          </p>

          <div className="results-guide-grid">
            {article.howToGetBetterResults.points.map((pt, idx) => (
              <div key={idx} className="results-guide-item">
                <h4>{pt.headline}</h4>
                <p>{pt.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Tips */}
        <section style={{ marginBottom: '3.5rem' }} aria-label="Practical Tips">
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="section-label">Prompt Engineering</span>
            <h2 className="editorial-h2" style={{ fontSize: '1.75rem' }}>
              Practical Tips for Prompt Tweaking
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {article.practicalTips.map((tip, idx) => (
              <div key={idx} style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem'
              }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {tip.headline}
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Problems & Fixes */}
        <section className="troubleshooting-card" aria-label="Common Problems and Fixes">
          <span className="section-label">Troubleshooting</span>
          <h2 className="editorial-h2" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            Common Problems & How to Fix Them
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Encountering weird artifacts, plastic skin, or modern intrusions? Here are proven solutions.
          </p>

          <div className="trouble-list">
            {article.troubleshooting.map((item, idx) => (
              <div key={idx} className="trouble-item">
                <div className="trouble-issue">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>Issue: {item.issue}</span>
                </div>
                <p className="trouble-solution">
                  <strong>Fix:</strong> {item.solution}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Useful FAQs (4-7 FAQs) */}
        <section className="faqs-section" aria-label="Frequently Asked Questions">
          <span className="section-label">Q&A</span>
          <h2 className="editorial-h2" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Practical advice for generating and refining retro AI photography.
          </p>

          <div className="faq-list">
            {article.faqs.map(faq => (
              <div key={faq.id} className="faq-item">
                <h3 className="faq-question">
                  {faq.question}
                </h3>
                <p className="faq-answer">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Articles */}
        <section className="related-section" aria-label="Related Articles">
          <div style={{ marginBottom: '2rem' }}>
            <span className="section-label">Continue Exploring</span>
            <h2 className="editorial-h2" style={{ fontSize: '1.75rem' }}>
              Related AI Photo Prompt Guides
            </h2>
          </div>

          <div className="grid-2">
            {article.relatedArticles.map(rel => (
              <div key={rel.id} className="related-article-card">
                <div className="related-article-media">
                  <Image
                    src={rel.media.url}
                    alt={rel.media.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="related-article-body">
                  <span style={{ fontSize: '0.725rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', display: 'block', marginBottom: '0.35rem' }}>
                    {rel.categoryName}
                  </span>
                  <h3 className="related-article-title">
                    <Link href={`/prompts/${rel.slug}`}>
                      {rel.title}
                    </Link>
                  </h3>
                  <p className="related-article-desc">
                    {rel.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
