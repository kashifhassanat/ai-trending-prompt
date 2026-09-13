import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'AI Content Command Center | AI Trending Prompt',
    template: '%s | Command Center'
  },
  description: 'Operating system for AI prompt discovery, trend research, content studio, and PSEO generation.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link href="/admin/dashboard" className="admin-brand-title">
            <span style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#111827',
              color: '#FFFFFF',
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 800
            }}>AI</span>
            <span>Trending Prompt</span>
          </Link>
          <div className="admin-brand-subtitle">CONTENT COMMAND CENTER</div>
        </div>

        <nav style={{ flexGrow: 1 }}>
          <div className="admin-nav-group">
            <div className="admin-nav-heading">Main Operating Workflow</div>
            <Link href="/admin/dashboard" className="admin-nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/trends" className="admin-nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24" />
                <path d="m14.83 9.17 4.24-4.24" />
                <path d="m14.83 14.83 4.24 4.24" />
                <path d="m9.17 14.83-4.24 4.24" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <span>Trend Radar</span>
            </Link>
            <Link href="/admin/content" className="admin-nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 2 4 4-14 14H4v-4L18 2z" />
                <path d="m14.5 5.5 4 4" />
              </svg>
              <span>Content Studio</span>
            </Link>
            <Link href="/admin/articles" className="admin-nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
              </svg>
              <span>Articles</span>
            </Link>
            <Link href="/admin/prompts" className="admin-nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              <span>Prompts</span>
            </Link>
            <Link href="/admin/media" className="admin-nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span>Media</span>
            </Link>
            <Link href="/admin/review" className="admin-nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              <span>Review Queue</span>
            </Link>
            <Link href="/admin/analytics" className="admin-nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
              <span>Analytics</span>
            </Link>
          </div>

          <div className="admin-nav-group" style={{ borderTop: '1px solid #F3F4F6' }}>
            <div className="admin-nav-heading">PSEO & Taxonomy</div>
            <Link href="/admin/topics" className="admin-nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v3" />
                <path d="M12 18v3" />
                <path d="M3 12h3" />
                <path d="M18 12h3" />
              </svg>
              <span>Topic Clusters</span>
            </Link>
            <Link href="/admin/categories" className="admin-nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
              <span>Categories</span>
            </Link>
            <Link href="/admin/settings" className="admin-nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>Provider Settings</span>
            </Link>
          </div>
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid #F3F4F6', fontSize: '0.75rem', color: '#6B7280' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
            <span style={{ fontWeight: 600, color: '#111827' }}>System Operational</span>
          </div>
          <div>v2.0 • Mock Providers Active</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <span className="admin-environment-badge">
              DEMO / MOCK PROVIDERS CONNECTED
            </span>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
              All interfaces production-ready for PostgreSQL & live APIs
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Link
              href="/"
              target="_blank"
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#1D4ED8',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <span>View Public Publication ↗</span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#111827',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                EV
              </div>
              <div style={{ fontSize: '0.8rem' }}>
                <div style={{ fontWeight: 600, lineHeight: 1.2 }}>Elena Vance</div>
                <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>Editor-in-Chief</div>
              </div>
            </div>
          </div>
        </header>

        <main className="admin-content-container">
          {children}
        </main>
      </div>
    </div>
  );
}
