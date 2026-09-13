import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { RETRO_80S_PROMPTS } from '@/lib/data/prompts-data';
import { ALL_ARTICLES } from '@/lib/data/articles-data';

export const metadata: Metadata = {
  title: 'Editorial Admin Dashboard (M1 Placeholder) | AI Trending Prompt',
  description: 'Internal content management dashboard placeholder for Milestone 1.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  const stats = [
    { label: 'Published Articles', value: ALL_ARTICLES.length, sub: '1 live on production' },
    { label: 'Live Prompts', value: RETRO_80S_PROMPTS.length, sub: '7 verified 80s prompts' },
    { label: 'Sample Images', value: 12, sub: '100% verified local assets' },
    { label: 'Drafts in Progress', value: 4, sub: 'Vintage, Y2K, Cinematic, Polaroid' },
    { label: 'Pending Review', value: 2, sub: 'Midjourney v6.1 evaluations' },
  ];

  const drafts = [
    { title: 'Vintage Film Photo Prompts: 35mm, Kodachrome & Grain', category: 'Film & Analog', status: 'Drafting Prompts', targetDate: 'Oct 2026' },
    { title: 'Y2K Photo Prompts: Early 2000s Digicam Aesthetic', category: 'Retro & Vintage', status: 'Sample Generation', targetDate: 'Oct 2026' },
    { title: 'Cinematic Photo Prompts: Hollywood Lighting & Color', category: 'Cinematic Stills', status: 'In Review', targetDate: 'Nov 2026' },
    { title: 'Polaroid Photo Prompts: Authentic Instant Film', category: 'Analog & Polaroid', status: 'In Review', targetDate: 'Nov 2026' },
  ];

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span className="section-label" style={{ marginBottom: 0 }}>Internal Operations</span>
            <span className="admin-badge">Milestone 1 Preview</span>
          </div>
          <h1 className="editorial-h1" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Editorial CMS Dashboard
          </h1>
          <p className="editorial-subtitle">
            Placeholder control panel for managing articles, prompt formulas, media assets, and publishing review queues.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" className="btn-secondary" style={{ fontSize: '0.8rem' }} title="M1 Demo placeholder">
            + New Prompt
          </button>
          <button type="button" className="btn-editorial" style={{ fontSize: '0.8rem' }} title="M1 Demo placeholder">
            + Create Article
          </button>
        </div>
      </header>

      {/* Admin Stats Overview */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="admin-stat-card">
              <div className="admin-stat-label">{stat.label}</div>
              <div className="admin-stat-value">{stat.value}</div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles Management Table */}
      <section style={{ marginBottom: '3.5rem', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 className="editorial-h3" style={{ fontSize: '1.25rem' }}>Published Articles</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Currently live and indexed on ai-trending-prompt.com</p>
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{ALL_ARTICLES.length} Published</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Prompts</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ALL_ARTICLES.map(article => (
                <tr key={article.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{article.title}</div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>/prompts/{article.slug}</div>
                  </td>
                  <td>{article.categoryName}</td>
                  <td>{article.prompts.length} Prompts</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--success)', fontWeight: 600, fontSize: '0.8rem' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
                      Published
                    </span>
                  </td>
                  <td>{new Date(article.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <Link href={`/prompts/${article.slug}`} className="view-all-link" style={{ fontSize: '0.8rem' }}>
                      View Live ↗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Prompts & Media Matrix */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div className="section-header-row">
          <div>
            <h2 className="editorial-h3" style={{ fontSize: '1.25rem' }}>Active Prompts & Example Assets</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified 1-to-1 prompt and sample asset mappings</p>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            7 Prompts Verified
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {RETRO_80S_PROMPTS.map(p => (
            <div key={p.id} style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                <Image
                  src={p.media.url}
                  alt={p.media.altText}
                  fill
                  sizes="64px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 600 }}>PROMPT #{p.number}</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {p.modelRecommended} • Ratio {p.aspectRatio}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Drafts & Review Queue */}
      <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 className="editorial-h3" style={{ fontSize: '1.25rem' }}>Drafts & Editorial Pipeline</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scheduled prompt articles for subsequent milestones</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Proposed Article</th>
                <th>Category</th>
                <th>Pipeline Stage</th>
                <th>Target Release</th>
              </tr>
            </thead>
            <tbody>
              {drafts.map((d, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{d.title}</td>
                  <td>{d.category}</td>
                  <td>
                    <span style={{ backgroundColor: 'var(--bg-surface-muted)', padding: '0.2rem 0.5rem', borderRadius: '3px', fontSize: '0.75rem', fontWeight: 500 }}>
                      {d.status}
                    </span>
                  </td>
                  <td>{d.targetDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
