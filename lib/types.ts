export type TrendLifecycle =
  | 'DISCOVERED'
  | 'RESEARCHING'
  | 'OPPORTUNITY'
  | 'DRAFT'
  | 'REVIEW'
  | 'PUBLISHED'
  | 'TRENDING'
  | 'EVERGREEN'
  | 'DECLINING'
  | 'NEEDS_REVIEW';

export type SearchIntent =
  | 'INSPIRATION'
  | 'HOW_TO'
  | 'TRANSFORMATION'
  | 'STYLE'
  | 'USE_CASE'
  | 'COMMERCIAL'
  | 'COMPARISON'
  | 'TREND';

export type ContentType =
  | 'Visual Prompt Recipe'
  | 'How-To Guide'
  | 'Trend Guide'
  | 'Style Guide'
  | 'Use-Case Guide'
  | 'Commercial Prompt Guide';

export interface ContentBrief {
  topic: string;
  primaryQuery: string;
  secondaryQueries: string[];
  searchIntent: SearchIntent;
  targetAudience: string;
  contentAngle: string;
  whyThisPageShouldExist: string;
  existingCompetingPages: { title: string; slug: string; similarityScore: number }[];
  relatedCluster: string;
  topicClusterId: string;
  contentType: ContentType;
  recommendedPromptCount: number;
  recommendedPrompts: string[];
  recommendedVisualExamples: string[];
  internalLinkOpportunities: {
    outbound: { targetSlug: string; targetTitle: string; reason: string }[];
    inbound: { sourceSlug: string; sourceTitle: string; reason: string }[];
  };
  approvedByAdmin: boolean;
  approvedAt?: string;
}

export interface PSEOMetricBreakdown {
  searchDemand: number;
  trendMomentum: number;
  searchIntentClarity: number;
  contentUniqueness: number;
  coverageGap: number;
  competition: number;
  internalLinkPotential: number;
  commercialValue: number;
  freshness: number;
}

export interface PSEOOpportunityReport {
  score: number;
  breakdown: PSEOMetricBreakdown;
  rationale: string;
  intentAlignment: string;
  recommendation: string;
}

export interface InboundLinkOpportunity {
  id: string;
  sourceArticleId: string;
  sourceArticleTitle: string;
  sourceSlug: string;
  suggestedAnchorText: string;
  targetSection: string;
  reason: string;
  reviewed: boolean;
  accepted: boolean;
}

export interface BidirectionalLinkReport {
  outboundSuggestions: InternalLinkSuggestion[];
  inboundOpportunities: InboundLinkOpportunity[];
}

export interface SafetyCheckResult {
  hasKeywordStuffing: boolean;
  hasRepetitivePrompts: boolean;
  hasThinContent: boolean;
  hasGenericAILanguage: boolean;
  isNearDuplicate: boolean;
  passed: boolean;
  violations: string[];
}

export type ContentStage =
  | 'IDEA'
  | 'RESEARCH'
  | 'DRAFT'
  | 'ASSETS'
  | 'QUALITY_CHECK'
  | 'REVIEW'
  | 'PUBLISHED';

export type ImageStatus =
  | 'MISSING'
  | 'GENERATING'
  | 'READY'
  | 'FAILED'
  | 'NEEDS_REVIEW'
  | 'APPROVED';

export type CannibalizationStatus = 'GREEN' | 'YELLOW' | 'RED';

export type ReviewDecision = 'PENDING' | 'APPROVED' | 'CHANGES_REQUESTED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'AUTHOR';
  avatarUrl?: string;
}

export interface Media {
  id: string;
  promptId?: string;
  articleId?: string;
  url: string;
  altText: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  generationModel?: string;
  generationPrompt?: string;
  generatedAt?: string;
  promptVersion?: number;
  status?: ImageStatus;
  caption?: string;
  credit?: string;
}

export interface Prompt {
  id: string;
  slug: string;
  number?: number;
  title: string;
  promptText: string;
  negativePrompt?: string;
  media: Media;
  howToUse: string[];
  practicalTip: string;
  modelRecommended?: string;
  aspectRatio?: string;
  categorySlug?: string;
  style?: string;
  useCase?: string;
  version?: number;
  imageBrief?: string;
  tags?: string[];
  author?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ArticleTroubleshootingItem {
  issue: string;
  solution: string;
}

export interface InternalLinkSuggestion {
  id: string;
  targetArticleTitle: string;
  targetSlug: string;
  categoryName: string;
  reason: string;
  accepted: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  robotsDirective: string;
  indexable: boolean;
  status: 'IDEA' | 'DRAFT' | 'REVIEW' | 'PUBLISHED';

  // FIRST-CLASS SEARCH INTENT & PSEO FIELDS (MANDATORY)
  primaryQuery: string;
  secondaryQueries: string[];
  searchIntent: SearchIntent;
  targetAudience: string;
  topicId: string;
  topicClusterId: string;
  parentTopic?: string;
  contentType: ContentType;

  // Freshness & Authorship
  publishedAt: string;
  updatedAt: string;
  lastReviewedAt: string;
  sourceTrendId?: string;
  trendStatus?: TrendLifecycle;
  author: {
    name: string;
    role?: string;
    avatarUrl?: string;
  };
  featuredMedia: Media;
  categorySlug: string;
  categoryName: string;
  readingTimeMinutes: number;

