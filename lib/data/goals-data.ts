import { Goal } from '@/lib/types';

export const GOALS_DATA: Goal[] = [
  {
    id: 'goal-1',
    slug: 'transform-my-photo',
    title: 'Transform My Photo',
    tagline: 'Analog film filters, Y2K retro, and artistic conversions',
    description: 'Use image-to-image prompts to reimagine your everyday photos into vintage film, anime, or 80s aesthetics.',
    iconName: 'sparkles',
    promptCount: 28,
    targetHref: '/prompts?goal=transform-my-photo'
  },
  {
    id: 'goal-2',
    slug: 'create-a-portrait',
    title: 'Create a Portrait',
    tagline: 'Editorial magazine, headshot, and stylized studio light',
    description: 'Master studio lighting, lens apertures, film stocks, and character consistency for professional AI portraits.',
    iconName: 'user',
    promptCount: 42,
    targetHref: '/prompts?goal=create-a-portrait'
  },
  {
    id: 'goal-3',
    slug: 'create-couple-photos',
    title: 'Create Couple Photos',
    tagline: 'Candid golden hour, cinematic romance, and documentary style',
    description: 'Capture realistic expressions, organic intimacy, and film camera nostalgia for memorable two-person shots.',
    iconName: 'heart',
    promptCount: 19,
    targetHref: '/prompts?goal=create-couple-photos'
  },
  {
    id: 'goal-4',
    slug: 'create-product-photos',
    title: 'Create Product Photos',
    tagline: 'Minimalist studio, floating cosmetics, and luxury podiums',
    description: 'Craft commercial-grade product photography with diffused softboxes, hard shadows, and clean textured sets.',
    iconName: 'package',
    promptCount: 34,
    targetHref: '/prompts?goal=create-product-photos'
  },
  {
    id: 'goal-5',
    slug: 'create-social-media-images',
    title: 'Create Social Media Images',
    tagline: 'Scroll-stopping covers, aesthetic feed grids, and reels stills',
    description: 'Generate high-CTR thumbnails, lifestyle snapshots, and vibrant editorial compositions designed for feed engagement.',
    iconName: 'share-2',
    promptCount: 51,
    targetHref: '/prompts?goal=create-social-media-images'
  },
  {
    id: 'goal-6',
    slug: 'try-viral-trends',
    title: 'Try Viral Trends',
    tagline: '80s mall portraits, claymation, and nostalgic disposable cams',
    description: 'Jump on what is trending across TikTok, X, and Pinterest right now with plug-and-play curated prompts.',
    iconName: 'flame',
    promptCount: 37,
    targetHref: '/prompts/80s-retro-photo-prompts'
  }
];
