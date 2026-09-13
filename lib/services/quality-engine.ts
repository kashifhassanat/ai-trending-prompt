import { Article, QualityReport, QualityCheckItem, SafetyCheckResult } from '@/lib/types';

/**
 * List of banned generic AI cliches that trigger programmatic safety violations.
 */
const GENERIC_AI_CLICHES = [
  'in the fast-paced world',
  'delve into the realm',
  'testament to the power',
  'tapestry of',
  'game-changer',
  'dive deep into',
  'leverage the power of',
  'unlock your potential',
  'in today\'s digital age'
];

/**
 * Audits programmatic content safety: detects keyword stuffing, superficial variations,
 * thin supporting content, and generic AI hallucinations.
 */
export function auditContentSafety(article: Article): SafetyCheckResult {
  const violations: string[] = [];

  // 1. Keyword Stuffing Check
  const fullText = [
    article.title,
    ...(article.introduction || []),
    ...(article.prompts?.map(p => `${p.title} ${p.promptText} ${p.practicalTip}`) || [])
  ].join(' ').toLowerCase();

  const totalWords = fullText.split(/\s+/).filter(Boolean).length;
  const primaryTerm = (article.primaryQuery || '').toLowerCase().trim();

  let hasKeywordStuffing = false;
  if (primaryTerm && totalWords > 100) {
    const occurrences = fullText.split(primaryTerm).length - 1;
    const density = (occurrences * primaryTerm.split(/\s+/).length / totalWords) * 100;
    if (density > 3.8) {
      hasKeywordStuffing = true;
      violations.push(`Keyword stuffing detected: primary query "${primaryTerm}" has a density of ${density.toFixed(1)}% (limit: 3.5%)`);
    }
  }

  // 2. Repetitive Prompt Structure Check (Superficial duplicate detection)
  let hasRepetitivePrompts = false;
  if (article.prompts && article.prompts.length >= 2) {
    for (let i = 0; i < article.prompts.length; i++) {
      for (let j = i + 1; j < article.prompts.length; j++) {
        const textA = article.prompts[i].promptText.toLowerCase();
        const textB = article.prompts[j].promptText.toLowerCase();

        const wordsA = new Set(textA.split(/\s+/).filter(w => w.length > 3));
        const wordsB = new Set(textB.split(/\s+/).filter(w => w.length > 3));

        let common = 0;
        wordsA.forEach(w => { if (wordsB.has(w)) common++; });

        const overlap = wordsA.size > 0 ? (common / wordsA.size) * 100 : 0;
        if (overlap > 85) {
          hasRepetitivePrompts = true;
          violations.push(`Superficial prompt variation detected: Prompt #${i + 1} and Prompt #${j + 1} share ${Math.round(overlap)}% identical text structure. Prompts must represent genuinely distinct creative scenarios.`);
          break;
        }
      }
      if (hasRepetitivePrompts) break;
    }
  }

  // 3. Thin Supporting Content Check
  let hasThinContent = false;
  if (!article.howToGetBetterResults || !article.howToGetBetterResults.points || article.howToGetBetterResults.points.length < 3) {
    hasThinContent = true;
    violations.push('Thin supporting content: "How to Get Better Results" requires at least 3 actionable technique points.');
  }
  if (!article.troubleshooting || article.troubleshooting.length < 3) {
    hasThinContent = true;
    violations.push('Thin supporting content: Article must contain at least 3 concrete troubleshooting scenarios.');
  }

  // 4. Generic AI Language Check
  let hasGenericAILanguage = false;
  for (const cliche of GENERIC_AI_CLICHES) {
    if (fullText.includes(cliche)) {
      hasGenericAILanguage = true;
      violations.push(`Generic AI cliche detected: contains "${cliche}". Use authentic human editorial phrasing.`);
    }
  }

  // 5. Near-Duplicate Check
  const isNearDuplicate = hasRepetitivePrompts && hasKeywordStuffing;

  const passed = violations.length === 0;

  return {
    hasKeywordStuffing,
    hasRepetitivePrompts,
    hasThinContent,
    hasGenericAILanguage,
    isNearDuplicate,
    passed,
    violations
  };
}

