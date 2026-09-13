import React from 'react';
import Link from 'next/link';
import { CLUSTER_TREES } from '@/lib/data/topics-data';

export default function AdminTopicsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: '#2563EB' }}>
              Taxonomy Architecture
            </span>
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>•</span>
            <span style={{ fontSize: '0.75rem', color: '#4B5563' }}>Hierarchical Tree Topology</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
            Topic Cluster Coverage Dashboard
          </h1>
          <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
            Visualizes parent/child topic structures, monitors published authority, and highlights content gaps before saturation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/admin/content" className="btn-editorial" style={{ fontSize: '0.8rem', backgroundColor: '#111827', borderColor: '#111827' }}>
            + Create New Cluster Page
          </Link>
        </div>
      </div>

      {/* Visual Cluster Trees (Requirement 13) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {CLUSTER_TREES.map(cluster => (
          <div key={cluster.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Cluster Banner */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#2563EB' }}>Parent Cluster</span>
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>•</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>{cluster.subtopics.length} Node Subtopics</span>
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#111827' }}>
                  {cluster.name}
                </h2>
                <p style={{ fontSize: '0.825rem', color: '#6B7280', margin: '0.2rem 0 0 0' }}>
                  {cluster.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="status-pill status-pill-green">
                  {cluster.subtopics.filter(s => s.status === 'PUBLISHED').length} Published Hubs
                </span>
                <span className="status-pill status-pill-yellow">
                  {cluster.subtopics.filter(s => s.status === 'OPPORTUNITY').length} Uncaptured Gaps
                </span>
              </div>
            </div>

            {/* Visual Hierarchy Tree */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'monospace' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#2563EB' }}>📦</span>
                  <span>{cluster.hubTopic.name} (Cluster Hub)</span>
                </div>

                <div style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', borderLeft: '2px solid #E5E7EB', marginLeft: '0.5rem' }}>
                  {cluster.subtopics.map((sub, idx) => {
                    const isLast = idx === cluster.subtopics.length - 1;
                    return (
                      <div key={sub.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.85rem', backgroundColor: sub.status === 'PUBLISHED' ? '#F0FDF4' : '#F9FAFB', border: sub.status === 'PUBLISHED' ? '1px solid #BBF7D0' : '1px solid #E5E7EB', borderRadius: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ color: '#9CA3AF' }}>{isLast ? '└──' : '├──'}</span>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1F2937', fontFamily: 'sans-serif' }}>
                              {sub.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#6B7280', fontFamily: 'sans-serif' }}>
                              Target Query: <code>&ldquo;{sub.targetQuery}&rdquo;</code> • Intent: <strong>{sub.searchIntent}</strong>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {sub.searchGrowthBadge && (
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#15803D', backgroundColor: '#DCFCE7', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'sans-serif' }}>
                              {sub.searchGrowthBadge}
                            </span>
                          )}

                          <span className={`status-pill ${sub.status === 'PUBLISHED' ? 'status-pill-green' : 'status-pill-yellow'}`} style={{ fontFamily: 'sans-serif' }}>
                            {sub.status === 'PUBLISHED' ? '✓ Published' : `○ Opportunity (${sub.opportunityScore}/100)`}
                          </span>

                          {sub.status === 'PUBLISHED' ? (
                            <Link
                              href={sub.publishedUrl || '#'}
                              target="_blank"
                              className="btn-secondary"
                              style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', fontFamily: 'sans-serif' }}
                            >
                              View Live ↗
                            </Link>
                          ) : (
                            <Link
                              href={`/admin/content?topic=${encodeURIComponent(sub.name)}&intent=${sub.searchIntent}&query=${encodeURIComponent(sub.targetQuery)}`}
                              className="btn-editorial"
                              style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', backgroundColor: '#111827', borderColor: '#111827', fontFamily: 'sans-serif' }}
                            >
                              Create Content Brief →
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
