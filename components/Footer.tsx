import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          <div>
            <Link href="/" className="site-logo">
              <span className="site-logo-symbol">AI</span>
              <span>AI Trending Prompt</span>
            </Link>
            <p className="footer-brand-p">
              Discover trending AI prompts with real examples and step-by-step instructions. An editorial directory for creators, designers, and visual storytellers.
            </p>
          </div>

          <div>
            <h3 className="footer-column-title">Explore</h3>
            <ul className="footer-links">
              <li>
                <Link href="/prompts/80s-retro-photo-prompts" className="footer-link">
                  80s Retro Prompts
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="footer-link">
                  Latest Prompts
                </Link>
              </li>
              <li>
                <Link href="/categories" className="footer-link">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/prompts?goal=transform-my-photo" className="footer-link">
                  Transform My Photo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-column-title">Categories</h3>
            <ul className="footer-links">
              <li>
                <Link href="/categories#retro-vintage" className="footer-link">
                  Retro & Vintage
                </Link>
              </li>
              <li>
                <Link href="/categories#portraiture" className="footer-link">
                  Portrait Photography
                </Link>
              </li>
              <li>
                <Link href="/categories#cinematic-film" className="footer-link">
                  Cinematic Stills
                </Link>
              </li>
              <li>
                <Link href="/categories#analog-polaroid" className="footer-link">
                  Analog & Polaroid
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-column-title">Platform</h3>
            <ul className="footer-links">
              <li>
                <Link href="/admin" className="footer-link">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="footer-link">
                  Sitemap
                </Link>
              </li>
              <li>
                <span className="footer-link" style={{ cursor: 'default' }}>
                  ai-trending-prompt.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AI Trending Prompt. All rights reserved.</p>
          <p style={{ fontSize: '0.8rem' }}>
            Prompts curated for external generation tools (Midjourney, Flux, Stable Diffusion, DALL-E).
          </p>
        </div>
      </div>
    </footer>
  );
}