/**
 * Quality Engine & Publish Gate:
 * Evaluates an article across Content, Visuals, SEO, Editorial, and Safety dimensions.
 * Deliberately blocks publishing if mandatory quality criteria are unmet.
 */
export function evaluateArticleQuality(article: Article): QualityReport {
  const checks: QualityCheckItem[] = [];
  const blockers: string[] = [];
  const warnings: string[] = [];

  // ==========================================
  // 1. FIRST-CLASS SEARCH INTENT & PSEO CHECKS
  // ==========================================
  const hasSearchIntent = Boolean(article.searchIntent);
  checks.push({
    id: 'seo-intent',
    label: 'First-Class Search Intent Defined',
    category: 'SEO',
    status: hasSearchIntent ? 'PASS' : 'FAIL',
    message: hasSearchIntent ? `Declared Search Intent: ${article.searchIntent}` : 'CRITICAL: Search Intent is missing. Every article must define a first-class search intent.'
  });
  if (!hasSearchIntent) blockers.push('Search Intent is missing. System prevents publishing without a declared search intent.');

  const hasPrimaryQuery = Boolean(article.primaryQuery && article.primaryQuery.trim().length >= 4);
  checks.push({
    id: 'seo-primary-query',
    label: 'Primary Target Search Query',
    category: 'SEO',
    status: hasPrimaryQuery ? 'PASS' : 'FAIL',
    message: hasPrimaryQuery ? `Target Query: "${article.primaryQuery}"` : 'Primary search query is missing.'
  });
  if (!hasPrimaryQuery) blockers.push('Primary search query must be specified.');

  const hasTopicCluster = Boolean(article.topicClusterId);
  checks.push({
    id: 'seo-topic-cluster',
    label: 'Assigned Topic Cluster',
    category: 'SEO',
    status: hasTopicCluster ? 'PASS' : 'FAIL',
    message: hasTopicCluster ? `Cluster: ${article.topicClusterId} (${article.parentTopic || 'Styles'})` : 'Article is orphaned without a topic cluster.'
  });
  if (!hasTopicCluster) blockers.push('Article must belong to a defined Topic Cluster.');

  // ==========================================
  // 2. CONTENT INTEGRITY CHECKS
  // ==========================================
  const hasTitle = Boolean(article.title && article.title.trim().length >= 10);
  checks.push({
    id: 'cnt-title',
    label: 'Descriptive Editorial Title',
    category: 'CONTENT',
    status: hasTitle ? 'PASS' : 'FAIL',
    message: hasTitle ? `Title "${article.title}" is well-formed.` : 'Article title is missing or too short.'
  });
  if (!hasTitle) blockers.push('Missing or invalid article title');

  const hasIntro = Boolean(article.introduction && article.introduction.length >= 2);
  checks.push({
    id: 'cnt-intro',
    label: 'Substantive Introduction',
    category: 'CONTENT',
    status: hasIntro ? 'PASS' : 'FAIL',
    message: hasIntro ? `Introduction contains ${article.introduction.length} paragraphs.` : 'Introduction must contain at least 2 substantive paragraphs.'
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

  const hasFaqs = Boolean(article.faqs && article.faqs.length >= 4);
  checks.push({
    id: 'cnt-faqs',
    label: '4–7 Practical FAQs',
    category: 'CONTENT',
    status: hasFaqs ? 'PASS' : 'WARNING',
    message: hasFaqs ? `Contains ${article.faqs.length} FAQs.` : 'Less than 4 FAQs present; recommend adding more.'
  });
  if (!hasFaqs) warnings.push('Consider adding at least 4 FAQs for complete schema coverage');

  // ==========================================
  // 3. VISUAL COMPLETENESS (1-to-1 Mapping)
  // ==========================================
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

  // ==========================================
  // 4. METADATA & INDEXABILITY CHECKS
  // ==========================================
  const hasMetaTitle = Boolean(article.metaTitle && article.metaTitle.length >= 25 && article.metaTitle.length <= 75);
  checks.push({
    id: 'seo-title',
    label: 'SEO Title (25-75 chars)',
    category: 'SEO',
    status: hasMetaTitle ? 'PASS' : 'WARNING',
    message: `SEO title is ${article.metaTitle?.length || 0} characters.`
  });
  if (!hasMetaTitle) warnings.push('SEO title should ideally be between 25 and 75 characters');

  const hasMetaDesc = Boolean(article.metaDescription && article.metaDescription.length >= 70 && article.metaDescription.length <= 165);
  checks.push({
    id: 'seo-desc',
    label: 'Meta Description (70-165 chars)',
    category: 'SEO',
    status: hasMetaDesc ? 'PASS' : 'WARNING',
    message: `Meta description is ${article.metaDescription?.length || 0} characters.`
  });
  if (!hasMetaDesc) warnings.push('Meta description should ideally be between 70 and 165 characters');

  const hasCanonical = Boolean(article.canonicalUrl && article.canonicalUrl.startsWith('https://'));
  checks.push({
    id: 'seo-canonical',
    label: 'Valid Canonical URL',
    category: 'SEO',
    status: hasCanonical ? 'PASS' : 'FAIL',
    message: hasCanonical ? `Canonical: ${article.canonicalUrl}` : 'Canonical URL is missing or invalid.'
  });
  if (!hasCanonical) blockers.push('Canonical URL must be a valid https URL');

  // ==========================================
  // 5. PROGRAMMATIC CONTENT SAFETY & EDITORIAL
  // ==========================================
  const safety = auditContentSafety(article);
  checks.push({
    id: 'edt-safety',
    label: 'Programmatic Anti-Spam Safety Audit',
    category: 'EDITORIAL',
    status: safety.passed ? 'PASS' : 'FAIL',
    message: safety.passed ? 'No keyword stuffing, generic AI cliches, or superficial prompt repetitions detected.' : safety.violations[0]
  });
  if (!safety.passed) {
    safety.violations.forEach(v => blockers.push(v));
  }

  const hasHowToAndTips = article.prompts?.every(p => p.howToUse?.length > 0 && Boolean(p.practicalTip));
  checks.push({
    id: 'edt-howto-tips',
    label: 'How-to & Practical Tips per Prompt',
    category: 'EDITORIAL',
    status: hasHowToAndTips ? 'PASS' : 'FAIL',
    message: hasHowToAndTips ? 'All prompts include step-by-step instructions and practical tips.' : 'Some prompts lack how-to steps or practical tips.'
  });
  if (!hasHowToAndTips) blockers.push('Every prompt must include step-by-step How-to guidance and a practical tip');

  // Calculate Sub-Scores (0-100)
  const contentScore = Math.round(
    ((hasTitle ? 25 : 0) + (hasIntro ? 25 : 0) + (validPromptCount ? 30 : 10) + (hasFaqs ? 20 : 10))
  );
  const visualScore = Math.round(
    ((oneToOnePassing ? 70 : 20) + (hasAltText ? 30 : 10))
  );
  const seoScore = Math.round(
    ((hasSearchIntent ? 25 : 0) + (hasPrimaryQuery ? 25 : 0) + (hasCanonical ? 25 : 0) + (hasMetaTitle && hasMetaDesc ? 25 : 10))
  );
  const editorialScore = Math.round(
    ((safety.passed ? 50 : 10) + (hasHowToAndTips ? 50 : 20))
  );

  const overallScore = Math.round(
    contentScore * 0.25 + visualScore * 0.25 + seoScore * 0.25 + editorialScore * 0.25
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
