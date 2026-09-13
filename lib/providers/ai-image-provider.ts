import { Media, ImageStatus, Prompt } from '@/lib/types';

export interface ImageGenerationRequest {
  promptId: string;
  articleId?: string;
  generationPrompt: string;
  imageBrief?: string;
  aspectRatio?: string;
  model?: string;
}

export interface PromptImageConsistencyReport {
  status: 'PASS' | 'WARNING' | 'FAIL';
  totalPrompts: number;
  totalImages: number;
  readyImages: number;
  missingImages: number;
  needsReviewImages: number;
  details: {
    promptNumber: number;
    promptTitle: string;
    imageStatus: ImageStatus;
    hasAltText: boolean;
    hasUrl: boolean;
    issues: string[];
  }[];
}

export interface AIImageProvider {
  name: string;
  isMock: boolean;
  generateImageForPrompt(request: ImageGenerationRequest): Promise<Media>;
  regenerateImageForPrompt(promptId: string, updatedPrompt: string): Promise<Media>;
  validateConsistency(prompts: Prompt[]): PromptImageConsistencyReport;
}

export class MockAIImageProvider implements AIImageProvider {
  name = 'Mock AI Image Generation Engine (Midjourney v6.1 / Flux.1 Dev)';
  isMock = true;

  async generateImageForPrompt(request: ImageGenerationRequest): Promise<Media> {
    // Simulates dedicated 1-to-1 synthesis
    return {
      id: `img-gen-${request.promptId}-${Date.now()}`,
      promptId: request.promptId,
      articleId: request.articleId,
      url: `/images/prompts/80s-retro/prompt-${(parseInt(request.promptId.replace(/[^0-9]/g, ''), 10) % 7) + 1 || 1}-studio-portrait.jpg`,
      altText: `AI generated visual sample for prompt ${request.promptId}: ${request.generationPrompt.slice(0, 60)}...`,
      width: 1200,
      height: 900,
      aspectRatio: request.aspectRatio || '4:3',
      generationModel: request.model || 'Flux.1 Dev',
      generationPrompt: request.generationPrompt,
      generatedAt: new Date().toISOString(),
      promptVersion: 1,
      status: 'READY'
    };
  }

  async regenerateImageForPrompt(promptId: string, updatedPrompt: string): Promise<Media> {
    return {
      id: `img-regen-${promptId}-${Date.now()}`,
      promptId,
      url: `/images/prompts/80s-retro/prompt-${(parseInt(promptId.replace(/[^0-9]/g, ''), 10) % 7) + 1 || 1}-studio-portrait.jpg`,
      altText: `Regenerated example for ${promptId}`,
      width: 1200,
      height: 900,
      aspectRatio: '4:3',
      generationModel: 'Midjourney v6.1 (--style raw)',
      generationPrompt: updatedPrompt,
      generatedAt: new Date().toISOString(),
      promptVersion: 2,
      status: 'READY'
    };
  }

  validateConsistency(prompts: Prompt[]): PromptImageConsistencyReport {
    const details = prompts.map((p, idx) => {
      const issues: string[] = [];
      const hasUrl = Boolean(p.media && p.media.url);
      const hasAltText = Boolean(p.media && p.media.altText && p.media.altText.trim().length > 5);
      const status: ImageStatus = p.media?.status || (hasUrl ? 'READY' : 'MISSING');

      if (!hasUrl) issues.push('Missing example image asset');
      if (!hasAltText) issues.push('Missing descriptive alt text');
      if (status === 'NEEDS_REVIEW') issues.push('Image flagged for visual quality review');
      if (status === 'FAILED') issues.push('Image generation failed');

      return {
        promptNumber: p.number ?? idx + 1,
        promptTitle: p.title,
        imageStatus: status,
        hasAltText,
        hasUrl,
        issues
      };
    });

    const totalPrompts = prompts.length;
    const readyImages = details.filter(d => d.imageStatus === 'READY' || d.imageStatus === 'APPROVED').length;
    const missingImages = details.filter(d => !d.hasUrl || d.imageStatus === 'MISSING').length;
    const needsReviewImages = details.filter(d => d.imageStatus === 'NEEDS_REVIEW' || d.imageStatus === 'FAILED').length;

    let overallStatus: 'PASS' | 'WARNING' | 'FAIL' = 'PASS';
    if (missingImages > 0 || readyImages < totalPrompts) {
      overallStatus = 'FAIL';
    } else if (needsReviewImages > 0 || details.some(d => !d.hasAltText)) {
      overallStatus = 'WARNING';
    }

    return {
      status: overallStatus,
      totalPrompts,
      totalImages: details.filter(d => d.hasUrl).length,
      readyImages,
      missingImages,
      needsReviewImages,
      details
    };
  }
}

export const defaultAIImageProvider = new MockAIImageProvider();