  // Open Graph & Social
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;

  introduction: string[];
  quickOverviewHeading?: string;
  prompts: Prompt[];
  howToGetBetterResults: {
    title: string;
    points: { headline: string; description: string }[];
  };
  practicalTips: { headline: string; description: string }[];
  troubleshooting: ArticleTroubleshootingItem[];
  faqs: FAQ[];
  relatedArticles: {
    id: string;
    title: string;
    slug: string;
    description: string;
    media: Media;
    categoryName: string;
    publishedAt: string;
  }[];
  internalLinkSuggestions?: InternalLinkSuggestion[];
  inboundLinkOpportunities?: InboundLinkOpportunity[];
  contentBrief?: ContentBrief;
  pseoReport?: PSEOOpportunityReport;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  promptCount: number;
  articleCount: number;
  featuredMedia?: Media;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  parentTopicId?: string;
  categorySlug: string;
  searchIntent: SearchIntent;
  primaryQuery: string;
  secondaryQueries: string[];
  contentType: string;
  cluster: string;
  status: 'EXPLORING' | 'PLANNED' | 'COVERED';
}

export interface TrendSignal {
  provider: 'GOOGLE_TRENDS' | 'SOCIAL_MOMENTUM' | 'SEARCH_INDEX' | 'INTERNAL_ANALYTICS';
  sourceName: string;
  value: number; // 0-100
  label: string;
  detectedAt: string;
}

export interface ContentOpportunity {
  id: string;
  title: string;
  searchIntent: SearchIntent;
  contentAngle: string;
  opportunityScore: number;
  existingCoverage: string;
  recommendedPromptCount: number;
  cannibalizationStatus: CannibalizationStatus;
  targetKeyword: string;
}

export interface Trend {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: TrendLifecycle;
  category: string;
  detectedAt: string;
  lastCheckedAt: string;

  searchGrowth: number; // 0-100
  socialMomentum: number; // 0-100
  freshness: number; // 0-100
  competition: number; // 0-100
  contentOpportunity: number; // 0-100
  commercialValue: number; // 0-100
  trendScore: number; // calculated 0-100

  whyItMatters: string;
  relatedQueries: string[];
  risingTopics: string[];
  relatedStyles: string[];
  relatedUseCases: string[];

  existingArticleCount: number;
  existingArticles: { id: string; title: string; slug: string }[];
  contentOpportunities: ContentOpportunity[];
  sourceSignals: TrendSignal[];
}

export interface ContentProject {
  id: string;
  trendId?: string;
  trendTitle?: string;
  topic: string;
  slug: string;
  primaryQuery: string;
  secondaryQueries: string[];
  searchIntent: SearchIntent;
  targetQuery: string;
  contentType: ContentType;
  targetAudience: string;
  topicId: string;
  topicClusterId: string;
  parentTopic?: string;
  promptCount: number;
  imageCount: number;
  stage: ContentStage;
  articleId?: string;
  contentScore?: number;
  seoScore?: number;
  visualScore?: number;
  editorialScore?: number;
  pseoOpportunityScore?: number;
  briefApproved?: boolean;
  contentBrief?: ContentBrief;
  imageStatusSummary?: {
    ready: number;
    generating: number;
    needsReview: number;
    failed: number;
  };
  reviewStatus: ReviewDecision;
  createdAt: string;
  updatedAt: string;
}

export interface QualityCheckItem {
  id: string;
  label: string;
  category: 'CONTENT' | 'VISUALS' | 'SEO' | 'EDITORIAL';
  status: 'PASS' | 'WARNING' | 'FAIL';
  message: string;
  fixAction?: string;
}

export interface QualityReport {
  overallScore: number;
  contentScore: number;
  seoScore: number;
  visualScore: number;
  editorialScore: number;
  isPublishReady: boolean;
  blockers: string[];
  warnings: string[];
  checks: QualityCheckItem[];
}

export interface CannibalizationCheckResult {
  status: CannibalizationStatus;
  primaryMatch?: {
    articleId: string;
    title: string;
    slug: string;
    overlapScore: number;
    reason: string;
  };
  recommendation: string;
  alternativeAngles: string[];
}

export interface ArticleAnalytics {
  articleId: string;
  slug: string;
  title: string;
  views: number;
  promptCopies: number;
  copyRate: number; // percentage, e.g. 25.6
  avgTimeOnPageSecs: number;
  trendStatus: TrendLifecycle;
  feedbackLoopAction?: string;
}

export interface ReviewItem {
  id: string;
  articleId: string;
  projectTitle: string;
  trendTitle: string;
  authorName: string;
  submittedAt: string;
  contentScore: number;
  seoScore: number;
  visualScore: number;
  imageStatus: string;
  duplicateRisk: CannibalizationStatus;
  status: ReviewDecision;
  feedbackNotes?: string;
}

export interface Goal {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  promptCount: number;
  targetHref: string;
}

export interface AdminStat {
  label: string;
  value: number | string;
  change?: string;
  statusText?: string;
}
