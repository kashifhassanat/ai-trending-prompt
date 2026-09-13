'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SearchModal } from './SearchModal';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="site-logo">
            <span className="site-logo-symbol">AI</span>
            <span>AI Trending Prompt</span>
          </Link>

          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              <li>
                <Link href="/prompts/80s-retro-photo-prompts" className="nav-link">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/categories" className="nav-link">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="nav-link">
                  Latest
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="search-trigger-btn"
              aria-label="Search prompts and articles"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Search</span>
              <kbd className="search-shortcut-kbd">⌘K</kbd>
            </button>

            <button
              type="button"
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <Link
              href="/prompts/80s-retro-photo-prompts"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trending
            </Link>
            <Link
              href="/categories"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/prompts"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Latest
            </Link>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
