import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Prompt } from '@/lib/types';
import { CopyPromptButton } from './CopyPromptButton';

interface PromptCardProps {
  prompt: Prompt;
  articleSlug?: string;
}

export function PromptCard({ prompt, articleSlug = '80s-retro-photo-prompts' }: PromptCardProps) {
  const targetUrl = `/prompts/${articleSlug}#prompt-${prompt.number || prompt.slug}`;

  return (
    <div className="prompt-card">
      <Link href={targetUrl} className="prompt-card-media">
        <Image
          src={prompt.media.url}
          alt={prompt.media.altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
          style={{ objectFit: 'cover' }}
        />
      </Link>

      <div className="prompt-card-content">
        {prompt.number && (
          <span style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.3rem' }}>
            PROMPT #{prompt.number}
          </span>
        )}

        <Link href={targetUrl}>
          <h3 className="prompt-card-title">
            {prompt.title}
          </h3>
        </Link>

        <p className="prompt-card-preview">
          {prompt.promptText}
        </p>

        <div className="prompt-card-footer">
          <CopyPromptButton promptText={prompt.promptText} buttonLabel="Copy" />
          <Link href={targetUrl} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
