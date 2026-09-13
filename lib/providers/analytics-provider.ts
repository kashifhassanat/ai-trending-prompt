import { ArticleAnalytics, TrendLifecycle } from '@/lib/types';

export interface PerformanceFeedbackItem {
  articleTitle: string;
  articleSlug: string;
  views: number;
  promptCopies: number;
  copyRate: number;
  trendStatus: TrendLifecycle;
  recommendationType: 'EXPAND_CLUSTER' | 'UPDATE_PROMPTS' | 'MERGE_TOPIC' | 'CREATE_SUBTOPIC';
  recommendationTitle: string;
  actionableIdeas: string[];
}

export interface AnalyticsProvider {
  name: string;
  isMock: boolean;
  getArticleAnalytics(): Promise<ArticleAnalytics[]>;
  getFeedbackLoopRecommendations(): Promise<PerformanceFeedbackItem[]>;
  getTopPerformingArticles(limit?: number): Promise<ArticleAnalytics[]>;
}

export class MockAnalyticsProvider implements AnalyticsProvider {
  name = 'Mock Internal Performance & Telemetry Engine';
  isMock = true;

  private mockAnalytics: ArticleAnalytics[] = [
    {
      articleId: 'art-80s-retro-photo-prompts',
      slug: '80s-retro-photo-prompts',
      title: '7 Best 80s Retro AI Photo Prompts',
      views: 12400,
      promptCopies: 3180,
      copyRate: 25.6, // 3180 / 12400 = 25.6%
      avgTimeOnPageSecs: 218,
      trendStatus: 'TRENDING',
      feedbackLoopAction: 'High performer: Expand topic cluster with 80s VHS & Neon portrait sub-guides'
    },
    {
      articleId: 'art-vintage-film',
      slug: 'vintage-film-photo-prompts',
      title: 'Vintage Film Photo Prompts: 35mm, Kodachrome & Grain',
      views: 8900,
      promptCopies: 1980,
      copyRate: 22.2,
      avgTimeOnPageSecs: 185,
      trendStatus: 'EVERGREEN',
      feedbackLoopAction: 'Consistent traffic: Add new Flux.1 Dev emulsion recipes'
    },
    {
      articleId: 'art-y2k-photo',
      slug: 'y2k-photo-prompts',
      title: 'Y2K Photo Prompts: Early 2000s Digicam Aesthetic',
      views: 6450,
      promptCopies: 1520,
      copyRate: 23.6,
      avgTimeOnPageSecs: 160,
      trendStatus: 'OPPORTUNITY',
      feedbackLoopAction: 'Rising demand: Target secondary queries on Depop/lifestyle angles'
    },
    {
      articleId: 'art-cinematic-photo',
      slug: 'cinematic-photo-prompts',
      title: 'Cinematic Photo Prompts: Hollywood Lighting & Color',
      views: 5200,
      promptCopies: 940,
      copyRate: 18.1,
      avgTimeOnPageSecs: 142,
      trendStatus: 'EVERGREEN',
      feedbackLoopAction: 'Moderate copies: Revise prompt #3 and #4 with better aspect ratio tips'
    },
    {
      articleId: 'art-polaroid-photo',
      slug: 'polaroid-photo-prompts',
      title: 'Polaroid Photo Prompts: Authentic Instant Film Chemistry',
      views: 4800,
      promptCopies: 1110,
      copyRate: 23.1,
      avgTimeOnPageSecs: 175,
      trendStatus: 'TRENDING',
      feedbackLoopAction: 'High engagement: Create subtopic on wedding/couple polaroids'
    }
  ];

  async getArticleAnalytics(): Promise<ArticleAnalytics[]> {
    return [...this.mockAnalytics];
  }

  async getTopPerformingArticles(limit = 5): Promise<ArticleAnalytics[]> {
    return [...this.mockAnalytics]
      .sort((a, b) => b.promptCopies - a.promptCopies)
      .slice(0, limit);
  }

  async getFeedbackLoopRecommendations(): Promise<PerformanceFeedbackItem[]> {
    return [
      {
        articleTitle: '7 Best 80s Retro AI Photo Prompts',
        articleSlug: '80s-retro-photo-prompts',
        views: 12400,
        promptCopies: 3180,
        copyRate: 25.6,
        trendStatus: 'TRENDING',
        recommendationType: 'EXPAND_CLUSTER',
        recommendationTitle: 'Expand 80s Retro Topic Cluster',
        actionableIdeas: [
          'Generate "7 80s VHS Camcorder AI Photo Prompts" (Search growth +184%)',
          'Generate "7 80s Neon Portrait Prompts" (Opportunity Score: 84)',
          'Create "80s Mall Culture" visual subtopic for Instagram creator audience'
        ]
      },
      {
        articleTitle: 'Y2K Photo Prompts: Early 2000s Digicam Aesthetic',
        articleSlug: 'y2k-photo-prompts',
        views: 6450,
        promptCopies: 1520,
        copyRate: 23.6,
        trendStatus: 'OPPORTUNITY',
        recommendationType: 'CREATE_SUBTOPIC',
        recommendationTitle: 'Target Digicam Night-Flash Queries',
        actionableIdeas: [
          'Publish dedicated guide on compact digital camera flash falloff',
          'Add fashion lookbook prompt recipes for Depop sellers'
        ]
      }
    ];
  }
}

export const defaultAnalyticsProvider = new MockAnalyticsProvider();
