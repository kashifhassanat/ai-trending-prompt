import React from 'react';
import { AI_TOOLS_REGISTRY } from '@/lib/data/ai-tools-data';

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
      targetApi: 'Anthropic Claude 3.5 Sonnet / OpenAI GPT-4o / Google Gemini',
      notes: 'Generates 7 diverse prompts, optical how-tos, practical tips, FAQs, and SEO tags via `AITextProvider`.'
    },
    {
      category: 'AI Image Generation',
      name: 'Visual Prompt Sample Generator & 1-to-1 Validator',
      type: 'MOCK PROVIDER',
      status: 'Active (Verified Local Assets)',
      targetApi: 'Midjourney API / Fal.ai Flux.1 Dev / Imagen 3',
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
          Provider Architecture & AI Tool Registry
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
          Tool-agnostic AI creation workflow management, extensible tool registry, and decoupled API interfaces.
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
        <strong>Tool Positioning Notice: </strong>
        The platform is strictly <strong>tool-agnostic</strong> and designed around modern AI creation workflows. Public pages use neutral phrasing: <em>&ldquo;Prompts designed for today&apos;s leading AI creation tools.&rdquo;</em> Primary general-purpose tools are <strong>Google Gemini</strong> and <strong>ChatGPT</strong>. Google Flow is designated primarily as a future AI Video tool. DeepSeek is designated for reasoning and code, not primary image generation.
      </div>

      {/* AI Tool Registry & Compatibility Matrix */}
      <div>
        <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>
              AI Tool Compatibility Registry
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
              Extensible domain model (`AITool`) for mapping prompt compatibility, capabilities, and workflow positioning.
            </p>
          </div>
          <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.6rem', backgroundColor: '#EEF2FF', color: '#3730A3', borderRadius: '4px', fontWeight: 600 }}>
            {AI_TOOLS_REGISTRY.length} Registered Tools
          </span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Category</th>
                <th>Status</th>
                <th>Core Capabilities</th>
                <th>Positioning Guidelines</th>
              </tr>
            </thead>
            <tbody>
              {AI_TOOLS_REGISTRY.map(tool => {
                let badgeClass = 'status-pill-green';
                if (tool.status === 'FUTURE_PLANNED') badgeClass = 'status-pill-blue';
                if (tool.status === 'BETA') badgeClass = 'status-pill-amber';

                let categoryColor = '#3B82F6';
                if (tool.category === 'GENERAL_PURPOSE') categoryColor = '#10B981';
                if (tool.category === 'VIDEO_GENERATION') categoryColor = '#8B5CF6';
                if (tool.category === 'REASONING_AND_CODE') categoryColor = '#F59E0B';

                return (
                  <tr key={tool.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#111827' }}>
                        <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                          {tool.name}
                        </a>
                      </div>
                      <code style={{ fontSize: '0.725rem', color: '#6B7280' }}>id: {tool.id}</code>
                    </td>
                    <td>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: `${categoryColor}15`,
                        color: categoryColor
                      }}>
                        {tool.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill ${badgeClass}`}>
                        {tool.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                        {tool.capabilities.slice(0, 3).map((c, idx) => (
                          <span key={idx} style={{ fontSize: '0.725rem', padding: '0.15rem 0.4rem', backgroundColor: '#F3F4F6', borderRadius: '3px', color: '#374151' }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#4B5563', maxWidth: '300px' }}>
                      {tool.notes}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provider Backend Architecture */}
      <div>
        <div style={{ marginBottom: '0.75rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>
            Internal Provider Architecture
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
            Decoupled service layers for trend telemetry, text synthesis, image generation, and analytics.
          </p>
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
    </div>
  );
}
