import React from 'react';

export default function AdminSettingsPage() {
  const providers = [
    {
      category: 'Trend Discovery Providers',
      name: 'Google Trends & Social Trend Multi-Signal Provider',
      type: 'MOCK PROVIDER',
      status: 'Connected (Simulated Telemetry)',
      targetApi: 'Google Trends API / RapidAPI / Internal Keyword Telemetry',
      notes: 'Production-ready interface `TrendProvider`. Decoupled from live API credentials.'
    },
    {
      category: 'AI Text Generation',
      name: 'Structured Editorial Article Synthesizer',
      type: 'MOCK PROVIDER',
      status: 'Active (Simulated Schema)',
      targetApi: 'Anthropic Claude 3.5 Sonnet / OpenAI GPT-4o',
      notes: 'Generates 7 diverse prompts, optical how-tos, practical tips, FAQs, and SEO tags via `AITextProvider`.'
    },
    {
      category: 'AI Image Generation',
      name: 'Visual Prompt Sample Generator & 1-to-1 Validator',
      type: 'MOCK PROVIDER',
      status: 'Active (Verified Local Assets)',
      targetApi: 'Midjourney API / Fal.ai Flux.1 Dev',
      notes: 'Manages per-prompt regeneration and 1-to-1 prompt-image mapping via `AIImageProvider`.'
    },
    {
      category: 'Analytics & Feedback Loop',
      name: 'Prompt Copy Telemetry Engine',
      type: 'MOCK PROVIDER',
      status: 'Active (Simulated Events)',
      targetApi: 'PostgreSQL Event Store / PostHog',
      notes: 'Tracks Prompt Copy Rate (`copies / views`) and outputs cluster expansion recommendations via `AnalyticsProvider`.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
          Provider Architecture & Integration Settings
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
          Manage external integrations, algorithmic scoring parameters, and decoupled API interfaces.
        </p>
      </div>

      <div style={{
        backgroundColor: '#FEF3C7',
        border: '1px solid #FCD34D',
        borderRadius: '8px',
        padding: '1.25rem',
        color: '#92400E',
        fontSize: '0.85rem',
        lineHeight: 1.5
      }}>
        <strong>Security & Milestone Notice: </strong>
        All provider interfaces (`TrendProvider`, `AITextProvider`, `AIImageProvider`, `AnalyticsProvider`) are production-designed. Currently running with verified mock implementations. No server API keys are hard-coded or exposed in client bundles. Secrets must be configured in environment variables (`.env.production`) when connecting live APIs.
      </div>

      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Provider Domain</th>
              <th>Provider Engine</th>
              <th>Type</th>
              <th>Target Production Integration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, color: '#111827' }}>{p.category}</td>
                <td>
                  <div style={{ fontWeight: 600, color: '#1F2937' }}>{p.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{p.notes}</div>
                </td>
                <td>
                  <span className="admin-environment-badge">{p.type}</span>
                </td>
                <td>
                  <code>{p.targetApi}</code>
                </td>
                <td>
                  <span className="status-pill status-pill-green">{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
