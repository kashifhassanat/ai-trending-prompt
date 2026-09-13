import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { defaultTrendProvider } from '@/lib/providers/trend-provider';
import { checkCannibalization } from '@/lib/services/cannibalization-checker';

interface TrendDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TrendDetailPage({ params }: TrendDetailPageProps) {
  const { id } = await params;
  const trend = await defaultTrendProvider.getTrendById(id);

  if (!trend) {
    notFound();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#6B7280' }}>
        <Link href="/admin/dashboard" style={{ color: '#4B5563' }}>Command Center</Link>
        <span>/</span>
        <Link href="/admin/trends" style={{ color: '#4B5563' }}>Trend Radar</Link>
        <span>/</span>
        <span style={{ color: '#111827', fontWeight: 600 }}>{trend.title}</span>
      </div>

      {/* Overview Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '1.75rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ maxWidth: '75%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span className="status-pill status-pill-green">{trend.status}</span>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Category: <strong>{trend.category}</strong></span>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>• Detected: {new Date(trend.detectedAt).toLocaleDateString()}</span>
          </div>

          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
            {trend.title}
          </h1>
          <p style={{ color: '#4B5563', fontSize: '0.95rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
            {trend.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1rem 1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280' }}>
              Trend Score
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#15803D', lineHeight: 1 }}>
              {trend.trendScore}<span style={{ fontSize: '1rem', color: '#9CA3AF', fontWeight: 500 }}>/100</span>
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #E5E7EB', paddingLeft: '1.25rem', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div>Search Growth: <strong>+{trend.searchGrowth}%</strong></div>
            <div>Social Momentum: <strong>{trend.socialMomentum}/100</strong></div>
            <div>Opportunity: <strong>{trend.contentOpportunity}/100</strong></div>
          </div>
        </div>
      </div>

      {/* Grid: Why It Matters & Signals */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Why It Matters */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Why It Matters</h2>
          <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6, margin: 0 }}>
            {trend.whyItMatters}
          </p>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #F3F4F6' }}>
            <h3 style={{ fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6B7280', marginBottom: '0.5rem' }}>
              Rising Formats & Styles
            </h3>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {trend.relatedStyles.map((st, i) => (
                <span key={i} style={{ backgroundColor: '#EFF6FF', color: '#1E40AF', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 500 }}>
                  {st}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Social Signals */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Search Intent Signals</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {trend.relatedQueries.map((q, i) => (
                <li key={i} style={{ fontSize: '0.8rem', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: '#2563EB' }}>•</span>
                  <code>&ldquo;{q}&rdquo;</code>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '1rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Social Velocity Signals</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {trend.sourceSignals.map((sig, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.775rem' }}>
                  <span style={{ fontWeight: 600, color: '#111827' }}>{sig.sourceName}</span>
                  <span className="status-pill status-pill-blue">{sig.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Landscape: Existing vs Open Opportunities */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.35rem 0' }}>Content Landscape & Coverage</h2>
        <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0 0 1.25rem 0' }}>
          Audit of existing published pages on ai-trending-prompt.com to prevent keyword cannibalization
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803D', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              ✓ Published Live Articles ({trend.existingArticleCount})
            </div>
            {trend.existingArticles.length > 0 ? (
              trend.existingArticles.map(art => (
                <div key={art.id} style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  <Link href={`/prompts/${art.slug}`} target="_blank" style={{ color: '#111827' }}>
                    {art.title} ↗
                  </Link>
                </div>
              ))
            ) : (
              <div style={{ fontSize: '0.8rem', color: '#6B7280', fontStyle: 'italic' }}>
                No published articles yet for this topic. High greenfield potential.
              </div>
            )}
          </div>

          <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Opportunity Analysis
            </div>
            <div style={{ fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.5 }}>
              • Saturated angle: Generic 80s neon grids with modern 3D smoothness.<br />
              • Underserved angle: Authentic physical film artifacts (Kodachrome 64, VHS phosphor bloom, Polaroid borders).
            </div>
          </div>
        </div>
      </div>

      {/* Content Gap Discovery (Requirement 14) */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#7C3AED' }}>
                Automated Radar Synthesis
              </span>
              <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>•</span>
              <span style={{ fontSize: '0.75rem', color: '#4B5563' }}>Trending Topics + Existing Content + Topic Clusters</span>
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Content Gap Discovery</h2>
          </div>
          <span className="status-pill status-pill-purple">Cluster Gaps Identified</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 700, marginBottom: '0.25rem' }}>✓ Existing Coverage</div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>General 80s Retro Studio Prompts</div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>Status: Published & Ranking</div>
          </div>

          <div style={{ padding: '1rem', backgroundColor: '#FEFCE8', border: '1px solid #FEF08A', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: '#B45309', fontWeight: 700, marginBottom: '0.25rem' }}>Missing Opportunity #1 (Score: 92)</div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>80s VHS Camcorder Aesthetic</div>
            <div style={{ fontSize: '0.75rem', color: '#4B5563', marginTop: '0.25rem' }}>Search growth +184% • Low Competition</div>
          </div>

          <div style={{ padding: '1rem', backgroundColor: '#FEFCE8', border: '1px solid #FEF08A', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: '#B45309', fontWeight: 700, marginBottom: '0.25rem' }}>Missing Opportunity #2 (Score: 88)</div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>80s Neon Arcade Portraits</div>
            <div style={{ fontSize: '0.75rem', color: '#4B5563', marginTop: '0.25rem' }}>Search growth +142% • Rising Topic</div>
          </div>

          <div style={{ padding: '1rem', backgroundColor: '#FEFCE8', border: '1px solid #FEF08A', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: '#B45309', fontWeight: 700, marginBottom: '0.25rem' }}>Missing Opportunity #3 (Score: 84)</div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>80s Mall Photography Candids</div>
            <div style={{ fontSize: '0.75rem', color: '#4B5563', marginTop: '0.25rem' }}>Search growth +110% • Lifestyle Demand</div>
          </div>
        </div>
      </div>

      {/* Content Opportunities List */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Actionable Content Opportunities</h2>
            <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.2rem 0 0 0' }}>
              PSEO target queries validated against cannibalization check rules
            </p>
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#4B5563' }}>
            {trend.contentOpportunities.length} Validated Angles
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {trend.contentOpportunities.map(opp => {
            const check = checkCannibalization({
              title: opp.title,
              targetQuery: opp.targetKeyword,
              searchIntent: opp.searchIntent
            });

            return (
              <div
                key={opp.id}
                style={{
                  padding: '1.5rem',
                  borderBottom: '1px solid #F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.25rem'
                }}
              >
                <div style={{ maxWidth: '70%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>
                      {opp.title}
                    </span>
                    <span className="status-pill status-pill-blue">
                      {opp.searchIntent}
                    </span>
                    <span className={`status-pill ${
                      check.status === 'GREEN' ? 'status-pill-green' : check.status === 'YELLOW' ? 'status-pill-yellow' : 'status-pill-red'
                    }`}>
                      {check.status === 'GREEN' ? 'New Opportunity' : check.status === 'YELLOW' ? 'Overlap Check' : 'Duplicate Risk'}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#4B5563', margin: '0 0 0.4rem 0', lineHeight: 1.4 }}>
                    {opp.contentAngle}
                  </p>

                  <div style={{ fontSize: '0.75rem', color: '#6B7280', display: 'flex', gap: '1rem' }}>
                    <span>Coverage: <strong>{opp.existingCoverage}</strong></span>
                    <span>Recommended Prompts: <strong>{opp.recommendedPromptCount}</strong></span>
                    <span>Target Query: <code>&ldquo;{opp.targetKeyword}&rdquo;</code></span>
                  </div>

                  {check.status === 'RED' && (
                    <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: '#991B1B', backgroundColor: '#FEF2F2', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                      ⚠ {check.recommendation}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ textAlign: 'right', marginRight: '0.5rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase' }}>Opportunity</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#15803D' }}>{opp.opportunityScore}</div>
                  </div>

                  <Link
                    href={`/admin/content?topic=${encodeURIComponent(opp.title)}&intent=${opp.searchIntent}&trendId=${trend.id}`}
                    className="btn-editorial"
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: check.status === 'RED' ? '#6B7280' : '#111827',
                      borderColor: check.status === 'RED' ? '#6B7280' : '#111827',
                      opacity: check.status === 'RED' ? 0.7 : 1
                    }}
                  >
                    Generate Article →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
