import React from 'react';
import Image from 'next/image';
import { Prompt } from '@/lib/types';
import { getAIToolById } from '@/lib/data/ai-tools-data';
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

        {/* AI Tool Compatibility Bar */}
        {(prompt.recommendedTools && prompt.recommendedTools.length > 0) && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#F8F9FA',
            border: '1px solid #E9ECEF',
            borderRadius: '6px',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Tool Compatibility & Workflow
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Designed for today&apos;s leading AI creation tools
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginRight: '0.2rem' }}>
                Recommended:
              </span>
              {prompt.recommendedTools.map(toolId => {
                const tool = getAIToolById(toolId);
                return (
                  <span
                    key={toolId}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.2rem 0.55rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #D4D4CA',
                      borderRadius: '4px',
                      fontSize: '0.775rem',
                      fontWeight: 600,
                      color: '#121211'
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1E6B47' }} />
                    {tool?.name || toolId}
                  </span>
                );
              })}

              {prompt.compatibleTools && prompt.compatibleTools.length > 0 && (
                <>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '0.4rem', marginRight: '0.2rem' }}>
                    Compatible:
                  </span>
                  {prompt.compatibleTools.map(toolId => {
                    const tool = getAIToolById(toolId);
                    return (
                      <span
                        key={toolId}
                        style={{
                          padding: '0.2rem 0.5rem',
                          backgroundColor: '#F1F3F5',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {tool?.name || toolId}
                      </span>
                    );
                  })}
                </>
              )}
            </div>
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
                  Compatibility: <span style={{ fontWeight: 400 }}>{prompt.modelRecommended}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tool-Specific Notes Guidance Drawer */}
        {prompt.toolSpecificNotes && prompt.toolSpecificNotes.length > 0 && (
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '0.6rem', fontWeight: 700 }}>
              Tool-Specific Optimizations
            </h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.6rem' }}>
              {prompt.toolSpecificNotes.map(noteItem => (
                <div
                  key={noteItem.toolId}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: '#FAFAF8',
                    border: '1px solid #EBEBE6',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    lineHeight: '1.45'
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                    {noteItem.toolName}
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    {noteItem.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
