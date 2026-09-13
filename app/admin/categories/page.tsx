import React from 'react';
import { CATEGORIES_DATA } from '@/lib/data/categories-data';

export default function AdminCategoriesPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
          Category Taxonomies
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
          Public taxonomies and collection distributions across ai-trending-prompt.com
        </p>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Live Prompts</th>
              <th>Live Guides</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES_DATA.map(cat => (
              <tr key={cat.id}>
                <td style={{ fontWeight: 600, color: '#111827' }}>{cat.name}</td>
                <td><code>{cat.slug}</code></td>
                <td style={{ fontSize: '0.8rem', color: '#4B5563' }}>{cat.description}</td>
                <td><strong>{cat.promptCount}</strong></td>
                <td><strong>{cat.articleCount}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
