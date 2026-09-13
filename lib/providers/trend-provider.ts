import { Trend, TrendLifecycle } from '@/lib/types';

export interface TrendFilterOptions {
  status?: TrendLifecycle | 'ALL' | 'RISING' | 'HOT' | 'EMERGING' | 'DECLINING' | 'RESEARCHED' | 'COVERED';
  category?: string;
  minScore?: number;
  sortBy?: 'score' | 'growth' | 'freshness' | 'opportunity';
  sortDirection?: 'asc' | 'desc';
}

export interface TrendProvider {
  name: string;
  isMock: boolean;
  getTrends(options?: TrendFilterOptions): Promise<Trend[]>;
  getTrendById(id: string): Promise<Trend | null>;
  calculateTrendScore(trend: Partial<Trend>): number;
}

/**
 * Transparent scoring formula:
 * Trend Score = Search Growth + Social Momentum + Freshness + Content Opportunity + Commercial Value - Competition
 * Normalized to 0-100 range.
 */
export function calculateTransparentScore(data: {
  searchGrowth: number;
  socialMomentum: number;
  freshness: number;
  contentOpportunity: number;
  commercialValue: number;
  competition: number;
}): number {
  const raw =
    data.searchGrowth * 0.25 +
    data.socialMomentum * 0.25 +
    data.freshness * 0.2 +
    data.contentOpportunity * 0.2 +
    data.commercialValue * 0.1 -
    data.competition * 0.15;

  // Normalized strictly between 0 and 100
  return Math.min(100, Math.max(1, Math.round(raw)));
}

