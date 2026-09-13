'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RETRO_80S_PROMPTS } from '@/lib/data/prompts-data';
import { ALL_ARTICLES } from '@/lib/data/articles-data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = query.toLowerCase().trim();

  const filteredPrompts = normalized
    ? RETRO_80S_PROMPTS.filter(
        p =>
          p.title.toLowerCase().includes(normalized) ||
          p.promptText.toLowerCase().includes(normalized) ||
          p.tags?.some(t => t.toLowerCase().includes(normalized))
      )
    : RETRO_80S_PROMPTS.slice(0, 4);

  const filteredArticles = normalized
    ? ALL_ARTICLES.filter(
        a =>
          a.title.toLowerCase().includes(normalized) ||
          a.subtitle?.toLowerCase().includes(normalized) ||
          a.categoryName.toLowerCase().includes(normalized)
      )
    : ALL_ARTICLES;

  return (
    <div className="search-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search Prompts and Articles">
      <div className="search-modal-panel" onClick={e => e.stopPropagation()}>
        <div className="search-input-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search trending AI prompts, styles, film stocks..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
            aria-label="Close search"
          >
            ESC
          </button>
        </div>

        <div className="search-results-list">
          <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            {normalized ? 'Matching Articles' : 'Curated Articles'}
          </div>
          {filteredArticles.map(art => (
            <Link
              key={art.id}
              href={`/prompts/${art.slug}`}
              onClick={onClose}
              className="search-result-row"
            >
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{art.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{art.categoryName} • {art.readingTimeMinutes} min read</div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 500 }}>Read Article →</span>
            </Link>
          ))}

          <div style={{ padding: '0.75rem 0.75rem 0.5rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', marginTop: '0.5rem' }}>
            {normalized ? 'Matching Prompts' : 'Trending Prompts'}
          </div>
          {filteredPrompts.map(prompt => (
            <Link
              key={prompt.id}
              href={`/prompts/80s-retro-photo-prompts#prompt-${prompt.number || prompt.slug}`}
              onClick={onClose}
              className="search-result-row"
            >
              <div style={{ maxWidth: '80%' }}>
                <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                  {prompt.number ? `#${prompt.number} ` : ''}{prompt.title}
                </div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {prompt.promptText}
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>View Prompt →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
