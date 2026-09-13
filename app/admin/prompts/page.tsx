import React from 'react';
import Image from 'next/image';
import { RETRO_80S_PROMPTS } from '@/lib/data/prompts-data';

export default function AdminPromptsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
          Prompts Repository & 1-to-1 Mapping
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
          Strict Rule: Every prompt requires 1 dedicated example image. Currently managing {RETRO_80S_PROMPTS.length} verified prompts.
        </p>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Asset</th>
              <th>Prompt Title & Formula</th>
              <th>Recommended AI Tools</th>
              <th>Ratio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {RETRO_80S_PROMPTS.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#E5E7EB' }}>
                    <Image
                      src={p.media.url}
                      alt={p.media.altText}
                      fill
                      sizes="48px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>
                    #{p.number}. {p.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#4B5563', marginTop: '0.2rem', maxWidth: '600px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.promptText}
                  </div>
                </td>
                <td>
                  {p.recommendedTools && p.recommendedTools.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {p.recommendedTools.map(t => (
                        <span key={t} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', backgroundColor: '#F3F4F6', borderRadius: '4px', fontWeight: 600, color: '#1F2937' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span>{p.modelRecommended}</span>
                  )}
                </td>
                <td>{p.aspectRatio}</td>
                <td>
                  <span className="status-pill status-pill-green">
                    ✓ Verified 1:1
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
