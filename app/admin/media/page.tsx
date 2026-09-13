import React from 'react';
import Image from 'next/image';
import { RETRO_80S_PROMPTS } from '@/lib/data/prompts-data';
import { ARTICLE_80S_RETRO } from '@/lib/data/articles-data';

export default function AdminMediaPage() {
  const allMedia = [
    ARTICLE_80S_RETRO.featuredMedia,
    ...RETRO_80S_PROMPTS.map(p => p.media),
    ...ARTICLE_80S_RETRO.relatedArticles.map(r => r.media)
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
          Media Assets & Example Gallery
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
          Tracking {allMedia.length} verified photographic assets. Every image is stored locally in <code>public/images/</code> and mapped 1-to-1.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {allMedia.map((m, idx) => (
          <div key={idx} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '180px', backgroundColor: '#F3F4F6' }}>
              <Image
                src={m.url}
                alt={m.altText}
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#6B7280', marginBottom: '0.25rem' }}>
                {m.url}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827', lineHeight: 1.3 }}>
                {m.altText}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid #F3F4F6', fontSize: '0.75rem' }}>
                <span className="status-pill status-pill-green">Verified Asset</span>
                <span style={{ color: '#6B7280' }}>Ratio: 4:3</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
