import { Category } from '@/lib/types';

export const CATEGORIES_DATA: Category[] = [
  {
    id: 'cat-retro-vintage',
    slug: 'retro-vintage',
    name: 'Retro & Vintage',
    description: 'Relive the golden eras with 80s mall portraits, 90s disposable cameras, and Y2K digicam aesthetics.',
    promptCount: 48,
    articleCount: 12,
    featuredMedia: {
      id: 'media-cat-retro',
      url: '/images/prompts/80s-retro/cover.jpg',
      altText: 'Retro & Vintage Prompts'
    }
  },
  {
    id: 'cat-portraiture',
    slug: 'portraiture',
    name: 'Portraiture',
    description: 'Natural light, dramatic studio Rembrandt lighting, authentic skin textures, and editorial magazine close-ups.',
    promptCount: 65,
    articleCount: 16,
    featuredMedia: {
      id: 'media-cat-portrait',
      url: '/images/prompts/80s-retro/prompt-1-studio-portrait.jpg',
      altText: 'Portraiture Prompts'
    }
  },
  {
    id: 'cat-cinematic-film',
    slug: 'cinematic-film',
    name: 'Cinematic & 35mm Film',
    description: 'Anamorphic lens flares, 35mm Kodachrome grain, dusk lighting, and moody movie-grade compositions.',
    promptCount: 52,
    articleCount: 14,
    featuredMedia: {
      id: 'media-cat-cinematic',
      url: '/images/articles/cinematic-photo.jpg',
      altText: 'Cinematic Film Prompts'
    }
  },
  {
    id: 'cat-commercial-product',
    slug: 'commercial-product',
    name: 'Commercial & Product',
    description: 'Clean Scandinavian styling, floating cosmetics, tactile textures, and luxury e-commerce mockups.',
    promptCount: 39,
    articleCount: 9,
    featuredMedia: {
      id: 'media-cat-product',
      url: '/images/articles/polaroid-photo.jpg',
      altText: 'Commercial Product Prompts'
    }
  },
  {
    id: 'cat-social-trends',
    slug: 'social-trends',
    name: 'Viral Social Trends',
    description: 'High-performing Pinterest aesthetics, Instagram carousel hooks, and trending visual memes.',
    promptCount: 44,
    articleCount: 11,
    featuredMedia: {
      id: 'media-cat-social',
      url: '/images/articles/y2k-photo.jpg',
      altText: 'Social Media Trends'
    }
  },
  {
    id: 'cat-analog-polaroid',
    slug: 'analog-polaroid',
    name: 'Analog & Polaroid',
    description: 'Authentic instant film borders, emulsion degradation, flash falloff, and candid vacation snapshots.',
    promptCount: 31,
    articleCount: 8,
    featuredMedia: {
      id: 'media-cat-polaroid',
      url: '/images/prompts/80s-retro/prompt-7-polaroid-friends.jpg',
      altText: 'Analog Polaroid Prompts'
    }
  }
];
