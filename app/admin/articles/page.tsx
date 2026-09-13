import React from 'react';
import Link from 'next/link';
import { ALL_ARTICLES } from '@/lib/data/articles-data';

export default function AdminArticlesPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
            Published Articles Repository
          </h1>
          <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
            Management of verified editorial articles and prompt collections on ai-trending-prompt.com
          </p>
        </div>

        <Link href="/admin/content" className="btn-editorial" style={{ fontSize: '0.8rem', backgroundColor: '#111827' }}>
          + New Article in Studio
        </Link>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title & URL</th>
              <th>Category</th>
              <th>Prompts</th>
              <th>Search Intent</th>
              <th>Published</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {ALL_ARTICLES.map(art => (
              <tr key={art.id}>
                <td>
                  <div style={{ fontWeight: 600, color: '#111827' }}>{art.title}</div>
                  <div style={{ fontSize: '0.725rem', color: '#6B7280' }}>/prompts/{art.slug}</div>
                </td>
                <td>{art.categoryName}</td>
                <td>
                  <strong>{art.prompts.length} Prompts</strong>
                </td>
                <td>
                  <span className="status-pill status-pill-blue">
                    {art.searchIntent || 'INSPIRATION'}
                  </span>
                </td>
                <td>{new Date(art.publishedAt).toLocaleDateString()}</td>
                <td>
                  <span className="status-pill status-pill-green">
                    Published
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Link href={`/prompts/${art.slug}`} target="_blank" className="view-all-link" style={{ fontSize: '0.8rem' }}>
                    View Live ↗
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
