import { Topic, SearchIntent } from '@/lib/types';

export interface TopicSubNode {
  id: string;
  name: string;
  slug: string;
  searchIntent: SearchIntent;
  targetQuery: string;
  status: 'PUBLISHED' | 'OPPORTUNITY' | 'DRAFT' | 'REVIEW';
  opportunityScore: number;
  publishedUrl?: string;
  searchGrowthBadge?: string;
}

export interface TopicClusterNode {
  id: string;
  name: string;
  slug: string;
  description: string;
  hubTopic: Topic;
  subtopics: TopicSubNode[];
}

export const CLUSTER_TREES: TopicClusterNode[] = [
  {
    id: 'cluster-styles',
    name: 'Styles & Aesthetics',
    slug: 'styles',
    description: 'Period-specific photographic emulsions, analog optics, and aesthetic movements.',
    hubTopic: {
      id: 'top-80s-retro',
      name: '80s Retro Photography',
      slug: '80s-retro',
      categorySlug: 'retro-vintage',
      searchIntent: 'STYLE',
      primaryQuery: '80s retro ai photo prompts',
      secondaryQueries: ['80s mall photo midjourney', 'vhs camcorder prompt', '80s studio portrait flux'],
      contentType: 'Visual Prompt Recipe',
      cluster: 'Styles',
      status: 'COVERED'
    },
    subtopics: [
      {
        id: 'sub-80s-main',
        name: 'General 80s Retro Photo Prompts (Hub)',
        slug: '80s-retro-photo-prompts',
        searchIntent: 'INSPIRATION',
        targetQuery: '80s retro ai photo prompts',
        status: 'PUBLISHED',
        opportunityScore: 94,
        publishedUrl: '/prompts/80s-retro-photo-prompts',
        searchGrowthBadge: '+165% Growth'
      },
      {
        id: 'sub-80s-vhs',
        name: '80s VHS Camcorder Aesthetic',
        slug: '80s-vhs-photo-prompts',
        searchIntent: 'STYLE',
        targetQuery: '80s vhs camcorder ai prompt',
        status: 'OPPORTUNITY',
        opportunityScore: 92,
        searchGrowthBadge: '+184% Growth'
      },
      {
        id: 'sub-80s-neon',
        name: '80s Neon Arcade Portraits',
        slug: '80s-neon-arcade-prompts',
        searchIntent: 'INSPIRATION',
        targetQuery: '80s neon arcade portrait prompt',
        status: 'OPPORTUNITY',
        opportunityScore: 88,
        searchGrowthBadge: '+142% Growth'
      },
      {
        id: 'sub-80s-mall',
        name: '80s Suburban Mall Candids',
        slug: '80s-mall-candid-prompts',
        searchIntent: 'USE_CASE',
        targetQuery: '80s mall photography ai recipe',
        status: 'OPPORTUNITY',
        opportunityScore: 84,
        searchGrowthBadge: '+110% Growth'
      },
      {
        id: 'sub-80s-fashion',
        name: '80s Retro Fashion Lookbook',
        slug: '80s-retro-fashion-prompts',
        searchIntent: 'STYLE',
        targetQuery: '1980s street fashion prompt midjourney',
        status: 'OPPORTUNITY',
        opportunityScore: 81,
        searchGrowthBadge: '+95% Growth'
      }
    ]
  },
  {
    id: 'cluster-people',
    name: 'People & Interpersonal Portraits',
    slug: 'people',
    description: 'Emotive character posing, candid interactions, and documentary portraits.',
    hubTopic: {
      id: 'top-couple',
      name: 'Couple Photography',
      slug: 'couple-photos',
      categorySlug: 'portraiture',
      searchIntent: 'INSPIRATION',
      primaryQuery: 'romantic couple ai photo prompts',
      secondaryQueries: ['golden hour couple midjourney', 'candid documentary couple prompt'],
      contentType: 'Visual Prompt Recipe',
      cluster: 'People',
      status: 'EXPLORING'
    },
    subtopics: [
      {
        id: 'sub-couple-candid',
        name: 'Golden Hour Couple Candid Shots',
        slug: 'golden-hour-couple-prompts',
        searchIntent: 'INSPIRATION',
        targetQuery: 'golden hour couple ai photo prompts',
        status: 'OPPORTUNITY',
        opportunityScore: 89,
        searchGrowthBadge: '+125% Growth'
      },
      {
        id: 'sub-wedding-film',
        name: 'Documentary Film Wedding Portraits',
        slug: 'documentary-wedding-prompts',
        searchIntent: 'USE_CASE',
        targetQuery: '35mm wedding photo ai prompts',
        status: 'OPPORTUNITY',
        opportunityScore: 86,
        searchGrowthBadge: '+98% Growth'
      },
      {
        id: 'sub-family-polaroid',
        name: 'Vintage Family Memory Prompts',
        slug: 'family-polaroid-prompts',
        searchIntent: 'HOW_TO',
        targetQuery: 'vintage family polaroid prompt flux',
        status: 'OPPORTUNITY',
        opportunityScore: 82,
        searchGrowthBadge: '+76% Growth'
      }
    ]
  },
  {
    id: 'cluster-editing',
    name: 'Editing, Optics & Lighting Physics',
    slug: 'editing',
    description: 'Mastering optical diffusion filters, halation, strobe falloff, and color grading.',
    hubTopic: {
      id: 'top-lighting',
      name: 'Direct Flash & Strobe Falloff',
      slug: 'direct-flash-optics',
      categorySlug: 'cinematic-film',
      searchIntent: 'HOW_TO',
      primaryQuery: 'direct flash ai photo prompts',
      secondaryQueries: ['point and shoot direct flash prompt', 'night candid flash midjourney'],
      contentType: 'How-To Guide',
      cluster: 'Editing',
      status: 'PLANNED'
    },
    subtopics: [
      {
        id: 'sub-direct-flash',
        name: 'Direct Strobe Flash Simulation',
        slug: 'direct-flash-simulation-prompts',
        searchIntent: 'HOW_TO',
        targetQuery: 'direct flash ai photography recipe',
        status: 'OPPORTUNITY',
        opportunityScore: 91,
        searchGrowthBadge: '+155% Growth'
      },
      {
        id: 'sub-diffusion-filter',
        name: 'Pro-Mist & Diffusion Halation Formulas',
        slug: 'diffusion-filter-prompts',
        searchIntent: 'HOW_TO',
        targetQuery: 'black pro mist filter prompt midjourney',
        status: 'OPPORTUNITY',
        opportunityScore: 87,
        searchGrowthBadge: '+130% Growth'
      }
    ]
  },
  {
    id: 'cluster-commercial',
    name: 'Commercial & Product Stills',
    slug: 'commercial',
    description: 'High-converting luxury mockups, perfume bottles, and editorial lookbooks.',
    hubTopic: {
      id: 'top-product',
      name: 'Minimalist Product Photography',
      slug: 'minimalist-product',
      categorySlug: 'commercial-product',
      searchIntent: 'COMMERCIAL',
      primaryQuery: 'minimalist product photo prompts',
      secondaryQueries: ['cosmetics podium prompt midjourney', 'perfume bottle commercial lighting'],
      contentType: 'Commercial Prompt Guide',
      cluster: 'Commercial',
      status: 'PLANNED'
    },
    subtopics: [
      {
        id: 'sub-cosmetics-podium',
        name: 'Luxury Cosmetics on Stone Podium',
        slug: 'cosmetics-podium-prompts',
        searchIntent: 'COMMERCIAL',
        targetQuery: 'cosmetic skincare podium prompt midjourney',
        status: 'OPPORTUNITY',
        opportunityScore: 93,
        searchGrowthBadge: '+210% Growth'
      },
      {
        id: 'sub-jewelry-macro',
        name: 'Macro Jewelry with Caustic Lighting',
        slug: 'jewelry-macro-prompts',
        searchIntent: 'COMMERCIAL',
        targetQuery: 'macro diamond jewelry prompt flux',
        status: 'OPPORTUNITY',
        opportunityScore: 89,
        searchGrowthBadge: '+140% Growth'
      }
    ]
  }
];

export const TOPIC_CLUSTERS = CLUSTER_TREES.map(c => ({
  name: c.name,
  description: c.description,
  topics: [c.hubTopic]
}));
