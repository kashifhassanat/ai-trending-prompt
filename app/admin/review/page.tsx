'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ALL_ARTICLES } from '@/lib/data/articles-data';
import { evaluateArticleQuality } from '@/lib/services/quality-engine';
import { Article, ReviewDecision } from '@/lib/types';

export default function ReviewQueuePage() {
  const [selectedArticle, setSelectedArticle] = useState<Article>(ALL_ARTICLES[0]);
  const [reviewDecision, setReviewDecision] = useState<ReviewDecision>('PENDING');
  const [decisionNotice, setDecisionNotice] = useState<string | null>(null);

  const quality = evaluateArticleQuality(selectedArticle);

  const handleApprove = () => {
    if (!quality.isPublishReady) {
      alert('Cannot publish: Publication Gate blockers must be resolved first.');
      return;
    }
    setReviewDecision('APPROVED');
    setDecisionNotice('Article approved and published to production live feed!');
  };

  const handleRequestChanges = () => {
    setReviewDecision('CHANGES_REQUESTED');
    setDecisionNotice('Change request sent to Content Studio for revision.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: '#DC2626' }}>
              Human Gatekeeper
            </span>
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>•</span>
            <span style={{ fontSize: '0.75rem', color: '#4B5563' }}>Mandatory Editorial Review</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
            Editorial Review Queue
          </h1>
          <p style={{ color: '#4B5563', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
            Human review is strictly mandatory before any article or prompt recipe goes live. No automated publishing.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select
            value={selectedArticle.id}
            onChange={(e) => {
              const art = ALL_ARTICLES.find((a) => a.id === e.target.value);
              if (art) {
                setSelectedArticle(art);
                setReviewDecision('PENDING');
                setDecisionNotice(null);
              }
            }}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #D1D5DB',
              fontSize: '0.85rem',
              fontWeight: 500,
              backgroundColor: '#FFFFFF',
              color: '#111827'
            }}
          >
            {ALL_ARTICLES.map((art) => (
              <option key={art.id} value={art.id}>
                {art.title.slice(0, 35)}... ({art.prompts?.length || 0} prompts)
              </option>
            ))}
          </select>
          <span className="status-pill status-pill-yellow">
            Awaiting Review
          </span>
        </div>
      </div>

      {/* Decision Notice */}
      {decisionNotice && (
        <div style={{
          backgroundColor: reviewDecision === 'APPROVED' ? '#F0FDF4' : '#FEF2F2',
          border: reviewDecision === 'APPROVED' ? '1px solid #BBF7D0' : '1px solid #FECACA',
          color: reviewDecision === 'APPROVED' ? '#166534' : '#991B1B',
          borderRadius: '8px',
          padding: '1rem 1.25rem',
          fontSize: '0.875rem',
          fontWeight: 600
        }}>
          {reviewDecision === 'APPROVED' ? '✓ ' : '⚠ '} {decisionNotice}
        </div>
      )}

      {/* Review Split View (Section 22) */}
      <div className="review-split-view">
        {/* LEFT: Live Article Preview */}
        <div className="review-preview-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #E5E7EB', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#B84A28', letterSpacing: '0.08em' }}>
                  {selectedArticle.categoryName} • Article Preview
                </span>
                <span className="status-pill status-pill-blue">
                  Intent: {selectedArticle.searchIntent}
                </span>
                <span className="status-pill status-pill-purple">
                  {selectedArticle.contentType}
                </span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: '0.25rem 0 0 0' }}>
                {selectedArticle.title}
              </h2>
              <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '0.2rem' }}>
                Primary Query: <code>&ldquo;{selectedArticle.primaryQuery}&rdquo;</code> • Cluster: <strong>{selectedArticle.parentTopic}</strong>
              </div>
            </div>
            <Link
              href={`/prompts/${selectedArticle.slug}`}
              target="_blank"
              style={{ fontSize: '0.8rem', color: '#2563EB', fontWeight: 600 }}
            >
              Open in Reader ↗
            </Link>
          </div>

          {/* Bidirectional Linking Review Callout (Requirement 4) */}
          <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '6px', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Bidirectional Internal Link Topology
            </div>
            <div style={{ fontSize: '0.825rem', color: '#1E3A8A', lineHeight: 1.4 }}>
              <strong>Inbound Equity:</strong> These {selectedArticle.inboundLinkOpportunities?.length || 2} existing high-authority articles should link to this new page upon publication:
            </div>
            <ul style={{ margin: '0.35rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.8rem', color: '#1E3A8A' }}>
              {selectedArticle.inboundLinkOpportunities?.map(inb => (
                <li key={inb.id}>
                  <strong>{inb.sourceArticleTitle}</strong> &rarr; anchor text: <code>&ldquo;{inb.suggestedAnchorText}&rdquo;</code> (Section: {inb.targetSection})
                </li>
              ))}
            </ul>
          </div>

          {/* Intro Preview */}
          <div style={{ marginBottom: '2rem' }}>
            {selectedArticle.introduction.map((p, i) => (
              <p key={i} style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#4B5563', marginBottom: '0.75rem' }}>
                {p}
              </p>
            ))}
          </div>

          {/* Prompts Preview (All 7 Prompts) */}
          <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111827', marginBottom: '1rem' }}>
            Curated Prompts ({selectedArticle.prompts.length} Verified Items)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {selectedArticle.prompts.map((p, idx) => (
              <div key={p.id} style={{ border: '1px solid #E5E7EB', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#F9FAFB' }}>
                <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827' }}>
                    #{idx + 1}. {p.title}
                  </span>
                  <span className="status-pill status-pill-green">Verified Asset</span>
                </div>

                <div style={{ position: 'relative', width: '100%', height: '220px', backgroundColor: '#E5E7EB' }}>
                  <Image
                    src={p.media.url}
                    alt={p.media.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.775rem', fontFamily: 'var(--font-mono)', color: '#1F2937', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', padding: '0.75rem', borderRadius: '4px', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {p.promptText}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#4B5563' }}>
                    <strong>How to Use: </strong>{p.howToUse[0]}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#059669', marginTop: '0.35rem' }}>
                    <strong>Tip: </strong>{p.practicalTip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Quality Checklist & Strict Publish Gate (Section 19 & 20) */}
        <div className="review-checklist-panel">
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Quality Audit & Publish Gate</h2>

          {/* Publish Gate Banner (Section 20) */}
          <div className={`publish-gate-box ${quality.isPublishReady ? 'publish-gate-ready' : 'publish-gate-blocked'}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.925rem' }}>
              {quality.isPublishReady ? '✓ ARTICLE READY TO PUBLISH' : '⚠ ARTICLE NOT READY TO PUBLISH'}
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '0.35rem', lineHeight: 1.4 }}>
              {quality.isPublishReady
                ? 'All mandatory content, visual 1-to-1 mapping, SEO tags, and editorial checks pass.'
                : `${quality.blockers.length} blocking issues must be resolved before publishing is allowed.`}
            </div>

            {quality.blockers.length > 0 && (
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem', fontSize: '0.775rem', color: '#991B1B' }}>
                {quality.blockers.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Quality Scores Matrix */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase' }}>Content Quality</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827' }}>{quality.contentScore}<span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>/100</span></div>
            </div>
            <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase' }}>Visual Completeness</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#15803D' }}>{quality.visualScore}<span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>/100</span></div>
            </div>
            <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase' }}>SEO Technical</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1D4ED8' }}>{quality.seoScore}<span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>/100</span></div>
            </div>
            <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase' }}>Editorial Rigor</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#7C3AED' }}>{quality.editorialScore}<span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>/100</span></div>
            </div>
          </div>

          {/* Checklist Items */}
          <div style={{ marginBottom: '1.5rem', maxHeight: '280px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6B7280', marginBottom: '0.5rem' }}>
              Detailed Inspection Criteria
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {quality.checks.map(chk => (
                <div key={chk.id} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', fontSize: '0.775rem', padding: '0.4rem 0.5rem', backgroundColor: '#F9FAFB', borderRadius: '4px' }}>
                  <div>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{chk.label}</span>
                    <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>{chk.message}</div>
                  </div>
                  <span className={`status-pill ${chk.status === 'PASS' ? 'status-pill-green' : chk.status === 'WARNING' ? 'status-pill-yellow' : 'status-pill-red'}`}>
                    {chk.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
            <button
              type="button"
              onClick={handleApprove}
              disabled={!quality.isPublishReady}
              className="btn-editorial"
              style={{
                width: '100%',
                backgroundColor: quality.isPublishReady ? '#059669' : '#9CA3AF',
                borderColor: quality.isPublishReady ? '#059669' : '#9CA3AF',
                cursor: quality.isPublishReady ? 'pointer' : 'not-allowed'
              }}
            >
              ✓ Approve & Publish Article
            </button>

            <button
              type="button"
              onClick={handleRequestChanges}
              className="btn-secondary"
              style={{ width: '100%' }}
            >
              Request Changes from Studio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
