import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-trending-prompt.com'),
  title: {
    default: 'AI Trending Prompt | Discover Trending AI Prompts with Real Examples',
    template: '%s | AI Trending Prompt'
  },
  description: 'Discover trending AI prompts with real examples, copy-paste prompts, and step-by-step instructions. Curated for creators using Midjourney, Flux, and Stable Diffusion.',
  keywords: [
    'AI prompts',
    'trending AI prompts',
    'Midjourney prompts',
    'Flux prompts',
    '80s retro photo prompts',
    'vintage photography AI',
    'copy paste prompts'
  ],
  authors: [{ name: 'AI Trending Prompt Editorial Team' }],
  creator: 'AI Trending Prompt',
  publisher: 'AI Trending Prompt',
  alternates: {
    canonical: 'https://ai-trending-prompt.com'
  },
  openGraph: {
    title: 'AI Trending Prompt | Discover Trending AI Prompts with Real Examples',
    description: 'Discover trending AI prompts with real examples and step-by-step instructions.',
    url: 'https://ai-trending-prompt.com',
    siteName: 'AI Trending Prompt',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/prompts/80s-retro/cover.jpg',
        width: 1280,
        height: 720,
        alt: 'AI Trending Prompt - Discover Trending AI Prompts'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Trending Prompt | Discover Trending AI Prompts with Real Examples',
    description: 'Discover trending AI prompts with real examples and step-by-step instructions.',
    images: ['/images/prompts/80s-retro/cover.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Trending Prompt',
    url: 'https://ai-trending-prompt.com',
    logo: 'https://ai-trending-prompt.com/images/prompts/80s-retro/cover.jpg',
    description: 'Discover trending AI prompts with real examples and step-by-step instructions.'
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Trending Prompt',
    url: 'https://ai-trending-prompt.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://ai-trending-prompt.com/prompts?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
