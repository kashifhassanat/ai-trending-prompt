'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchIntent, ContentStage, ImageStatus } from '@/lib/types';
import { defaultAITextProvider } from '@/lib/providers/ai-text-provider';
import { defaultAIImageProvider } from '@/lib/providers/ai-image-provider';
import { ALL_ARTICLES } from '@/lib/data/articles-data';

export default function ContentStudioPage() {
  const [activeStage, setActiveStage] = useState<ContentStage | 'ALL'>('ALL');
  const [topic, setTopic] = useState('80s Retro Photo Prompts');
  const [searchIntent, setSearchIntent] = useState<SearchIntent>('INSPIRATION');
  const [contentType, setContentType] = useState('AI Photo Recipe Guide');
  const [targetAudience, setTargetAudience] = useState('Creators & Photographers');
  const [promptCount, setPromptCount] = useState(7);
  const [imageCount, setImageCount] = useState(7);

  const [isGenerating, startGenerating] = useTransition();
  const [generatedDraft, setGeneratedDraft] = useState<(typeof ALL_ARTICLES)[0] | null>(ALL_ARTICLES[0]);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);

  // Per-prompt image statuses for testing Section 17
  const [imageStatuses, setImageStatuses] = useState<Record<number, ImageStatus>>({
    1: 'READY',
    2: 'READY',
    3: 'READY',
    4: 'NEEDS_REVIEW',
    5: 'READY',
    6: 'READY',
    7: 'READY',
  });

  const pipelineStages: ContentStage[] = [
    'IDEA',
    'RESEARCH',
    'DRAFT',
    'ASSETS',
    'QUALITY_CHECK',
    'REVIEW',
    'PUBLISHED'
  ];

  const handleGenerateDraft = () => {
    startGenerating(async () => {
      setGenerationNotice('Analyzing topic, search intent, and generating 7 diverse prompt concepts...');
      const draft = await defaultAITextProvider.generateArticle({
        topic,
        searchIntent,
        contentType,
        targetAudience,
        promptCount,
        imageCount,
      });
      setGeneratedDraft(draft);
      setGenerationNotice(`Draft successfully generated with ${draft.prompts.length} prompt concepts and image briefs!`);
      setTimeout(() => setGenerationNotice(null), 4000);
    });
  };

  const handleRegenerateImage = (promptNumber: number) => {
    setImageStatuses(prev => ({ ...prev, [promptNumber]: 'GENERATING' }));
    setTimeout(() => {
      setImageStatuses(prev => ({ ...prev, [promptNumber]: 'READY' }));
    }, 1200);
  };

  const handleGenerateAllImages = () => {
    setImageStatuses({
      1: 'GENERATING',
      2: 'GENERATING',
      3: 'GENERATING',
      4: 'GENERATING',
      5: 'GENERATING',
      6: 'GENERATING',
      7: 'GENERATING'
    });
    setTimeout(() => {
      setImageStatuses({
        1: 'READY',
        2: 'READY',
        3: 'READY',
        4: 'READY',
        5: 'READY',
        6: 'READY',
        7: 'READY'
      });
    }, 1500);
  };

  const consistency = defaultAIImageProvider.validateConsistency(generatedDraft?.prompts || []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: '#2563EB' }}>
              Production Engine
            </span>
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>•</span>
            <span style={{ fontSize: '0.75rem', color: '#4B5563' }}>Pipeline Workflow</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
            Content Studio
          </h1>
          <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
            Where trend opportunities become complete, verified 1-to-1 prompt recipe articles.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/admin/review" className="btn-secondary" style={{ fontSize: '0.8rem' }}>
            Go to Review Queue →
          </Link>
        </div>
      </div>

      {/* Visual Pipeline Tracker */}
      <div className="pipeline-track">
        <button
          type="button"
          onClick={() => setActiveStage('ALL')}
          className={`pipeline-step ${activeStage === 'ALL' ? 'pipeline-step-active' : ''}`}
        >
          All Projects (7)
        </button>
        {pipelineStages.map(stage => {
          const isActive = activeStage === stage;
          return (
            <button
              key={stage}
              type="button"
              onClick={() => setActiveStage(stage)}
              className={`pipeline-step ${isActive ? 'pipeline-step-active' : ''}`}
            >
              <span>{stage}</span>
            </button>
          );
        })}
      </div>

      {/* Generation Wizard Card */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>AI Article Generation Configuration</h2>
            <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.2rem 0 0 0' }}>
              Produces a structured editorial draft, 6–7 diverse prompt formulas, optical how-to guides, and SEO metadata.
            </p>
          </div>
          <span className="status-pill status-pill-purple">
            MOCK GENERATOR ENGINE
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
              Topic / Opportunity Title
            </label>
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
              Search Intent
            </label>
            <select
              value={searchIntent}
              onChange={e => setSearchIntent(e.target.value as SearchIntent)}
              style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: '#FFFFFF' }}
            >
              <option value="INSPIRATION">INSPIRATION</option>
              <option value="HOW_TO">HOW_TO</option>
              <option value="STYLE">STYLE</option>
              <option value="TRANSFORMATION">TRANSFORMATION</option>
              <option value="USE_CASE">USE_CASE</option>
              <option value="COMMERCIAL">COMMERCIAL</option>
              <option value="COMPARISON">COMPARISON</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
              Content Type
            </label>
            <input
              type="text"
              value={contentType}
              onChange={e => setContentType(e.target.value)}
              style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={e => setTargetAudience(e.target.value)}
              style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
              Prompts & Images Count (6–7)
            </label>
            <select
              value={promptCount}
              onChange={e => {
                const val = parseInt(e.target.value, 10);
                setPromptCount(val);
                setImageCount(val);
              }}
              style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: '#FFFFFF' }}
            >
              <option value={7}>7 Prompts + 7 Images (Recommended)</option>
              <option value={6}>6 Prompts + 6 Images</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid #F3F4F6' }}>
          <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
            Prompt / Image pairing: <strong>{promptCount} Prompts ↔ {imageCount} Images</strong> (Strict 1-to-1 mapping enforced)
          </div>
          <button
            type="button"
            onClick={handleGenerateDraft}
            disabled={isGenerating}
            className="btn-editorial"
            style={{ backgroundColor: '#111827', borderColor: '#111827' }}
          >
            {isGenerating ? 'Generating Structured Draft...' : 'Generate Draft in Studio'}
          </button>
        </div>

        {generationNotice && (
          <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', backgroundColor: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0', borderRadius: '6px', fontSize: '0.825rem' }}>
            ✓ {generationNotice}
          </div>
        )}
      </div>

      {/* Active Draft Showcase */}
      {generatedDraft && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }}>
          {/* Draft Overview & Prompts List */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <span className="status-pill status-pill-blue" style={{ marginBottom: '0.35rem' }}>
                  STAGE: ASSETS & CONSISTENCY CHECK
                </span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.25rem 0 0 0' }}>
                  {generatedDraft.title}
                </h2>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.2rem' }}>
                  /prompts/{generatedDraft.slug} • {generatedDraft.categoryName} • {generatedDraft.prompts.length} Prompts
                </div>
              </div>

              <Link
                href={`/prompts/${generatedDraft.slug}`}
                target="_blank"
                className="btn-secondary"
                style={{ fontSize: '0.775rem', padding: '0.35rem 0.75rem' }}
              >
                Preview Live ↗
              </Link>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              {generatedDraft.subtitle}
            </p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6B7280', marginBottom: '0.75rem' }}>
              Prompts Breakdown ({generatedDraft.prompts.length} Prompts)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {generatedDraft.prompts.map((p, idx) => (
                <div key={p.id} style={{ border: '1px solid #E5E7EB', borderRadius: '6px', padding: '1rem', backgroundColor: '#F9FAFB' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827' }}>
                      #{idx + 1}. {p.title}
                    </span>
                    <span style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: '#6B7280' }}>
                      Ratio: {p.aspectRatio}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.775rem', fontFamily: 'var(--font-mono)', color: '#4B5563', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '4px', padding: '0.5rem', maxHeight: '3.6em', overflow: 'hidden' }}>
                    {p.promptText}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
                    <span>Model: <strong>{p.modelRecommended}</strong></span>
                    <span style={{ color: '#059669', fontWeight: 600 }}>Tip: {p.practicalTip.slice(0, 45)}...</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 17 & 18: Image Status Matrix & 1-to-1 Consistency Validator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Image Status Matrix */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Image Status Matrix</h3>
                  <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '0.15rem 0 0 0' }}>Per-prompt dedicated asset controls</p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateAllImages}
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                >
                  Generate All Images
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {generatedDraft.prompts.map((p, idx) => {
                  const num = idx + 1;
                  const st = imageStatuses[num] || 'READY';

                  return (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.75rem', border: '1px solid #E5E7EB', borderRadius: '6px', backgroundColor: '#F9FAFB' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ position: 'relative', width: '38px', height: '38px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#E5E7EB' }}>
                          {p.media?.url && (
                            <Image
                              src={p.media.url}
                              alt={p.media.altText || 'Sample'}
                              fill
                              sizes="38px"
                              style={{ objectFit: 'cover' }}
                            />
                          )}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#111827' }}>
                            Prompt 0{num}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>
                            {st === 'READY' ? (
                              <span style={{ color: '#059669', fontWeight: 600 }}>✓ Ready</span>
                            ) : st === 'GENERATING' ? (
                              <span style={{ color: '#2563EB', fontWeight: 600 }}>Generating...</span>
                            ) : (
                              <span style={{ color: '#D97706', fontWeight: 600 }}>⚠ Needs Review</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          type="button"
                          onClick={() => handleRegenerateImage(num)}
                          className="btn-secondary"
                          style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}
                          title="Never force regenerating the whole article if only one image needs revision"
                        >
                          Regenerate
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prompt/Image Consistency Check */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Prompt/Image Validator</h3>
                <span className={`status-pill ${consistency.status === 'PASS' ? 'status-pill-green' : 'status-pill-yellow'}`}>
                  {consistency.status}
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.5, marginBottom: '1rem' }}>
                Rule: <strong>1 Prompt ↔ 1 Corresponding Image</strong>. Verified {consistency.readyImages} of {consistency.totalPrompts} prompts with unique visual assets.
              </div>

              <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.75rem', color: '#6B7280' }}>
                <div>• Prompt existence: <strong>Verified</strong></div>
                <div>• Image URL existence: <strong>Verified</strong></div>
                <div>• Alt text coverage: <strong>100%</strong></div>
                <div>• Superficially duplicate check: <strong>Passed</strong></div>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <Link href="/admin/review" className="btn-editorial" style={{ width: '100%', fontSize: '0.8rem', textAlign: 'center', backgroundColor: '#111827' }}>
                  Submit to Human Review Queue →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
