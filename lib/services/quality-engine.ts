import { Article, QualityReport, QualityCheckItem } from '@/lib/types';

/**
 * Quality Engine & Publish Gate:
 * Evaluates an article across Content, Visuals, SEO, and Editorial dimensions.
 * Strictly blocks publication if mandatory criteria are unmet.
 */
export function evaluateArticleQuality(article: Article): QualityReport {
  const checks: QualityCheckItem[] = [];
  const blockers: string[] = [];
  const warnings: string[] = [];

  // 1. CONTENT CHECKS
  const hasTitle = Boolean(article.title && article.title.trim().length >= 10);
  checks.push({
    id: 'cnt-title',
    label: 'Descriptive Title',
    category: 'CONTENT',
    status: hasTitle ? 'PASS' : 'FAIL',
    message: hasTitle ? `Title "${article.title}" is well-formed.` : 'Article title is missing or too short.'
  });
  if (!hasTitle) blockers.push('Missing or invalid article title');

  const hasIntro = Boolean(article.introduction && article.introduction.length >= 2);
  checks.push({
    id: 'cnt-intro',
    label: 'Useful Introduction',
    category: 'CONTENT',
    status: hasIntro ? 'PASS' : 'FAIL',
    message: hasIntro ? `Introduction has ${article.introduction.length} paragraphs.` : 'Introduction must contain at least 2 substantive paragraphs.'
  });
  if (!hasIntro) blockers.push('Introduction too thin (requires at least 2 paragraphs)');

  const promptCount = article.prompts ? article.prompts.length : 0;
  const validPromptCount = promptCount >= 6 && promptCount <= 7;
  checks.push({
    id: 'cnt-prompts-count',
    label: '6–7 Genuinely Distinct Prompts',
    category: 'CONTENT',
    status: validPromptCount ? 'PASS' : 'FAIL',
    message: `Article contains ${promptCount} prompts (standard is 6 or 7).`
  });
  if (!validPromptCount) blockers.push(`Article must contain exactly 6 or 7 prompts (currently: ${promptCount})`);

  // Prompt diversity check (detect superficial duplicates)
  let promptsDiverse = true;
  if (article.prompts && article.prompts.length > 1) {
    const titles = article.prompts.map(p => p.title.toLowerCase());
    const uniqueTitles = new Set(titles);
    if (uniqueTitles.size !== titles.length) {
      promptsDiverse = false;
    }
  }
  checks.push({
    id: 'cnt-prompts-diversity',
    label: 'Prompt Diversity Check',
    category: 'CONTENT',
    status: promptsDiverse ? 'PASS' : 'FAIL',
    message: promptsDiverse ? 'All prompts represent distinct creative scenarios.' : 'Duplicate prompt concepts detected.'
  });
  if (!promptsDiverse) blockers.push('Prompts contain duplicate concepts or titles');

  const hasFaqs = Boolean(article.faqs && article.faqs.length >= 4);
  checks.push({
    id: 'cnt-faqs',
    label: '4–7 Practical FAQs',
    category: 'CONTENT',
    status: hasFaqs ? 'PASS' : 'WARNING',
    message: hasFaqs ? `Contains ${article.faqs.length} FAQs.` : 'Less than 4 FAQs present; recommend adding more.'
  });
  if (!hasFaqs) warnings.push('Consider adding at least 4 FAQs for complete schema coverage');

  // 2. VISUAL CHECKS (Critical 1-to-1 rule)
  let missingImagesCount = 0;
  let missingAltCount = 0;

  article.prompts?.forEach((p) => {
    if (!p.media || !p.media.url) {
      missingImagesCount++;
    }
    if (!p.media?.altText || p.media.altText.trim().length < 5) {
      missingAltCount++;
    }
  });

  const oneToOnePassing = missingImagesCount === 0 && promptCount > 0;
  checks.push({
    id: 'vis-one-to-one',
    label: '1-to-1 Prompt/Image Mapping',
    category: 'VISUALS',
    status: oneToOnePassing ? 'PASS' : 'FAIL',
    message: oneToOnePassing ? `All ${promptCount} prompts have verified dedicated sample images.` : `${missingImagesCount} prompts are missing corresponding images.`
  });
  if (!oneToOnePassing) blockers.push(`Missing images: Every prompt requires 1 dedicated example image (${missingImagesCount} missing)`);

  const hasAltText = missingAltCount === 0;
  checks.push({
    id: 'vis-alt-text',
    label: 'Descriptive Image Alt Text',
    category: 'VISUALS',
    status: hasAltText ? 'PASS' : 'WARNING',
    message: hasAltText ? 'All prompt images have descriptive alt text.' : `${missingAltCount} images lack descriptive alt text.`
  });
  if (!hasAltText) warnings.push(`${missingAltCount} images require descriptive alt text for SEO & accessibility`);

  // 3. SEO CHECKS
  const hasMetaTitle = Boolean(article.metaTitle && article.metaTitle.length >= 25 && article.metaTitle.length <= 70);
  checks.push({
    id: 'seo-title',
    label: 'SEO Title (25-70 chars)',
    category: 'SEO',
    status: hasMetaTitle ? 'PASS' : 'WARNING',
    message: `SEO title is ${article.metaTitle?.length || 0} characters.`
  });
  if (!hasMetaTitle) warnings.push('SEO title should ideally be between 25 and 70 characters');

  const hasMetaDesc = Boolean(article.metaDescription && article.metaDescription.length >= 70 && article.metaDescription.length <= 160);
  checks.push({
    id: 'seo-desc',
    label: 'Meta Description (70-160 chars)',
    category: 'SEO',
    status: hasMetaDesc ? 'PASS' : 'WARNING',
    message: `Meta description is ${article.metaDescription?.length || 0} characters.`
  });
  if (!hasMetaDesc) warnings.push('Meta description should ideally be between 70 and 160 characters');

  const hasCategory = Boolean(article.categorySlug && article.categoryName);
  checks.push({
    id: 'seo-category',
    label: 'Taxonomy Category Assigned',
    category: 'SEO',
    status: hasCategory ? 'PASS' : 'FAIL',
    message: hasCategory ? `Assigned to category: ${article.categoryName}` : 'Category is missing.'
  });
  if (!hasCategory) blockers.push('Taxonomy category must be assigned');

  // 4. EDITORIAL CHECKS
  const hasHowToAndTips = article.prompts?.every(p => p.howToUse?.length > 0 && Boolean(p.practicalTip));
  checks.push({
    id: 'edt-howto-tips',
    label: 'How-to & Practical Tips per Prompt',
    category: 'EDITORIAL',
    status: hasHowToAndTips ? 'PASS' : 'FAIL',
    message: hasHowToAndTips ? 'All prompts include step-by-step instructions and practical tips.' : 'Some prompts lack how-to steps or practical tips.'
  });
  if (!hasHowToAndTips) blockers.push('Every prompt must include step-by-step How-to guidance and a practical tip');

  // Calculate Scores (0-100)
  const contentScore = Math.round(
    ((hasTitle ? 25 : 0) + (hasIntro ? 25 : 0) + (validPromptCount ? 30 : 10) + (hasFaqs ? 20 : 10))
  );
  const visualScore = Math.round(
    ((oneToOnePassing ? 70 : 20) + (hasAltText ? 30 : 10))
  );
  const seoScore = Math.round(
    ((hasMetaTitle ? 35 : 15) + (hasMetaDesc ? 35 : 15) + (hasCategory ? 30 : 0))
  );
  const editorialScore = Math.round(
    ((promptsDiverse ? 50 : 20) + (hasHowToAndTips ? 50 : 20))
  );

  const overallScore = Math.round(
    contentScore * 0.3 + visualScore * 0.3 + seoScore * 0.2 + editorialScore * 0.2
  );

  const isPublishReady = blockers.length === 0 && overallScore >= 80;

  return {
    overallScore,
    contentScore,
    visualScore,
    seoScore,
    editorialScore,
    isPublishReady,
    blockers,
    warnings,
    checks
  };
}
