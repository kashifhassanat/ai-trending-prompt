import React from 'react';
import Link from 'next/link';
import { defaultTrendProvider } from '@/lib/providers/trend-provider';

interface TrendsPageProps {
  searchParams: Promise<{
    status?: string;
    category?: string;
    sort?: string;
  }>;
}

export default async function TrendRadarPage({ searchParams }: TrendsPageProps) {
  const { status = 'ALL', category = 'ALL', sort = 'score' } = await searchParams;

  const trends = await defaultTrendProvider.getTrends({
    status: status as 'ALL' | 'RISING' | 'HOT' | 'EMERGING' | 'DECLINING' | 'RESEARCHED' | 'COVERED',
    category: category !== 'ALL' ? category : undefined,
    sortBy: (sort === 'growth' || sort === 'freshness' || sort === 'opportunity') ? sort : 'score',
  });

  const categories = ['ALL', 'Retro & Vintage', 'Film & Analog', 'Commercial & Product', 'Creative Art'];
  const statuses = ['ALL', 'RISING', 'HOT', 'EMERGING', 'COVERED'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: '#2563EB' }}>
              Discovery Engine
            </span>
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>•</span>
            <span style={{ fontSize: '0.75rem', color: '#4B5563' }}>Multi-Signal Provider v1.0</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
            Trend Radar
          </h1>
          <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
            Find emerging AI creation trends before they become saturated.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="admin-environment-badge">
            DEMO SIGNALS ACTIVE
          </span>
          <Link href="/admin/content" className="btn-editorial" style={{ fontSize: '0.8rem', backgroundColor: '#111827' }}>
            + Create from Opportunity
          </Link>
        </div>
      </div>

      {/* Transparent Scoring Formula Legend */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '1.25rem 1.5rem',
        fontSize: '0.825rem',
        color: '#4B5563',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <strong style={{ color: '#111827' }}>Algorithmic Scoring Model: </strong>
          <code>Trend Score = (Search Growth × 0.25) + (Social Momentum × 0.25) + (Freshness × 0.2) + (Opportunity × 0.2) + (Commercial × 0.1) - (Competition × 0.15)</code>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
          Normalized to 1–100 scale • Updated continuously
        </span>
      </div>

      {/* Filters Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Status Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.775rem', fontWeight: 600, color: '#6B7280', marginRight: '0.25rem' }}>Status:</span>
          {statuses.map(s => {
            const isActive = status.toUpperCase() === s;
            return (
              <Link
                key={s}
                href={`/admin/trends?status=${s}&category=${category}&sort=${sort}`}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 700 : 500,
                  padding: '0.3rem 0.65rem',
                  borderRadius: '4px',
                  backgroundColor: isActive ? '#111827' : '#F3F4F6',
                  color: isActive ? '#FFFFFF' : '#4B5563',
                  textDecoration: 'none'
                }}
              >
                {s}
              </Link>
            );
          })}
        </div>

        {/* Category & Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
            <span style={{ color: '#6B7280', fontWeight: 500 }}>Category:</span>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {categories.map(c => {
                const isActive = category === c;
                return (
                  <Link
                    key={c}
                    href={`/admin/trends?status=${status}&category=${c}&sort=${sort}`}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: isActive ? 700 : 500,
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                      color: isActive ? '#1D4ED8' : '#4B5563',
                      textDecoration: 'none'
                    }}
                  >
                    {c}
                  </Link>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
            <span style={{ color: '#6B7280', fontWeight: 500 }}>Sort:</span>
            <Link
              href={`/admin/trends?status=${status}&category=${category}&sort=score`}
              style={{
                fontSize: '0.75rem',
                fontWeight: sort === 'score' ? 700 : 500,
                color: sort === 'score' ? '#111827' : '#6B7280'
              }}
            >
              Score
            </Link>
            <span>•</span>
            <Link
              href={`/admin/trends?status=${status}&category=${category}&sort=growth`}
              style={{
                fontSize: '0.75rem',
                fontWeight: sort === 'growth' ? 700 : 500,
                color: sort === 'growth' ? '#111827' : '#6B7280'
              }}
            >
              Search
            </Link>
            <span>•</span>
            <Link
              href={`/admin/trends?status=${status}&category=${category}&sort=opportunity`}
              style={{
                fontSize: '0.75rem',
                fontWeight: sort === 'opportunity' ? 700 : 500,
                color: sort === 'opportunity' ? '#111827' : '#6B7280'
              }}
            >
              Opportunity
            </Link>
          </div>
        </div>
      </div>

      {/* Trends Radar Table */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Trend</th>
                <th style={{ textAlign: 'center' }}>Score</th>
                <th style={{ textAlign: 'center' }}>Search</th>
                <th style={{ textAlign: 'center' }}>Social</th>
                <th style={{ textAlign: 'center' }}>Freshness</th>
                <th style={{ textAlign: 'center' }}>Competition</th>
                <th style={{ textAlign: 'center' }}>Opportunity</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trends.map(t => (
                <tr key={t.id}>
                  <td>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.925rem', color: '#111827' }}>{t.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.15rem' }}>{t.category} • {t.existingArticleCount} published</div>
                      <div style={{ fontSize: '0.775rem', color: '#4B5563', marginTop: '0.35rem', lineHeight: 1.35 }}>
                        {t.description}
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex' }}>
                      <div className={`score-badge-large ${t.trendScore >= 90 ? 'score-badge-green' : t.trendScore >= 80 ? 'score-badge-blue' : 'score-badge-amber'}`}>
                        {t.trendScore}
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#111827' }}>+{t.searchGrowth}%</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 600, color: '#4B5563' }}>{t.socialMomentum}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 600, color: '#4B5563' }}>{t.freshness}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: t.competition > 60 ? '#FEF2F2' : '#F0FDF4',
                      color: t.competition > 60 ? '#991B1B' : '#166534'
                    }}>
                      {t.competition}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#15803D' }}>{t.contentOpportunity}</span>
                  </td>
                  <td>
                    <span className="status-pill status-pill-green">
                      {t.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <Link
                        href={`/admin/trends/${t.id}`}
                        className="btn-secondary"
                        style={{ fontSize: '0.775rem', padding: '0.35rem 0.7rem' }}
                      >
                        Research Trend
                      </Link>
                      <Link
                        href={`/admin/content?trendId=${t.id}`}
                        className="btn-editorial"
                        style={{ fontSize: '0.775rem', padding: '0.35rem 0.7rem', backgroundColor: '#111827' }}
                      >
                        Generate Content
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
