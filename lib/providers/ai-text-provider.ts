import { Article, Prompt, SearchIntent, ImageStatus } from '@/lib/types';

export interface GenerateArticleConfig {
  topic: string;
  searchIntent: SearchIntent;
  contentType: string;
  targetAudience: string;
  promptCount: number; // 6 or 7
  imageCount: number;  // matches promptCount
  sourceTrendId?: string;
}

export interface AITextProvider {
  name: string;
  isMock: boolean;
  generateArticle(config: GenerateArticleConfig): Promise<Article>;
}

export class MockAITextProvider implements AITextProvider {
  name = 'Mock AI Editorial Engine (Claude/GPT-4o Abstraction)';
  isMock = true;

  async generateArticle(config: GenerateArticleConfig): Promise<Article> {
    const slug = config.topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const count = Math.max(6, Math.min(7, config.promptCount || 7));

    // Generate genuinely diverse prompt concepts
    const prompts: Prompt[] = [
      {
        id: `gen-p-1`,
        slug: `${slug}-studio-glamour`,
        number: 1,
        title: 'Classic Feathered Studio Portrait',
        promptText: `Authentic 1980s studio portrait of a woman with voluminous feathered hair, warm soft-focus diffusion filter, airbrushed dusty rose and lilac canvas backdrop, wearing an oversized pastel knit cardigan sweater, delicate gold stud earrings, gentle smile, genuine Kodak Portra 35mm film grain, 1985 year aesthetic --ar 4:3 --v 6.1 --style raw`,
        negativePrompt: 'modern digital look, 3D render, plastic skin, HDR sharpening, smartphone camera',
        media: {
          id: `gen-m-1`,
          promptId: `gen-p-1`,
          url: '/images/prompts/80s-retro/prompt-1-studio-portrait.jpg',
          altText: '1980s studio portrait of a woman with feathered hair and soft pink backdrop',
          status: 'READY' as ImageStatus,
          width: 1200,
          height: 900,
          aspectRatio: '4:3'
        },
        howToUse: [
          'Set aspect ratio to 4:3 or 5:4 to emulate classic analog print ratios.',
          'Specify clothing textures like "oversized pastel knit" for period accuracy.',
          'Use "soft-focus diffusion filter" to soften digital edges.'
        ],
        practicalTip: 'Append "--style raw" in Midjourney to disengage hyper-polished modern default skin smoothing.',
        modelRecommended: 'Midjourney v6.1 / Flux.1 Dev',
        aspectRatio: '4:3',
        categorySlug: 'retro-vintage',
        style: 'Studio Portraiture',
        useCase: 'Profile Avatar',
        version: 1,
        imageBrief: 'Diffused studio strobe, airbrushed canvas backdrop, soft hair volume.',
        tags: ['80s', 'Studio', 'Portrait'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: `gen-p-2`,
        slug: `${slug}-neon-arcade`,
        number: 2,
        title: 'Neon Coin-Op Arcade Night Portrait',
        promptText: `Candid 1985 portrait of a young man inside a dimly lit retro arcade, electric magenta and cyan neon illumination reflecting across his face and hands, wearing a vintage washed denim jacket adorned with enamel pins and an MTV patch, arcade cabinet glowing screen in foreground, moody ambient atmosphere, authentic 35mm film grain, cinematic depth of field --ar 4:3 --v 6.1 --style raw`,
        negativePrompt: 'flat LED lighting, modern computer monitors, CGI bloom, plastic texture',
        media: {
          id: `gen-m-2`,
          promptId: `gen-p-2`,
          url: '/images/prompts/80s-retro/prompt-2-neon-arcade.jpg',
          altText: 'Young man in denim jacket at a neon arcade cabinet',
          status: 'READY' as ImageStatus,
          width: 1200,
          height: 900,
          aspectRatio: '4:3'
        },
        howToUse: [
          'Prompt for two complementary neon bounce colors (magenta and cyan).',
          'Include period hardware like "coin-op joystick" and "CRT screen glow".',
          'Keep subject expression relaxed and candid.'
        ],
        practicalTip: 'Specify "1980s coin-op arcade neon tubes" instead of generic "neon" to avoid cyberpunk synthwave.',
        modelRecommended: 'Midjourney v6.1 / Flux.1 Schnell',
        aspectRatio: '4:3',
        categorySlug: 'retro-vintage',
        style: 'Night Ambient',
        useCase: 'Editorial Still',
        version: 1,
        imageBrief: 'Dual neon reflections, CRT reflections, worn denim with enamel pins.',
        tags: ['Neon', 'Arcade', '80s'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: `gen-p-3`,
        slug: `${slug}-mall-candid`,
        number: 3,
        title: 'Suburban Shopping Mall Candid Snapshot',
        promptText: `Candid full-body snapshot of two stylish teenage best friends walking through a bustling suburban American shopping mall in 1986, teasing feathered bangs, stone-washed denim jeans and oversized color-blocked sweatshirts, holding paper shopping bags, brass handrails and indoor ficus plants in background, illuminated neon storefront signs, natural overhead fluorescent mall glow, authentic 1986 Kodak Kodacolor print aesthetic, subtle red digital date stamp in corner --ar 4:3 --v 6.1`,
        negativePrompt: 'modern minimalist mall, flat glass walls, smartphones, contemporary sneakers',
        media: {
          id: `gen-m-3`,
          promptId: `gen-p-3`,
          url: '/images/prompts/80s-retro/prompt-3-mall-glamour.jpg',
          altText: 'Two teenage friends in stone-washed jeans walking in an 80s shopping mall',
          status: 'READY' as ImageStatus,
          width: 1200,
          height: 900,
          aspectRatio: '4:3'
        },
        howToUse: [
          'Include architectural era markers: tiled floors, brass railings, neon boutiques.',
          'Describe wardrobe: "stone-washed denim" and "slouchy socks with white sneakers".',
          'Add a red digital LED date stamp in the corner for point-and-shoot nostalgia.'
        ],
        practicalTip: 'Add "fluorescent overhead mall fixture glow" to replicate unretouched ambient realism.',
        modelRecommended: 'Midjourney v6.1 / DALL-E 3',
        aspectRatio: '4:3',
        categorySlug: 'retro-vintage',
        style: 'Environmental Candid',
        useCase: 'Lifestyle Storytelling',
        version: 1,
        imageBrief: 'Tiled mall corridor, brass railings, paper shopping bags, big hair.',
        tags: ['Mall', 'Candid', 'Fashion'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: `gen-p-4`,
        slug: `${slug}-vhs-basement`,
        number: 4,
        title: 'VHS Camcorder Basement Living Room',
        promptText: `Authentic 1984 home video still frame captured on a consumer VHS camcorder, a teenage boy sitting cross-legged on a shag carpet in a wood-paneled basement living room holding a silver cassette boombox, wearing a retro red-and-white striped ringer t-shirt and light blue jeans, tube television and vintage rock band posters on wall, subtle magnetic tape tracking noise, horizontal color bleed, glowing CRT phosphor bloom, OSD timestamp "OCT 26 1984" in white block letters --ar 4:3 --v 6.1 --style raw`,
        negativePrompt: 'clean 4K resolution, modern flatscreen TV, minimalist Swedish furniture',
        media: {
          id: `gen-m-4`,
          promptId: `gen-p-4`,
          url: '/images/prompts/80s-retro/prompt-4-vhs-camcorder.jpg',
          altText: '1984 VHS tape camcorder frame of a teen with boombox in basement',
          status: 'READY' as ImageStatus,
          width: 1200,
          height: 900,
          aspectRatio: '4:3'
        },
        howToUse: [
          'Request analog defects: magnetic video tracking lines, chromatic blur, tape bleed.',
          'Use nostalgic domestic textures: wood paneling, shag carpeting, rabbit-ear TV.',
          'Specify an exact white on-screen display (OSD) date string.'
        ],
        practicalTip: 'In Flux, prompt for "soft analog resolution with CRT phosphor bleed" rather than digital noise.',
        modelRecommended: 'Flux.1 Dev / Midjourney v6.1',
        aspectRatio: '4:3',
        categorySlug: 'retro-vintage',
        style: 'Low-Fi Video',
        useCase: 'Music Visualizer / Nostalgia',
        version: 1,
        imageBrief: 'Wood-paneled basement, boombox, striped ringer tee, VHS scanlines.',
        tags: ['VHS', 'Nostalgia', 'Video'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: `gen-p-5`,
        slug: `${slug}-street-fashion`,
        number: 5,
        title: 'Retro NYC Street Fashion & Sports Car',
        promptText: `Candid 1987 street style photography in New York City, a confident young woman leaning casually against a classic red sports car parked beside a cobblestone sidewalk, wearing a vintage worn-in black leather bomber jacket over high-waisted acid-wash denim jeans and canvas high-top sneakers, dark wayfarer sunglasses, golden hour side lighting, yellow Checker cab and classic storefronts in background, authentic Kodachrome 64 grain, 35mm lens --ar 4:3 --v 6.1`,
        negativePrompt: 'modern cars, smartphone, modern high-rise architecture, smooth 3D render',
        media: {
          id: `gen-m-5`,
          promptId: `gen-p-5`,
          url: '/images/prompts/80s-retro/prompt-5-street-fashion.jpg',
          altText: 'Young woman in leather bomber leaning against a red classic car',
          status: 'READY' as ImageStatus,
          width: 1200,
          height: 900,
          aspectRatio: '4:3'
        },
        howToUse: [
          'Pair the model with an era-defining prop: vintage sports car or yellow Checker cab.',
          'Describe specific eyewear and footwear: "Ray-Ban wayfarer sunglasses".',
          'Use "Kodachrome 64" to trigger rich red saturation and deep blacks.'
        ],
        practicalTip: 'Mention "worn-in vintage leather patina" so garments look lived-in rather than plastic.',
        modelRecommended: 'Midjourney v6.1 / Flux.1 Pro',
        aspectRatio: '4:3',
        categorySlug: 'retro-vintage',
        style: 'Street Documentary',
        useCase: 'Fashion Editorial',
        version: 1,
        imageBrief: 'Cobblestone sidewalk, red sports car, worn leather jacket, golden hour.',
        tags: ['Street Style', 'Kodachrome', 'Fashion'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: `gen-p-6`,
        slug: `${slug}-high-fashion-editorial`,
        number: 6,
        title: 'Dramatic High-Fashion Power Suit Editorial',
        promptText: `Dramatic 1988 high-fashion magazine editorial portrait, statuesque female model with sculpted teased updo hairstyle, bold matte crimson red lipstick, oversized geometric gold-and-black enamel earrings, tailored double-breasted black power suit with exaggerated structured shoulder pads, hand gently touching chin, stark minimalist charcoal canvas backdrop, dramatic Rembrandt key light with warm amber rim light, medium format film grain, Vogue October 1988 cover photography style --ar 4:3 --v 6.1 --style raw`,
        negativePrompt: 'slouchy streetwear, pastel casual colors, blown-out highlights, modern beauty filter',
        media: {
          id: `gen-m-6`,
          promptId: `gen-p-6`,
          url: '/images/prompts/80s-retro/prompt-6-magazine-editorial.jpg',
          altText: 'High-fashion model in sharp black power suit with geometric earrings',
          status: 'READY' as ImageStatus,
          width: 1200,
          height: 900,
          aspectRatio: '4:3'
        },
        howToUse: [
          'Emphasize sharp silhouettes: exaggerated shoulder pads and geometric jewelry.',
          'Specify "sculpted hair updo" and "bold matte red lipstick".',
          'Combine Rembrandt studio key light with amber rim separation.'
        ],
        practicalTip: 'Request "medium format Hasselblad 500C portrait" to get high micro-contrast and rich skin tones.',
        modelRecommended: 'Midjourney v6.1 / Flux.1 Dev',
        aspectRatio: '4:3',
        categorySlug: 'retro-vintage',
        style: 'High Fashion Studio',
        useCase: 'Magazine Cover Mockup',
        version: 1,
        imageBrief: 'Sharp black power shoulders, sculpted updo, geometric gold earrings, charcoal backdrop.',
        tags: ['Editorial', 'Power Dressing', 'Vogue'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: `gen-p-7`,
        slug: `${slug}-polaroid-snapshot`,
        number: 7,
        title: 'Polaroid Instant Friends Sunset Memory',
        promptText: `Authentic 1983 Polaroid instant film photo of three laughing teenage friends sitting on the hood of an old blue sedan at sunset, genuine smiles and candid joy, vintage graphic MTV t-shirt, yellow striped tee and denim shorts, messy windswept hair, vibrant golden sunset sky over distant rolling hills, classic direct on-camera flash illumination, authentic white Polaroid instant film border, slight color shift with faded cyan and warm magenta emulsion tone, nostalgic handwritten "Summer '83" caption at bottom border --ar 4:3 --v 6.1`,
        negativePrompt: 'posed corporate smiling, clean digital image, studio softboxes, modern SUVs',
        media: {
          id: `gen-m-7`,
          promptId: `gen-p-7`,
          url: '/images/prompts/80s-retro/prompt-7-polaroid-friends.jpg',
          altText: 'Three laughing friends on the hood of an old car in an instant polaroid photo',
          status: 'READY' as ImageStatus,
          width: 1200,
          height: 900,
          aspectRatio: '4:3'
        },
        howToUse: [
          'Prompt for multiple subjects sharing genuine interaction and unforced joy.',
          'Include signature instant film features: direct flash falloff and dark vignetting.',
          'The white instant film border with handwritten summer date frames the story.'
        ],
        practicalTip: 'Add "slight cyan/magenta color shift on chemical emulsion border" for authenticity.',
        modelRecommended: 'Midjourney v6.1 / DALL-E 3',
        aspectRatio: '4:3',
        categorySlug: 'retro-vintage',
        style: 'Instant Polaroid',
        useCase: 'Personal Memory Scrapbook',
        version: 1,
        imageBrief: 'Three friends on car hood, golden sunset, direct flash, white instant frame.',
        tags: ['Polaroid', 'Friends', 'Summer 83'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ].slice(0, count);

    return {
      id: `art-${slug}`,
      slug: slug,
      title: `${count} Best ${config.topic}`,
      subtitle: `Master exact prompts, camera simulations, and styling for authentic ${config.topic.toLowerCase()} aesthetics.`,
      metaTitle: `${count} Best ${config.topic} (With Real Examples & Step-by-Step Tips)`,
      metaDescription: `Discover the top ${count} ${config.topic.toLowerCase()} with tested prompts, camera settings, and troubleshooting for Midjourney & Flux.`,
      searchIntent: config.searchIntent,
      targetQuery: config.topic.toLowerCase(),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastReviewedAt: new Date().toISOString(),
      sourceTrendId: config.sourceTrendId || 'trend-80s-retro',
      trendStatus: 'TRENDING',
      author: {
        name: 'Elena Vance',
        role: 'Visual Prompt Architect',
        avatarUrl: '/images/prompts/80s-retro/prompt-1-studio-portrait.jpg'
      },
      featuredMedia: {
        id: `art-cov-${slug}`,
        url: '/images/prompts/80s-retro/cover.jpg',
        altText: `${config.topic} Curated Collection Cover`,
        width: 1280,
        height: 720,
        status: 'READY',
        caption: `A curated collection of tested ${config.topic.toLowerCase()} prompts.`
      },
      categorySlug: 'retro-vintage',
      categoryName: 'Retro & Vintage',
      readingTimeMinutes: 7,
      introduction: [
        `Creating authentic ${config.topic.toLowerCase()} in modern AI tools often suffers from common pitfalls: synthetic plastic skin, contemporary background intrusions, and generic oversaturation.`,
        `To recreate genuine visual memory, prompt engineering must guide the model with period-accurate photographic optics, tactile fabrics, and era-specific lighting techniques.`,
        `Here are ${count} thoroughly tested, genuinely distinct prompts designed to work reliably across Midjourney, Flux, and Stable Diffusion.`
      ],
      quickOverviewHeading: `Quick Overview: The ${count} Prompts`,
      prompts,
      howToGetBetterResults: {
        title: `How to Get Better Results with ${config.topic}`,
        points: [
          {
            headline: '1. Specify Authentic Film Emulsions',
            description: 'Name real photographic film stocks (e.g., Kodachrome 64, Kodak Portra 400, Fujichrome Provia) to replace digital sensor sharpness with organic grain and period-appropriate color saturation.'
          },
          {
            headline: '2. Enforce Physical Optical Imperfections',
            description: 'Include physical optical terms like "soft-focus diffusion filter", "warm halation", and "35mm grain" to eliminate plastic rendering.'
          },
          {
            headline: '3. Anchor the Wardrobe with Tactile Fabrics',
            description: 'AI easily confuses eras unless you specify concrete textures like acid-wash denim, pastel cable-knits, or sharp structured wool.'
          },
          {
            headline: '4. Choose 4:3 or 5:4 Ratios',
            description: 'Aspect ratios matter: wide modern 16:9 formats trigger contemporary cinematic training data, while 4:3 matches classic prints.'
          }
        ]
      },
      practicalTips: [
        {
          headline: 'Disable Engine Polish with Raw Modes',
          description: 'Always append `--style raw` in Midjourney or prompt for "unretouched skin pores" in Flux to avoid beauty-filter smoothness.'
        },
        {
          headline: 'Use Exact Background Props',
          description: 'Specify background anchors like "brass mall handrails" or "vintage CRT television" to enforce setting consistency.'
        },
        {
          headline: 'Add Subtle Digital Date Stamps',
          description: 'Adding a "red LED date stamp \'OCT 14 1986\'" signals the model to emulate vintage consumer camera firmware.'
        },
        {
          headline: 'Control the Flash Technique',
          description: 'Contrast soft studio strobes with direct on-camera flash falloff depending on whether you want glamour or candid memory.'
        }
      ],
      troubleshooting: [
        {
          issue: 'Skin looks like smooth plastic or a 3D video game character',
          solution: 'Remove words like "photorealistic" or "ultra-detailed". Add "organic skin pores, natural imperfections, 35mm grain" and put "plastic skin, CGI render" in negative prompt.'
        },
        {
          issue: 'Modern cars, smartphones, or contemporary buildings appear in background',
          solution: 'Explicitly define background elements (yellow Checker cab, boxy 80s sedan) and add "smartphone, contemporary cars" to negative prompt.'
        },
        {
          issue: 'Image turns into futuristic cyberpunk instead of authentic retro',
          solution: 'Replace generic "neon lights" with specific "coin-operated arcade cabinet glow" or "soft fluorescent mall fixtures".'
        },
        {
          issue: 'Colors appear washed out or flat',
          solution: 'Specify "Kodachrome 64 saturation" and pair with direct strobe flash to give signature color pop.'
        }
      ],
      faqs: [
        {
          id: 'faq-gen-1',
          question: `Which AI model works best for ${config.topic.toLowerCase()}?`,
          answer: 'Both Midjourney v6.1 (with `--style raw`) and Flux.1 Dev provide the highest fidelity for analog emulation, character consistency, and authentic period color grading.'
        },
        {
          id: 'faq-gen-2',
          question: 'Can I use these prompts in image-to-image with my personal photos?',
          answer: 'Yes. In Midjourney, upload your reference image and append the prompt with `--iw 1.2`. In Flux or Stable Diffusion, use ControlNet (Depth or OpenPose) for facial likeness.'
        },
        {
          id: 'faq-gen-3',
          question: 'Why do aspect ratios matter so much for retro prompts?',
          answer: 'Modern 16:9 widescreen triggers contemporary cinematic training weights. 4:3, 3:2, and 1:1 match vintage 35mm frames, medium format negatives, and CRT television broadcasts.'
        },
        {
          id: 'faq-gen-4',
          question: 'Are negative prompts necessary for authentic results?',
          answer: 'Yes. Modern models have an inherent bias toward glossy sharpness. Negative prompting for "modern digital photo, smartphone selfie, 3D render, plastic skin" is highly effective.'
        },
        {
          id: 'faq-gen-5',
          question: 'How do I recreate the Polaroid instant film border?',
          answer: 'Add "authentic white Polaroid instant film border with handwritten summer date caption" to your prompt text, and consider using a 1:1 or 4:5 aspect ratio.'
        }
      ],
      relatedArticles: [
        {
          id: 'art-related-vintage-film',
          title: 'Vintage Film Photo Prompts: 35mm, Kodachrome & Grain',
          slug: 'vintage-film-photo-prompts',
          description: 'Master the warm organic warmth of 1970s and 1980s 35mm film cameras.',
          media: {
            id: 'media-rel-1',
            url: '/images/articles/vintage-film.jpg',
            altText: 'Vintage 35mm film photography of a woman in a sunlit meadow'
          },
          categoryName: 'Film & Analog',
          publishedAt: '2026-09-08T10:00:00Z'
        },
        {
          id: 'art-related-y2k',
          title: 'Y2K Photo Prompts: Early 2000s Digicam Aesthetic',
          slug: 'y2k-photo-prompts',
          description: 'Recreate direct-flash compact digital cameras and early millennium pop culture nostalgia.',
          media: {
            id: 'media-rel-2',
            url: '/images/articles/y2k-photo.jpg',
            altText: 'Y2K compact digicam snapshot with butterfly clips and silver puffer'
          },
          categoryName: 'Retro & Vintage',
          publishedAt: '2026-09-05T14:00:00Z'
        }
      ],
      internalLinkSuggestions: [
        {
          id: 'link-sug-1',
          targetArticleTitle: 'Vintage Film Photo Prompts: 35mm, Kodachrome & Grain',
          targetSlug: 'vintage-film-photo-prompts',
          categoryName: 'Film & Analog',
          reason: 'Related analog emulsion topic within the same visual era cluster',
          accepted: true
        },
        {
          id: 'link-sug-2',
          targetArticleTitle: 'Y2K Photo Prompts: Early 2000s Digicam Aesthetic',
          targetSlug: 'y2k-photo-prompts',
          categoryName: 'Retro & Vintage',
          reason: 'Adjacent generational nostalgia topic for cross-linking',
          accepted: false
        }
      ]
    };
  }
}

export const defaultAITextProvider = new MockAITextProvider();
