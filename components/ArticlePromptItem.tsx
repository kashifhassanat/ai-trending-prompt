import React from 'react';
import Image from 'next/image';
import { Prompt } from '@/lib/types';
import { CopyPromptButton } from './CopyPromptButton';

interface ArticlePromptItemProps {
  prompt: Prompt;
  priority?: boolean;
}

export function ArticlePromptItem({ prompt, priority = false }: ArticlePromptItemProps) {
  const promptId = `prompt-${prompt.number || prompt.slug}`;

  return (
    <article id={promptId} className="article-prompt-card">
      <div className="article-prompt-header">
        <div>
          {prompt.number && (
            <span className="prompt-number-badge">
              Prompt #{prompt.number}
            </span>
          )}
          <h3 className="editorial-h3">
            {prompt.number ? `${prompt.number}. ${prompt.title}` : prompt.title}
          </h3>
        </div>
      </div>

      <div className="article-prompt-image-wrapper">
        <Image
          src={prompt.media.url}
          alt={prompt.media.altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 780px, 780px"
          priority={priority}
          style={{ objectFit: 'cover' }}
        />
      </div>

      {prompt.media.caption && (
        <div className="article-prompt-caption">
          {prompt.media.caption}
        </div>
      )}

      <div className="article-prompt-body">
        <div className="prompt-box">
          <div className="prompt-box-header">
            <span className="prompt-label">AI Generation Prompt</span>
            <CopyPromptButton promptText={prompt.promptText} />
          </div>
          <p className="prompt-text-display">
            {prompt.promptText}
          </p>
        </div>

        {prompt.negativePrompt && (
          <div className="prompt-box" style={{ marginTop: '-0.5rem', backgroundColor: '#FBFBFA' }}>
            <div className="prompt-box-header">
              <span className="prompt-label" style={{ color: '#9C3C1E' }}>Negative Prompt</span>
              <CopyPromptButton promptText={prompt.negativePrompt} buttonLabel="Copy Negative" />
            </div>
            <p className="prompt-text-display" style={{ color: '#6A6A64', fontSize: '0.85rem' }}>
              {prompt.negativePrompt}
            </p>
          </div>
        )}

        <div className="prompt-meta-grid">
          <div>
            <h4 className="prompt-meta-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              How to Use
            </h4>
            <ul className="prompt-how-list">
              {prompt.howToUse.map((step, idx) => (
                <li key={idx} className="prompt-how-item">
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="prompt-meta-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Practical Tip
            </h4>
            <div className="practical-tip-box">
              {prompt.practicalTip}
              {prompt.modelRecommended && (
                <div style={{ marginTop: '0.6rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Recommended Model: <span style={{ fontWeight: 400 }}>{prompt.modelRecommended}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
