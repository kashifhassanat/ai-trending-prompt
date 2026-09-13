import React from 'react';
import Link from 'next/link';
import { defaultAnalyticsProvider } from '@/lib/providers/analytics-provider';

export default async function AnalyticsPage() {
  const articles = await defaultAnalyticsProvider.getArticleAnalytics();
  const feedbackLoops = await defaultAnalyticsProvider.getFeedbackLoopRecommendations();

  const totalViews = articles.reduce((acc, a) => acc + a.views, 0);
  const totalCopies = articles.reduce((acc, a) => acc + a.promptCopies, 0);
  const aggregateCopyRate = ((totalCopies / totalViews) * 100).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: '#2563EB' }}>
              Telemetry Engine
            </span>
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>•</span>
            <span style={{ fontSize: '0.75rem', color: '#4B5563' }}>Conversion & Feedback Loop</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
            Analytics & Conversion Telemetry
          </h1>
          <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
            Core KPI: <strong>Prompt Copy Rate</strong> (Prompt Copies / Article Views). Feeding performance data back into Trend Radar.
          </p>
        </div>

        <span className="admin-environment-badge">
          INTERNAL TELEMETRY MOCK ACTIVE
        </span>
      </div>

      {/* Primary Conversion KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280', marginBottom: '0.5rem' }}>
            Aggregate Prompt Copy Rate
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#15803D', lineHeight: 1 }}>
            {aggregateCopyRate}%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4B5563', marginTop: '0.4rem' }}>
            Industry benchmark for directories: 8–12%
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280', marginBottom: '0.5rem' }}>
            Total Prompt Copies
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>
            {totalCopies.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, marginTop: '0.4rem' }}>
            +38.4% growth across external generation apps
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280', marginBottom: '0.5rem' }}>
            Total Publication Views
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>
            {totalViews.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4B5563', marginTop: '0.4rem' }}>
            High dwell time (avg. 3m 12s on recipe articles)
          </div>
        </div>
      </div>

      {/* Section 30: Content Performance Feedback Loop */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="status-pill status-pill-blue">AUTOMATED LOOP</span>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Content Performance Feedback Loop</h2>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.2rem 0 0 0' }}>
              TREND → CONTENT → PERFORMANCE → NEW OPPORTUNITY
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {feedbackLoops.map((loop, i) => (
            <div key={i} style={{ backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0369A1' }}>
                  {loop.recommendationTitle}
                </span>
                <span className="status-pill status-pill-green">
                  {loop.copyRate}% Copy Rate
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#0C4A6E', margin: '0 0 0.75rem 0', lineHeight: 1.4 }}>
                Source article <strong>&ldquo;{loop.articleTitle}&rdquo;</strong> has accumulated <strong>{loop.views.toLocaleString()} views</strong> and <strong>{loop.promptCopies.toLocaleString()} prompt copies</strong>. The algorithm detects strong affinity for this specific visual cluster.
              </p>

              <div style={{ borderTop: '1px solid #E0F2FE', paddingTop: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369A1', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Actionable Opportunities to Capture Intent:
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8rem', color: '#0C4A6E', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {loop.actionableIdeas.map((idea, idx) => (
                    <li key={idx}>
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <Link
                  href={`/admin/content?topic=${encodeURIComponent(loop.actionableIdeas[0])}`}
                  className="btn-editorial"
                  style={{ fontSize: '0.775rem', padding: '0.35rem 0.75rem', backgroundColor: '#0284C7', borderColor: '#0284C7' }}
                >
                  Act on Recommendation in Studio →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Telemetry Table */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Granular Article Telemetry</h2>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.2rem 0 0 0' }}>Performance tracked across public routes</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Article Title</th>
                <th>Views</th>
                <th>Prompt Copies</th>
                <th>Prompt Copy Rate</th>
                <th>Avg. Dwell Time</th>
                <th>Lifecycle Status</th>
                <th>Loop Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(art => (
                <tr key={art.articleId}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#111827' }}>{art.title}</div>
                    <div style={{ fontSize: '0.725rem', color: '#6B7280' }}>/prompts/{art.slug}</div>
                  </td>
                  <td>{art.views.toLocaleString()}</td>
                  <td>
                    <strong style={{ color: '#111827' }}>{art.promptCopies.toLocaleString()}</strong>
                  </td>
                  <td>
                    <span className={`status-pill ${art.copyRate >= 23 ? 'status-pill-green' : 'status-pill-blue'}`}>
                      {art.copyRate}%
                    </span>
                  </td>
                  <td>{Math.floor(art.avgTimeOnPageSecs / 60)}m {art.avgTimeOnPageSecs % 60}s</td>
                  <td>
                    <span className="status-pill status-pill-yellow">
                      {art.trendStatus}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.775rem', color: '#4B5563' }}>
                      {art.feedbackLoopAction}
                    </span>
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
