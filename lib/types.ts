export interface Media {
  id: string;
  url: string;
  altText: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
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

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role?: string;
    avatarUrl?: string;
  };
  featuredMedia: Media;
  categorySlug: string;
  categoryName: string;
  readingTimeMinutes: number;
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
  value: number;
  change?: string;
  statusText?: string;
}
