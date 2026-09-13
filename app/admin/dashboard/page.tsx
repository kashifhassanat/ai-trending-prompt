import React from 'react';
import Link from 'next/link';
import { defaultTrendProvider } from '@/lib/providers/trend-provider';
import { defaultAnalyticsProvider } from '@/lib/providers/analytics-provider';
import { ALL_ARTICLES } from '@/lib/data/articles-data';

export default async function AdminDashboardPage() {
  const trends = await defaultTrendProvider.getTrends();
  const topTrends = trends.slice(0, 3);
  const analytics = await defaultAnalyticsProvider.getTopPerformingArticles(4);
  const feedbackLoops = await defaultAnalyticsProvider.getFeedbackLoopRecommendations();

  const metrics = [
    { label: 'Trending Opportunities', value: '14 Active', sub: '3 High Priority Breakouts', change: '+28% this week' },
    { label: 'Draft Articles', value: '4 In Studio', sub: 'Y2K, 35mm, Polaroid, Minimalist', change: '2 awaiting assets' },
    { label: 'Ready for Review', value: '1 Pending', sub: 'Mandatory Human Review Gate', change: '80s Retro v1.1' },
    { label: 'Published Articles', value: ALL_ARTICLES.length, sub: 'Live on ai-trending-prompt.com', change: '100% indexed' },
    { label: 'Total Prompt Copies', value: '8,730', sub: 'Aggregated external usage', change: '+34.2% MoM' },
    { label: 'Top Performer', value: '80s Retro', sub: '25.6% Prompt Copy Rate', change: '3,180 copies' }
  ];

  const pipelineStages = [
    { name: 'Idea', count: 8, status: 'Exploratory' },
    { name: 'Research', count: 5, status: 'Signal gathering' },
    { name: 'Draft', count: 3, status: 'Prompt formulation' },
    { name: 'Review', count: 1, status: 'Gate validation' },
    { name: 'Published', count: ALL_ARTICLES.length, status: 'Live & tracked' }
  ];

  const recentActivity = [
    { time: '12 mins ago', action: 'Image regenerated', details: 'Prompt #4 (VHS Camcorder) in 80s Retro Photo Prompts' },
    { time: '1 hour ago', action: 'Trend detected', details: 'Y2K Compact Digicam Photography (+142% search growth)' },
    { time: '3 hours ago', action: 'Prompt updated', details: 'Added --style raw tip to 80s Studio Glamour Portrait' },
    { time: 'Yesterday', action: 'Article published', details: '7 Best 80s Retro AI Photo Prompts released with 7/7 assets' },
    { time: '2 days ago', action: 'Cannibalization check passed', details: 'New opportunity approved for "35mm Film Grain"' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Editorial Header / Directing Work */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: '#2563EB' }}>
            Operations Briefing
          </span>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>•</span>
          <span style={{ fontSize: '0.75rem', color: '#4B5563' }}>What should I work on today?</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
          Content Command Center
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
          Prioritized intelligence for discovering viral AI trends, engineering 1-to-1 prompt recipes, and publishing verified guides.
        </p>
      </div>

      {/* Top Level Operational Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6B7280', marginBottom: '0.4rem' }}>
              {m.label}
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 700, color: '#111827', lineHeight: 1.1 }}>
              {m.value}
            </div>
            <div style={{ fontSize: '0.775rem', color: '#4B5563', marginTop: '0.35rem' }}>
              {m.sub}
            </div>
            <div style={{ fontSize: '0.725rem', color: '#059669', fontWeight: 600, marginTop: '0.25rem' }}>
              {m.change}
            </div>
          </div>
        ))}
      </div>

      {/* Content Performance Feedback Loop Banner */}
      {feedbackLoops.length > 0 && (
        <div style={{
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="status-pill status-pill-blue">FEEDBACK LOOP ALERT</span>
              <span style={{ fontWeight: 600, color: '#1E40AF', fontSize: '0.85rem' }}>
                {feedbackLoops[0].recommendationTitle}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#1E3A8A' }}>
              Article <strong>&ldquo;{feedbackLoops[0].articleTitle}&rdquo;</strong> achieved a <strong>{feedbackLoops[0].copyRate}% copy rate</strong> (3,180 copies).
              Internal telemetry suggests expanding this cluster with subtopics: <em>{feedbackLoops[0].actionableIdeas[0]}</em>.
            </p>
          </div>
          <Link href="/admin/content" className="btn-editorial" style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem', backgroundColor: '#1D4ED8', borderColor: '#1D4ED8' }}>
            Action in Content Studio →
          </Link>
        </div>
      )}

      {/* Grid: Trend Opportunities & Content Pipeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Trend Opportunities Spotlight */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>High-Conviction Trend Opportunities</h2>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.2rem 0 0 0' }}>Multi-signal algorithmic ranking across search, social velocity, and competition</p>
            </div>
            <Link href="/admin/trends" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2563EB' }}>
              View All Radar Trends →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {topTrends.map(trend => (
              <div key={trend.id} style={{
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                padding: '1.15rem',
                backgroundColor: '#F9FAFB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', maxWidth: '65%' }}>
                  <div className={`score-badge-large ${trend.trendScore >= 90 ? 'score-badge-green' : 'score-badge-blue'}`}>
                    {trend.trendScore}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827' }}>{trend.title}</span>
                      <span className="status-pill status-pill-green">{trend.status}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#4B5563', margin: 0, lineHeight: 1.4 }}>
                      {trend.description}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
                      <span>Search Growth: <strong style={{ color: '#111827' }}>+{trend.searchGrowth}%</strong></span>
                      <span>Social: <strong style={{ color: '#111827' }}>{trend.socialMomentum}/100</strong></span>
                      <span>Competition: <strong style={{ color: '#111827' }}>{trend.competition}/100</strong></span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link href={`/admin/trends/${trend.id}`} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                    Research Trend
                  </Link>
                  <Link href={`/admin/content?trendId=${trend.id}`} className="btn-editorial" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', backgroundColor: '#111827' }}>
                    Draft in Studio
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Pipeline Status */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.35rem 0' }}>Content Pipeline</h2>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0 0 1.25rem 0' }}>Current stage volumes</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flexGrow: 1, justifyContent: 'space-around' }}>
            {pipelineStages.map((stage, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', backgroundColor: '#F9FAFB', borderRadius: '6px', border: '1px solid #F3F4F6' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827' }}>{stage.name}</div>
                  <div style={{ fontSize: '0.725rem', color: '#6B7280' }}>{stage.status}</div>
                </div>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '0.2rem 0.75rem',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: '#111827'
                }}>
                  {stage.count}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #F3F4F6' }}>
            <Link href="/admin/content" style={{ fontSize: '0.825rem', fontWeight: 600, color: '#2563EB', display: 'block', textAlign: 'center' }}>
              Open Studio Workflow →
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Top Performing Content & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Top Performing Content Table */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Top Content & Conversion Performance</h2>
              <p style={{ fontSize: '0.775rem', color: '#6B7280', margin: '0.2rem 0 0 0' }}>Monitored by Prompt Copy Rate (Copies / Views)</p>
            </div>
            <Link href="/admin/analytics" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2563EB' }}>
              Full Analytics →
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Article</th>
                  <th>Views</th>
                  <th>Prompt Copies</th>
                  <th>Copy Rate</th>
                  <th>Trend Status</th>
                </tr>
              </thead>
              <tbody>
                {analytics.map(item => (
                  <tr key={item.articleId}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#111827' }}>{item.title}</div>
                      <div style={{ fontSize: '0.725rem', color: '#6B7280' }}>/prompts/{item.slug}</div>
                    </td>
                    <td>{item.views.toLocaleString()}</td>
                    <td>
                      <strong style={{ color: '#111827' }}>{item.promptCopies.toLocaleString()}</strong>
                    </td>
                    <td>
                      <span className={`status-pill ${item.copyRate >= 24 ? 'status-pill-green' : 'status-pill-blue'}`}>
                        {item.copyRate}%
                      </span>
                    </td>
                    <td>
                      <span className="status-pill status-pill-yellow">
                        {item.trendStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Stream */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Recent Operational Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {recentActivity.map((act, i) => (
              <div key={i} style={{ borderBottom: i === recentActivity.length - 1 ? 'none' : '1px solid #F3F4F6', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#111827' }}>{act.action}</span>
                  <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{act.time}</span>
                </div>
                <div style={{ fontSize: '0.775rem', color: '#4B5563', lineHeight: 1.4 }}>
                  {act.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