export const MOCK_TRENDS: Trend[] = [
  {
    id: 'trend-80s-retro',
    title: '80s Retro Photo Prompts',
    slug: '80s-retro-photo-prompts',
    description: 'Surge in nostalgic analog studio portraits, mall candid shots, and neon video arcades driven by Gen-Z fashion trends and Midjourney v6.1 aesthetic updates.',
    status: 'TRENDING',
    category: 'Retro & Vintage',
    detectedAt: '2026-08-28T09:00:00Z',
    lastCheckedAt: '2026-09-13T16:00:00Z',
    searchGrowth: 91,
    socialMomentum: 96,
    freshness: 98,
    competition: 61,
    contentOpportunity: 89,
    commercialValue: 78,
    trendScore: 94,
    whyItMatters: 'Viral on TikTok (#80sAesthetic +320% QoQ) and Pinterest creator boards. Users are demanding authentic analog film simulation (feathered hair, Kodachrome 64) rather than generic synthwave neon grids.',
    relatedQueries: [
      '80s ai photo generator prompt',
      'how to get 80s portrait midjourney',
      '80s mall photo prompt flux',
      'polaroid summer 1983 prompt'
    ],
    risingTopics: ['80s Mall Culture', 'VHS Camcorder Stills', 'High-Fashion Power Suits', 'Neon Coin-Op Arcades'],
    relatedStyles: ['Kodachrome 64', 'Soft-Focus Diffusion', 'Direct Flash Falloff', 'CRT Scanlines'],
    relatedUseCases: ['Personal Profile Pictures', 'Music Single Covers', 'Social Media Aesthetic Feeds', 'Fashion Mockups'],
    existingArticleCount: 1,
    existingArticles: [
      { id: 'art-80s-retro-photo-prompts', title: '7 Best 80s Retro AI Photo Prompts', slug: '80s-retro-photo-prompts' }
    ],
    contentOpportunities: [
      {
        id: 'opp-1',
        title: '7 Best 80s Retro AI Photo Prompts',
        searchIntent: 'INSPIRATION',
        contentAngle: 'Comprehensive foundational guide covering studio, arcade, mall, VHS, and street styles.',
        opportunityScore: 94,
        existingCoverage: 'Covered (Published live on site)',
        recommendedPromptCount: 7,
        cannibalizationStatus: 'RED',
        targetKeyword: '80s retro ai photo prompts'
      },
      {
        id: 'opp-2',
        title: '7 80s VHS Camcorder AI Photo Prompts',
        searchIntent: 'STYLE',
        contentAngle: 'Deep-dive into low-fi magnetic tape tracking artifacts, phosphor bloom, and basement nostalgia.',
        opportunityScore: 88,
        existingCoverage: 'No dedicated page (Covered partially as 1 prompt in parent guide)',
        recommendedPromptCount: 7,
        cannibalizationStatus: 'GREEN',
        targetKeyword: '80s vhs camcorder prompts'
      },
      {
        id: 'opp-3',
        title: '7 80s Neon Portrait Prompts for Midjourney & Flux',
        searchIntent: 'HOW_TO',
        contentAngle: 'Focus on complementary neon reflections, arcade cabinets, and night portraiture.',
        opportunityScore: 84,
        existingCoverage: 'No dedicated subtopic page yet',
        recommendedPromptCount: 7,
        cannibalizationStatus: 'GREEN',
        targetKeyword: '80s neon portrait prompts'
      }
    ],
    sourceSignals: [
      { provider: 'GOOGLE_TRENDS', sourceName: 'Google Search Trends', value: 92, label: '+184% breakout keyword', detectedAt: '2026-09-12' },
      { provider: 'SOCIAL_MOMENTUM', sourceName: 'TikTok & Pinterest Signals', value: 96, label: '34M cumulative impressions', detectedAt: '2026-09-13' },
      { provider: 'INTERNAL_ANALYTICS', sourceName: 'Internal Site Analytics', value: 94, label: 'Top-ranking prompt copies (25.6% copy rate)', detectedAt: '2026-09-13' }
    ]
  },
  {
    id: 'trend-y2k-digicam',
    title: 'Y2K Compact Digicam Photography',
    slug: 'y2k-digicam-photography',
    description: 'Resurgence of late 90s and early 2000s consumer point-and-shoot digital cameras, harsh on-camera flash, butterfly clips, and low-res CMOS sensor warmth.',
    status: 'OPPORTUNITY',
    category: 'Retro & Vintage',
    detectedAt: '2026-09-02T11:00:00Z',
    lastCheckedAt: '2026-09-13T15:00:00Z',
    searchGrowth: 88,
    socialMomentum: 92,
    freshness: 94,
    competition: 48,
    contentOpportunity: 91,
    commercialValue: 72,
    trendScore: 89,
    whyItMatters: 'Millennium nostalgia is spiking across Instagram carousels and Depop lifestyle imagery. Creators want direct-flash aesthetic without looking low-effort.',
    relatedQueries: ['y2k digicam prompt midjourney', '2000s flash photo prompt', 'cyber y2k digital camera prompt'],
    risingTopics: ['Metallic Puffer Jackets', 'Bedroom Posters with CRT monitors', 'Early Compact Camera Flash'],
    relatedStyles: ['Digital Flash Falloff', 'Slight Chromatic Noise', 'Cool Cyan/Lavender Tint'],
    relatedUseCases: ['Fashion Campaign Lookbooks', 'Social Media Grid Highlights', 'Album Artwork'],
    existingArticleCount: 0,
    existingArticles: [],
    contentOpportunities: [
      {
        id: 'opp-y2k-1',
        title: '7 Best Y2K Digicam AI Photo Prompts',
        searchIntent: 'STYLE',
        contentAngle: 'Emulating early Sony Cybershot & Canon PowerShot sensory traits with contemporary subjects.',
        opportunityScore: 89,
        existingCoverage: 'No existing page (High priority draft)',
        recommendedPromptCount: 7,
        cannibalizationStatus: 'GREEN',
        targetKeyword: 'y2k digicam ai photo prompts'
      }
    ],
    sourceSignals: [
      { provider: 'GOOGLE_TRENDS', sourceName: 'Google Search Trends', value: 87, label: '+142% search rise', detectedAt: '2026-09-11' },
      { provider: 'SOCIAL_MOMENTUM', sourceName: 'Pinterest Repins', value: 92, label: 'High re-pin velocity', detectedAt: '2026-09-13' }
    ]
  },
  {
    id: 'trend-vintage-film',
    title: '35mm Film Grain & Kodachrome Emulation',
    slug: '35mm-film-kodachrome',
    description: 'Demand for authentic analog chemical colors, organic film grain, and halation around highlights to counter hyper-smooth AI skin textures.',
    status: 'RESEARCHING',
    category: 'Film & Analog',
    detectedAt: '2026-09-05T14:30:00Z',
    lastCheckedAt: '2026-09-13T14:00:00Z',
    searchGrowth: 82,
    socialMomentum: 85,
    freshness: 86,
    competition: 55,
    contentOpportunity: 88,
    commercialValue: 84,
    trendScore: 85,
    whyItMatters: 'Photographers transitioning to AI are searching for exact stock names (Portra 400, Tri-X 400, Kodachrome 64) rather than generic keywords.',
    relatedQueries: ['kodachrome 64 prompt formula', '35mm analog film grain prompt', 'portra 400 natural skin prompt'],
    risingTopics: ['Golden Hour Meadows', 'Analog Street Documentary', 'Warm Halation'],
    relatedStyles: ['Kodachrome 64', 'Kodak Portra 400', 'Fujifilm Velvia'],
    relatedUseCases: ['Fine Art Photography', 'Editorial Campaigns', 'Coffee Table Books'],
    existingArticleCount: 0,
    existingArticles: [],
    contentOpportunities: [
      {
        id: 'opp-film-1',
        title: 'Vintage Film Photo Prompts: 35mm, Kodachrome & Grain',
        searchIntent: 'HOW_TO',
        contentAngle: 'Precise film emulsion formulas to eliminate AI plastic skin textures.',
        opportunityScore: 88,
        existingCoverage: 'Planned in pipeline',
        recommendedPromptCount: 7,
        cannibalizationStatus: 'GREEN',
        targetKeyword: 'vintage film 35mm ai prompts'
      }
    ],
    sourceSignals: [
      { provider: 'SEARCH_INDEX', sourceName: 'Search Intent Index', value: 84, label: 'High organic query volume', detectedAt: '2026-09-10' }
    ]
  },
  {
    id: 'trend-minimalist-product',
    title: 'Scandinavian Minimalist Product Photography',
    slug: 'scandinavian-minimalist-product',
    description: 'Clean architectural podiums, travertine stone blocks, soft side softbox lighting, and floating cosmetic containers.',
    status: 'DISCOVERED',
    category: 'Commercial & Product',
    detectedAt: '2026-09-11T08:00:00Z',
    lastCheckedAt: '2026-09-13T12:00:00Z',
    searchGrowth: 78,
    socialMomentum: 80,
    freshness: 82,
    competition: 64,
    contentOpportunity: 80,
    commercialValue: 92,
    trendScore: 79,
    whyItMatters: 'High commercial willingness to pay. E-commerce founders and DTC brands use AI to generate studio mockups without hiring physical photo studios.',
    relatedQueries: ['cosmetic product mockup prompt', 'travertine podium lighting midjourney', 'minimalist product photo prompt'],
    risingTopics: ['Floating Glass Dropper Bottles', 'Textured Linen Shadows', 'Sunken Water Ripple Sets'],
    relatedStyles: ['Diffused Daylight', 'Hard Noon Sun Shadows', 'Warm Neutral Tone Palette'],
    relatedUseCases: ['Shopify Hero Banners', 'Amazon A+ Content', 'Ad Creatives'],
    existingArticleCount: 0,
    existingArticles: [],
    contentOpportunities: [
      {
        id: 'opp-prod-1',
        title: '7 Minimalist Studio Product Photo Prompts',
        searchIntent: 'COMMERCIAL',
        contentAngle: 'DTC luxury cosmetic & accessory setups with exact lighting prompts.',
        opportunityScore: 82,
        existingCoverage: 'None',
        recommendedPromptCount: 7,
        cannibalizationStatus: 'GREEN',
        targetKeyword: 'minimalist product photo prompts'
      }
    ],
    sourceSignals: [
      { provider: 'GOOGLE_TRENDS', sourceName: 'Google Merchant Trends', value: 80, label: 'DTC query expansion', detectedAt: '2026-09-12' }
    ]
  },
  {
    id: 'trend-claymation-stopmotion',
    title: 'Claymation & Handmade Stop-Motion Stills',
    slug: 'claymation-stop-motion',
    description: 'Whimsical clay textures, subtle thumbprint impressions, felted wool landscapes, and miniature dioramas.',
    status: 'DISCOVERED',
    category: 'Creative Art',
    detectedAt: '2026-09-12T16:00:00Z',
    lastCheckedAt: '2026-09-13T11:00:00Z',
    searchGrowth: 75,
    socialMomentum: 86,
    freshness: 90,
    competition: 38,
    contentOpportunity: 85,
    commercialValue: 68,
    trendScore: 78,
    whyItMatters: 'Stands out sharply against hyper-realistic photography. Highly shareable on social feeds.',
    relatedQueries: ['claymation ai prompt', 'stop motion miniature diorama prompt', 'clay texture character prompt'],
    risingTopics: ['Chubby Woodland Animals in Clay', 'Miniature Clay City Scenes', 'Felted Wool Dioramas'],
    relatedStyles: ['Tactile Clay Thumbprints', 'Shallow Tilt-Shift Depth', 'Warm Incandescent Lighting'],
    relatedUseCases: ['Children Storybook Mockups', 'Iconic Social Hooks', 'Sticker Packs'],
    existingArticleCount: 0,
    existingArticles: [],
    contentOpportunities: [
      {
        id: 'opp-clay-1',
        title: '7 Whimsical Claymation & Stop-Motion AI Prompts',
        searchIntent: 'INSPIRATION',
        contentAngle: 'Handcrafted plasticine charm with tactile miniature lighting instructions.',
        opportunityScore: 84,
        existingCoverage: 'None',
        recommendedPromptCount: 7,
        cannibalizationStatus: 'GREEN',
        targetKeyword: 'claymation ai prompts'
      }
    ],
    sourceSignals: [
      { provider: 'SOCIAL_MOMENTUM', sourceName: 'Instagram Reels Audio/Visual Trends', value: 85, label: 'Viral audio/visual pairing', detectedAt: '2026-09-12' }
    ]
  }
];

