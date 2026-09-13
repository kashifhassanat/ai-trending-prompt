import React from 'react';
import Link from 'next/link';
import { TOPIC_CLUSTERS } from '@/lib/data/topics-data';

export default function AdminTopicsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
          PSEO Topic Clusters & Search Intents
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
          Scalable taxonomy designed for programmatic SEO without keyword cannibalization or thin pages.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {TOPIC_CLUSTERS.map(cluster => (
          <div key={cluster.name} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#111827' }}>
                Cluster: {cluster.name}
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.15rem 0 0 0' }}>
                {cluster.description}
              </p>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Topic Name</th>
                  <th>Search Intent</th>
                  <th>Primary Query</th>
                  <th>Secondary Queries</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {cluster.topics.map(topic => (
                  <tr key={topic.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#111827' }}>{topic.name}</div>
                      <div style={{ fontSize: '0.725rem', color: '#6B7280' }}>Category: {topic.categorySlug}</div>
                    </td>
                    <td>
                      <span className="status-pill status-pill-blue">
                        {topic.searchIntent}
                      </span>
                    </td>
                    <td>
                      <code>&ldquo;{topic.primaryQuery}&rdquo;</code>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.75rem', color: '#4B5563' }}>
                        {topic.secondaryQueries.slice(0, 2).join(', ')}
                      </div>
                    </td>
                    <td>
                      <span className={`status-pill ${
                        topic.status === 'COVERED' ? 'status-pill-green' : topic.status === 'PLANNED' ? 'status-pill-yellow' : 'status-pill-blue'
                      }`}>
                        {topic.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Link
                        href={`/admin/content?topic=${encodeURIComponent(topic.name)}&intent=${topic.searchIntent}`}
                        className="btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                      >
                        Draft in Studio
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
