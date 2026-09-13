import { Topic } from '@/lib/types';

export const TOPIC_CLUSTERS: { name: string; description: string; topics: Topic[] }[] = [
  {
    name: 'Styles & Aesthetics',
    description: 'Period-specific, photographic film emulsions, and aesthetic genres.',
    topics: [
      {
        id: 'top-80s-retro',
        name: '80s Retro Photography',
        slug: '80s-retro',
        categorySlug: 'retro-vintage',
        searchIntent: 'STYLE',
        primaryQuery: '80s retro ai photo prompts',
        secondaryQueries: ['80s mall photo midjourney', 'vhs camcorder prompt', '80s studio portrait flux'],
        contentType: 'Photo Recipe Guide',
        cluster: 'Styles',
        status: 'COVERED'
      },
      {
        id: 'top-y2k',
        name: 'Y2K Digicam Aesthetic',
        slug: 'y2k-digicam',
        categorySlug: 'retro-vintage',
        searchIntent: 'STYLE',
        primaryQuery: 'y2k digicam ai photo prompts',
        secondaryQueries: ['2000s compact camera flash prompt', 'cyber y2k digital photo prompt'],
        contentType: 'Photo Recipe Guide',
        cluster: 'Styles',
        status: 'PLANNED'
      },
      {
        id: 'top-vintage-film',
        name: 'Vintage 35mm & Kodachrome',
        slug: 'vintage-film',
        categorySlug: 'film-analog',
        searchIntent: 'HOW_TO',
        primaryQuery: 'vintage 35mm film ai prompts',
        secondaryQueries: ['kodachrome 64 prompt formula', 'portra 400 skin texture prompt'],
        contentType: 'Photo Recipe Guide',
        cluster: 'Styles',
        status: 'PLANNED'
      },
      {
        id: 'top-polaroid',
        name: 'Polaroid & Instant Film',
        slug: 'polaroid-instant',
        categorySlug: 'analog-polaroid',
        searchIntent: 'STYLE',
        primaryQuery: 'polaroid instant photo prompts',
        secondaryQueries: ['authentic polaroid border prompt', 'summer 83 instant photo'],
        contentType: 'Photo Recipe Guide',
        cluster: 'Styles',
        status: 'PLANNED'
      },
      {
        id: 'top-cinematic',
        name: 'Cinematic Stills & Blue Hour',
        slug: 'cinematic-stills',
        categorySlug: 'cinematic-film',
        searchIntent: 'INSPIRATION',
        primaryQuery: 'cinematic film still ai prompts',
        secondaryQueries: ['anamorphic lens flare midjourney', 'tungsten rainy bridge prompt'],
        contentType: 'Photo Recipe Guide',
        cluster: 'Styles',
        status: 'PLANNED'
      }
    ]
  },
  {
    name: 'People & Portraits',
    description: 'Human subjects, expressions, interpersonal dynamics, and group portraits.',
    topics: [
      {
        id: 'top-couple',
        name: 'Couple Photography',
        slug: 'couple-photos',
        categorySlug: 'portraiture',
        searchIntent: 'INSPIRATION',
        primaryQuery: 'romantic couple ai photo prompts',
        secondaryQueries: ['golden hour couple midjourney', 'candid documentary couple prompt'],
        contentType: 'Photo Recipe Guide',
        cluster: 'People',
        status: 'EXPLORING'
      },
      {
        id: 'top-family',
        name: 'Family Portraits',
        slug: 'family-portraits',
        categorySlug: 'portraiture',
        searchIntent: 'HOW_TO',
        primaryQuery: 'family portrait ai prompts',
        secondaryQueries: ['cozy holiday family photo prompt', 'outdoor multi generation portrait'],
        contentType: 'Photo Recipe Guide',
        cluster: 'People',
        status: 'EXPLORING'
      }
    ]
  },
  {
    name: 'Commercial & Product',
    description: 'High-converting e-commerce studio shots, cosmetic sets, and luxury mockups.',
    topics: [
      {
        id: 'top-product',
        name: 'Minimalist Product Photography',
        slug: 'minimalist-product',
        categorySlug: 'commercial-product',
        searchIntent: 'COMMERCIAL',
        primaryQuery: 'minimalist product photo prompts',
        secondaryQueries: ['cosmetics podium prompt midjourney', 'perfume bottle commercial lighting'],
        contentType: 'Photo Recipe Guide',
        cluster: 'Commercial',
        status: 'PLANNED'
      }
    ]
  }
];