export class MockTrendProvider implements TrendProvider {
  name = 'Mock Multi-Signal Trend Engine (Google Trends + Social + Analytics)';
  isMock = true;

  async getTrends(options?: TrendFilterOptions): Promise<Trend[]> {
    let result = [...MOCK_TRENDS];

    if (options?.category && options.category !== 'ALL') {
      result = result.filter(t => t.category.toLowerCase() === options.category?.toLowerCase());
    }

    if (options?.status && options.status !== 'ALL') {
      const st = options.status.toUpperCase();
      if (st === 'RISING') {
        result = result.filter(t => t.searchGrowth >= 85 || t.socialMomentum >= 90);
      } else if (st === 'HOT') {
        result = result.filter(t => t.trendScore >= 88);
      } else if (st === 'EMERGING') {
        result = result.filter(t => t.status === 'DISCOVERED' || t.status === 'RESEARCHING');
      } else if (st === 'COVERED') {
        result = result.filter(t => t.existingArticleCount > 0);
      } else {
        result = result.filter(t => t.status === st);
      }
    }

    if (options?.minScore) {
      result = result.filter(t => t.trendScore >= (options.minScore || 0));
    }

    // Sort
    const sortBy = options?.sortBy || 'score';
    const dir = options?.sortDirection === 'asc' ? 1 : -1;

    result.sort((a, b) => {
      if (sortBy === 'growth') return (a.searchGrowth - b.searchGrowth) * dir;
      if (sortBy === 'freshness') return (a.freshness - b.freshness) * dir;
      if (sortBy === 'opportunity') return (a.contentOpportunity - b.contentOpportunity) * dir;
      return (a.trendScore - b.trendScore) * dir;
    });

    return result;
  }

  async getTrendById(id: string): Promise<Trend | null> {
    const found = MOCK_TRENDS.find(t => t.id === id || t.slug === id);
    return found || null;
  }

  calculateTrendScore(trend: Partial<Trend>): number {
    return calculateTransparentScore({
      searchGrowth: trend.searchGrowth ?? 50,
      socialMomentum: trend.socialMomentum ?? 50,
      freshness: trend.freshness ?? 50,
      contentOpportunity: trend.contentOpportunity ?? 50,
      commercialValue: trend.commercialValue ?? 50,
      competition: trend.competition ?? 50,
    });
  }
}

export const defaultTrendProvider = new MockTrendProvider();
