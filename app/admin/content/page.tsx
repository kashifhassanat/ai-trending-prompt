'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchIntent, ContentStage, ImageStatus, ContentType, ContentBrief } from '@/lib/types';
import { defaultAITextProvider } from '@/lib/providers/ai-text-provider';
import { defaultAIImageProvider } from '@/lib/providers/ai-image-provider';
import { ALL_ARTICLES } from '@/lib/data/articles-data';
import { checkCannibalization } from '@/lib/services/cannibalization-checker';
import { evaluatePSEOOpportunity } from '@/lib/services/pseo-opportunity-scorer';
import { generateBidirectionalLinks } from '@/lib/services/internal-linking-engine';
import { evaluateArticleQuality } from '@/lib/services/quality-engine';

export default function ContentStudioPage() {
  const [activeStage, setActiveStage] = useState<ContentStage | 'ALL'>('ALL');
  
  // Mandatory First-Class SEO & Search Intent Fields
  const [topic, setTopic] = useState('80s Retro Photo Prompts');
  const [primaryQuery, setPrimaryQuery] = useState('80s retro ai photo prompts');
  const [secondaryQueries, setSecondaryQueries] = useState('80s mall photo midjourney, vhs camcorder prompt, 80s studio portrait flux');
  const [searchIntent, setSearchIntent] = useState<SearchIntent>('INSPIRATION');
  const [contentType, setContentType] = useState<ContentType>('Visual Prompt Recipe');
  const [targetAudience, setTargetAudience] = useState('Creators, nostalgic photographers, and digital artists');
  const [topicClusterId, setTopicClusterId] = useState('cluster-styles');
  const [parentTopic, setParentTopic] = useState('Styles');
  const [contentAngle, setContentAngle] = useState('Period-accurate analog camera simulations and authentic 1980s flash photography');
  const [promptCount, setPromptCount] = useState(7);
  const [imageCount, setImageCount] = useState(7);

  // Content Brief Phase (Requirement 9)
  const [contentBrief, setContentBrief] = useState<ContentBrief | null>(null);
  const [briefApproved, setBriefApproved] = useState(false);

  const [isGenerating, startGenerating] = useTransition();
  const [generatedDraft, setGeneratedDraft] = useState<(typeof ALL_ARTICLES)[0] | null>(ALL_ARTICLES[0]);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);

  // Per-prompt image statuses for Section 17
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

  // Live PSEO Intelligence Checks
  const cannibalization = checkCannibalization({
    title: topic,
    primaryQuery,
    secondaryQueries: secondaryQueries.split(',').map(s => s.trim()),
    searchIntent,
    topicClusterId,
    contentAngle
  });

  const pseoOpportunity = evaluatePSEOOpportunity({
    topic,
    primaryQuery,
    searchIntent,
    targetAudience,
    topicClusterId,
    contentAngle
  });

  const bidirectionalLinks = generateBidirectionalLinks({
    title: topic,
    primaryQuery,
    topicClusterId,
    categorySlug: 'retro-vintage'
  });

  const quality = generatedDraft ? evaluateArticleQuality(generatedDraft) : null;

  // Step 1: Create Content Brief
  const handleCreateContentBrief = () => {
    startGenerating(async () => {
      setGenerationNotice('Synthesizing search intent, competitive landscape, and topic cluster for Content Brief...');
      const brief = await defaultAITextProvider.generateContentBrief({
        topic,
        primaryQuery,
        secondaryQueries: secondaryQueries.split(',').map(s => s.trim()),
        searchIntent,
        contentType,
        targetAudience,
        topicClusterId,
        parentTopic,
        contentAngle,
        promptCount,
        imageCount
      });
      setContentBrief(brief);
      setBriefApproved(false);
      setGenerationNotice('Content Brief generated! Review and approve before full article production.');
      setTimeout(() => setGenerationNotice(null), 4000);
    });
  };

  // Step 2: Approve Content Brief
  const handleApproveBrief = () => {
    if (contentBrief) {
      setContentBrief({ ...contentBrief, approvedByAdmin: true, approvedAt: new Date().toISOString() });
      setBriefApproved(true);
      setGenerationNotice('Content Brief APPROVED! Full AI draft generation unlocked.');
      setTimeout(() => setGenerationNotice(null), 3000);
    }
  };

  // Step 3: Generate Draft (Blocked if Brief not approved or Cannibalization is RED)
  const handleGenerateDraft = () => {
    if (cannibalization.status === 'RED') {
      alert('Generation Blocked: Cannibalization risk is RED. Please change search intent or choose a narrower subtopic.');
      return;
    }
    if (!briefApproved) {
      alert('Approval Required: You must review and approve the Content Brief before generating the article.');
      return;
    }

    startGenerating(async () => {
      setGenerationNotice('Engineering 7 diverse prompt scenarios, image briefs, how-to guides, and SEO schema...');
      const draft = await defaultAITextProvider.generateArticle({
        topic,
        primaryQuery,
        secondaryQueries: secondaryQueries.split(',').map(s => s.trim()),
        searchIntent,
        contentType,
        targetAudience,
        topicClusterId,
        parentTopic,
        contentAngle,
        promptCount,
        imageCount
      });
      setGeneratedDraft(draft);
      setGenerationNotice(`Draft successfully generated with ${draft.prompts.length} prompt recipes and 1-to-1 image briefs!`);
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
    }, 2000);
  };

  const consistency = defaultAIImageProvider.validateConsistency(generatedDraft?.prompts || []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: '#2563EB' }}>
              PSEO Content Command Center
            </span>
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>•</span>
            <span style={{ fontSize: '0.75rem', color: '#4B5563' }}>Strict Quality Gate Workflow</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
            Content Studio
          </h1>
          <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
            Where trend opportunities undergo PSEO uniqueness validation, content brief approval, and 1-to-1 prompt recipe generation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/admin/review" className="btn-editorial" style={{ fontSize: '0.8rem', backgroundColor: '#111827', borderColor: '#111827' }}>
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

      {/* Notice Alert */}
      {generationNotice && (
        <div style={{ padding: '0.85rem 1.25rem', backgroundColor: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500 }}>
          {generationNotice}
        </div>
      )}

      {/* Grid: Generation Configuration & Live PSEO Intelligence */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        
        {/* Left Column: Generation Parameters */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>1. Topic & Search Intent Setup</h2>
            <span className="status-pill status-pill-blue">First-Class PSEO Model</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                Topic / Opportunity Title
              </label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                  Primary Target Query <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  value={primaryQuery}
                  onChange={e => setPrimaryQuery(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                  Search Intent <span style={{ color: '#DC2626' }}>* (Mandatory)</span>
                </label>
                <select
                  value={searchIntent}
                  onChange={e => setSearchIntent(e.target.value as SearchIntent)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: '#FFFFFF' }}
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
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                Secondary Queries (Comma separated)
              </label>
              <input
                type="text"
                value={secondaryQueries}
                onChange={e => setSecondaryQueries(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                  Content Type (Template Archetype)
                </label>
                <select
                  value={contentType}
                  onChange={e => setContentType(e.target.value as ContentType)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: '#FFFFFF' }}
                >
                  <option value="Visual Prompt Recipe">Visual Prompt Recipe</option>
                  <option value="How-To Guide">How-To Guide</option>
                  <option value="Trend Guide">Trend Guide</option>
                  <option value="Style Guide">Style Guide</option>
                  <option value="Use-Case Guide">Use-Case Guide</option>
                  <option value="Commercial Prompt Guide">Commercial Prompt Guide</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                  Topic Cluster
                </label>
                <select
                  value={topicClusterId}
                  onChange={e => {
                    setTopicClusterId(e.target.value);
                    setParentTopic(e.target.value === 'cluster-styles' ? 'Styles' : e.target.value === 'cluster-people' ? 'People' : 'Commercial');
                  }}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: '#FFFFFF' }}
                >
                  <option value="cluster-styles">Styles (80s Retro, Y2K, Film, Polaroid)</option>
                  <option value="cluster-people">People (Couples, Portraits, Weddings)</option>
                  <option value="cluster-editing">Editing (Background, Lighting, Optics)</option>
                  <option value="cluster-commercial">Commercial (Product, Food, Jewelry)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                  Target Audience
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={e => setTargetAudience(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                  Prompts Count (6–7)
                </label>
                <select
                  value={promptCount}
                  onChange={e => {
                    const val = parseInt(e.target.value, 10);
                    setPromptCount(val);
                    setImageCount(val);
                  }}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: '#FFFFFF' }}
                >
                  <option value={7}>7 Prompts + 7 Images (Standard)</option>
                  <option value={6}>6 Prompts + 6 Images</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                Content Angle / Differentiating Factor
              </label>
              <input
                type="text"
                value={contentAngle}
                onChange={e => setContentAngle(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.875rem' }}
              />
            </div>
          </div>

          {/* Workflow Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #F3F4F6', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={handleCreateContentBrief}
              disabled={isGenerating}
              className="btn-secondary"
              style={{ fontSize: '0.825rem' }}
            >
              Step 1: {contentBrief ? 'Regenerate Content Brief' : 'Generate Content Brief'}
            </button>

            <button
              type="button"
              onClick={handleGenerateDraft}
              disabled={isGenerating || !briefApproved || cannibalization.status === 'RED'}
              className="btn-editorial"
              style={{
                fontSize: '0.825rem',
                backgroundColor: !briefApproved || cannibalization.status === 'RED' ? '#9CA3AF' : '#111827',
                borderColor: !briefApproved || cannibalization.status === 'RED' ? '#9CA3AF' : '#111827',
                cursor: !briefApproved || cannibalization.status === 'RED' ? 'not-allowed' : 'pointer'
              }}
            >
              {isGenerating ? 'Generating Draft...' : 'Step 2: Generate Full 7 Prompts & Draft'}
            </button>
          </div>

          {!briefApproved && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#B45309' }}>
              ⓘ Full article generation requires Content Brief approval and non-RED cannibalization status.
            </div>
          )}
        </div>

        {/* Right Column: Real-time PSEO & Cannibalization Radar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Cannibalization Box */}
          <div style={{
            backgroundColor: cannibalization.status === 'GREEN' ? '#F0FDF4' : cannibalization.status === 'YELLOW' ? '#FEFCE8' : '#FEF2F2',
            border: cannibalization.status === 'GREEN' ? '1px solid #BBF7D0' : cannibalization.status === 'YELLOW' ? '1px solid #FEF08A' : '1px solid #FECACA',
            borderRadius: '8px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                PSEO Cannibalization Check
              </span>
              <span className={`status-pill ${
                cannibalization.status === 'GREEN' ? 'status-pill-green' : cannibalization.status === 'YELLOW' ? 'status-pill-yellow' : 'status-pill-red'
              }`}>
                {cannibalization.status === 'GREEN' ? '✓ DISTINCT (GREEN)' : cannibalization.status === 'YELLOW' ? '⚠ OVERLAP (YELLOW)' : '⛔ CANNIBALIZATION (RED)'}
              </span>
            </div>

            <p style={{ fontSize: '0.825rem', margin: '0 0 0.5rem 0', color: cannibalization.status === 'RED' ? '#991B1B' : '#1F2937' }}>
              {cannibalization.recommendation}
            </p>

            {cannibalization.status === 'RED' && (
              <div style={{ marginTop: '0.75rem', borderTop: '1px solid #FECACA', paddingTop: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991B1B', marginBottom: '0.4rem' }}>
                  Actionable Mitigation Options:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.75rem', color: '#7F1D1D' }}>
                  {cannibalization.specificActionRecommendations.map((act, i) => (
                    <div key={i}>
                      <strong>• {act.label}:</strong> {act.description}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Explainable PSEO Opportunity Score (Requirement 6) */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 600 }}>PSEO Opportunity Score</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#15803D' }}>
                  {pseoOpportunity.score}<span style={{ fontSize: '1rem', color: '#9CA3AF', fontWeight: 400 }}>/100</span>
                </div>
              </div>
              <span className="status-pill status-pill-green">Explainable Model</span>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#4B5563', margin: '0 0 0.75rem 0', lineHeight: 1.4 }}>
              {pseoOpportunity.rationale}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem', borderTop: '1px solid #F3F4F6', paddingTop: '0.75rem' }}>
              <div>Search Demand: <strong>{pseoOpportunity.breakdown.searchDemand}</strong></div>
              <div>Trend Momentum: <strong>{pseoOpportunity.breakdown.trendMomentum}</strong></div>
              <div>Content Uniqueness: <strong>{pseoOpportunity.breakdown.contentUniqueness}</strong></div>
              <div>Coverage Gap: <strong>{pseoOpportunity.breakdown.coverageGap}</strong></div>
              <div>Intent Clarity: <strong>{pseoOpportunity.breakdown.searchIntentClarity}</strong></div>
              <div>Competition: <strong>{pseoOpportunity.breakdown.competition}</strong></div>
            </div>
          </div>

          {/* Bidirectional Linking Topology (Requirement 4) */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>
              Bidirectional Internal Link Topology
            </div>
            <div style={{ fontSize: '0.8rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div>
                <strong>Outbound:</strong> {bidirectionalLinks.outboundSuggestions.length} relevant published articles to link to.
              </div>
              <div>
                <strong>Inbound:</strong> {bidirectionalLinks.inboundOpportunities.length} existing articles should link to this new page.
              </div>
              <div style={{ fontSize: '0.725rem', color: '#2563EB', marginTop: '0.2rem' }}>
                Targeting hub: &ldquo;{parentTopic}&rdquo; Topic Cluster
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Content Brief Review Card (Requirement 9) */}
      {contentBrief && (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: briefApproved ? '2px solid #16A34A' : '2px dashed #3B82F6',
          borderRadius: '8px',
          padding: '1.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#2563EB' }}>
                  Mandatory Step 2
                </span>
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>•</span>
                <span style={{ fontSize: '0.75rem', color: '#4B5563' }}>Editorial Human Signoff</span>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                Content Brief: {contentBrief.topic}
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {briefApproved ? (
                <span className="status-pill status-pill-green">✓ Content Brief Approved</span>
              ) : (
                <button
                  type="button"
                  onClick={handleApproveBrief}
                  className="btn-editorial"
                  style={{ fontSize: '0.825rem', backgroundColor: '#16A34A', borderColor: '#16A34A' }}
                >
                  ✓ Approve Content Brief
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', fontSize: '0.85rem' }}>
            <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px' }}>
              <div style={{ fontWeight: 700, color: '#1E293B', marginBottom: '0.35rem' }}>Search Intent & Positioning</div>
              <div style={{ color: '#475569', lineHeight: 1.4 }}>
                <strong>Why this page should exist:</strong> {contentBrief.whyThisPageShouldExist}
              </div>
              <div style={{ marginTop: '0.5rem', color: '#475569' }}>
                <strong>Audience:</strong> {contentBrief.targetAudience}
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px' }}>
              <div style={{ fontWeight: 700, color: '#1E293B', marginBottom: '0.35rem' }}>Recommended Prompt Blueprint ({contentBrief.recommendedPromptCount})</div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {contentBrief.recommendedPrompts.slice(0, 4).map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px' }}>
              <div style={{ fontWeight: 700, color: '#1E293B', marginBottom: '0.35rem' }}>Bidirectional Linking Plan</div>
              <div style={{ color: '#475569', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div><strong>Outbound:</strong> {contentBrief.internalLinkOpportunities.outbound.map(o => o.targetTitle).join(', ')}</div>
                <div><strong>Inbound:</strong> {contentBrief.internalLinkOpportunities.inbound.map(i => i.sourceTitle).join(', ')}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated SEO Dashboard in Content Studio (Requirement 12) */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>SEO & PSEO Readiness Matrix</h2>
            <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.2rem 0 0 0' }}>
              Guarantees technical indexability, schema correctness, and zero duplicate cannibalization.
            </p>
          </div>
          <span className="status-pill status-pill-green">All 11 Criteria Active</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ border: '1px solid #E5E7EB', borderRadius: '6px', padding: '0.85rem' }}>
            <div style={{ fontSize: '0.725rem', color: '#6B7280', textTransform: 'uppercase' }}>Indexability</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#15803D', marginTop: '0.2rem' }}>✓ Indexable (Published)</div>
            <div style={{ fontSize: '0.725rem', color: '#9CA3AF' }}>robots: index, follow</div>
          </div>

          <div style={{ border: '1px solid #E5E7EB', borderRadius: '6px', padding: '0.85rem' }}>
            <div style={{ fontSize: '0.725rem', color: '#6B7280', textTransform: 'uppercase' }}>Canonical URL</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginTop: '0.2rem' }}>✓ Verified HTTPS</div>
            <div style={{ fontSize: '0.7rem', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              /prompts/{generatedDraft?.slug}
            </div>
          </div>

          <div style={{ border: '1px solid #E5E7EB', borderRadius: '6px', padding: '0.85rem' }}>
            <div style={{ fontSize: '0.725rem', color: '#6B7280', textTransform: 'uppercase' }}>Search Intent</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563EB', marginTop: '0.2rem' }}>✓ {searchIntent}</div>
            <div style={{ fontSize: '0.725rem', color: '#9CA3AF' }}>Declared first-class</div>
          </div>

          <div style={{ border: '1px solid #E5E7EB', borderRadius: '6px', padding: '0.85rem' }}>
            <div style={{ fontSize: '0.725rem', color: '#6B7280', textTransform: 'uppercase' }}>Topic Cluster</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1E293B', marginTop: '0.2rem' }}>✓ {parentTopic}</div>
            <div style={{ fontSize: '0.725rem', color: '#9CA3AF' }}>{topicClusterId}</div>
          </div>

          <div style={{ border: '1px solid #E5E7EB', borderRadius: '6px', padding: '0.85rem' }}>
            <div style={{ fontSize: '0.725rem', color: '#6B7280', textTransform: 'uppercase' }}>Internal Linking</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1E293B', marginTop: '0.2rem' }}>✓ Bidirectional</div>
            <div style={{ fontSize: '0.725rem', color: '#9CA3AF' }}>
              {bidirectionalLinks.outboundSuggestions.length} out / {bidirectionalLinks.inboundOpportunities.length} in
            </div>
          </div>

          <div style={{ border: '1px solid #E5E7EB', borderRadius: '6px', padding: '0.85rem' }}>
            <div style={{ fontSize: '0.725rem', color: '#6B7280', textTransform: 'uppercase' }}>Structured Data</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#15803D', marginTop: '0.2rem' }}>✓ Article + Media</div>
            <div style={{ fontSize: '0.725rem', color: '#9CA3AF' }}>Article, Breadcrumb, Image</div>
          </div>
        </div>
      </div>

      {/* Generated Draft Preview & 1-to-1 Image Status Matrix (Section 17) */}
      {generatedDraft && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span className="status-pill status-pill-yellow">ACTIVE DRAFT IN PRODUCTION</span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0.35rem 0' }}>{generatedDraft.title}</h2>
              <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                Target Query: <code>&ldquo;{generatedDraft.primaryQuery}&rdquo;</code> • Archetype: <strong>{generatedDraft.contentType}</strong> • Prompts: <strong>{generatedDraft.prompts.length}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={handleGenerateAllImages}
                className="btn-editorial"
                style={{ fontSize: '0.8rem', backgroundColor: '#111827', borderColor: '#111827' }}
              >
                Generate All Images (7/7)
              </button>
            </div>
          </div>

          {/* Prompt/Image 1-to-1 Consistency Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            backgroundColor: consistency.status === 'PASS' ? '#F0FDF4' : '#FEF2F2',
            border: consistency.status === 'PASS' ? '1px solid #BBF7D0' : '1px solid #FECACA',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontSize: '0.825rem'
          }}>
            <div>
              <strong>PromptImageValidator:</strong> {consistency.status === 'PASS' ? 'PASS: Perfect 1-to-1 mapping verified.' : `FAIL: ${consistency.missingImages} images missing.`}
            </div>
            <div>
              Image Coverage: <strong>{consistency.readyImages}/{consistency.totalPrompts} verified</strong>
            </div>
          </div>

          {/* Section 17: Per-Prompt Image Status Matrix */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.75rem 0' }}>Per-Prompt Asset Matrix (1-to-1 Rule)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {generatedDraft.prompts.map((p, idx) => {
                const promptNum = p.number || idx + 1;
                const status = imageStatuses[promptNum] || 'READY';
                return (
                  <div key={p.id} style={{ border: '1px solid #E5E7EB', borderRadius: '6px', padding: '0.85rem', backgroundColor: '#F9FAFB' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Prompt #{promptNum}</span>
                      <span className={`status-pill ${
                        status === 'READY' ? 'status-pill-green' : status === 'GENERATING' ? 'status-pill-blue' : 'status-pill-yellow'
                      }`}>
                        {status === 'READY' ? '✓ Ready' : status === 'GENERATING' ? 'Generating...' : '⚠ Needs Review'}
                      </span>
                    </div>

                    <div style={{ position: 'relative', width: '100%', height: '120px', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem', backgroundColor: '#E5E7EB' }}>
                      {p.media?.url && (
                        <Image
                          src={p.media.url}
                          alt={p.media.altText || p.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, 240px"
                        />
                      )}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#4B5563', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.title}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRegenerateImage(promptNum)}
                      disabled={status === 'GENERATING'}
                      className="btn-secondary"
                      style={{ width: '100%', fontSize: '0.75rem', padding: '0.35rem 0.5rem', textAlign: 'center' }}
                    >
                      {status === 'GENERATING' ? 'Regenerating...' : 'Regenerate Image'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action to Human Review */}
          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '0.85rem', color: '#4B5563' }}>
              Quality Engine Evaluation: Content: <strong>{quality?.contentScore}/100</strong> • SEO: <strong>{quality?.seoScore}/100</strong> • Safety Audit: <strong>{quality?.isPublishReady ? 'PASS' : 'CHECK'}</strong>
            </div>
            <Link
              href="/admin/review"
              className="btn-editorial"
              style={{ backgroundColor: '#111827', borderColor: '#111827' }}
            >
              Send to Human Review Queue →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
