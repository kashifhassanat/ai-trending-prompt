import { Article } from '@/lib/types';
import { RETRO_80S_PROMPTS } from './prompts-data';

export const ARTICLE_80S_RETRO: Article = {
  id: 'art-80s-retro-photo-prompts',
  slug: '80s-retro-photo-prompts',
  title: '7 Best 80s Retro AI Photo Prompts',
  subtitle: 'From soft-focus glamour portraits to neon-lit arcades and candid mall snapshots — master the exact prompts, camera simulations, and styling for authentic 1980s nostalgia.',
  metaTitle: '7 Best 80s Retro AI Photo Prompts (With Real Examples & Tips)',
  metaDescription: 'Discover the 7 best 80s retro AI photo prompts with real generated examples, copy-paste prompts, camera settings, and troubleshooting for Midjourney & Flux.',
  publishedAt: '2026-09-12T08:00:00Z',
  updatedAt: '2026-09-13T12:00:00Z',
  author: {
    name: 'Elena Vance',
    role: 'Visual Prompt Architect',
    avatarUrl: '/images/prompts/80s-retro/prompt-1-studio-portrait.jpg'
  },
  featuredMedia: {
    id: 'media-80s-cover',
    url: '/images/prompts/80s-retro/cover.jpg',
    altText: 'Collection of 80s retro lifestyle items, cassette tape, polaroid camera, and vintage magazine cover',
    width: 1280,
    height: 720,
    caption: '1980s photography defined a tactile era of analog grain, flash falloff, and bold cultural aesthetics.'
  },
  categorySlug: 'retro-vintage',
  categoryName: 'Retro & Vintage',
  readingTimeMinutes: 7,
  introduction: [
    'The 1980s was one of the most visually distinctive decades in photographic history. Characterized by the warm color saturation of Kodak film, soft diffusion filters in portrait studios, direct on-camera flashes at night, and the emergence of home VHS video, this era holds a powerful nostalgic pull.',
    'However, prompting modern AI models like Midjourney v6 or Flux for 1980s imagery often yields generic synthwave neon grids or hyper-smooth digital faces that feel undeniably synthetic. To achieve genuine authenticity, you need to prompt for specific physical optics, lighting setups, wardrobe textures, and film stock behaviors.',
    'Below are 7 meticulously tested, genuinely distinct 80s retro AI photo prompts — each paired with a dedicated example image, step-by-step instructions, and practical tips you can copy and test immediately.'
  ],
  quickOverviewHeading: 'Quick Overview: The 7 Prompts',
  prompts: RETRO_80S_PROMPTS,
  howToGetBetterResults: {
    title: 'How to Get Better 80s Retro AI Photos',
    points: [
      {
        headline: '1. Specify Analog Film Stocks',
        description: 'Instead of simply writing "vintage photo", name real 1980s film emulsions. Prompting for "Kodachrome 64" delivers deep warm reds and saturated blues; "Kodak Portra 400" creates flattering, warm portrait tones; and "Fujichrome Provia" brings punchy high contrast.'
      },
      {
        headline: '2. Emulate Period Optical Imperfections',
        description: 'Modern AI defaults to clinically sharp 4K digital sensors. Counteract this by adding optical terms: "soft-focus diffusion filter", "subtle chromatic aberration", "warm halation around light sources", and "35mm analog grain".'
      },
      {
        headline: '3. Anchor the Wardrobe with Tactile Fabrics',
        description: 'AI easily confuses decades unless you anchor specific garments: "acid-wash denim", "oversized cable-knit pastel sweater", "velour track jacket", "double-breasted power suit with structured shoulder pads", and "canvas high-top sneakers".'
      },
      {
        headline: '4. Control the Lighting Technique',
        description: 'The 80s relied heavily on two contrasting lighting styles: soft diffused studio strobe lighting with canvas painted backdrops, or harsh direct on-camera flash with sharp drop shadows for candid night shots.'
      }
    ]
  },
  practicalTips: [
    {
      headline: 'Always Lower the Modern Polish',
      description: 'In Midjourney, append `--style raw` to disengage the hyper-polished default engine aesthetic. In Flux, explicitly specify "subtle film grain, organic skin pores, unretouched texture".'
    },
    {
      headline: 'Use Aspect Ratios 4:3 or 5:4',
      description: 'Modern 16:9 widescreen or 9:16 vertical feels contemporary. Analog photographic prints and CRT screens in the 1980s were predominantly 4:3 or 5:4. Ratios dramatically influence composition.'
    },
    {
      headline: 'Specify Concrete Background Details',
      description: 'Don\'t leave the environment ambiguous. Use concrete background anchors like "brass mall handrails", "CRT tube television with rabbit ears", or "wood-paneled basement walls" to enforce era accuracy.'
    },
    {
      headline: 'Add Subtle Digital Timestamps',
      description: 'Phrases like "subtle red digital LED date stamp \'OCT 14 1986\' in bottom right corner" or "white OSD camcorder font" trigger models into replicating domestic camera firmware from that era.'
    }
  ],
  troubleshooting: [
    {
      issue: 'The skin looks like smooth plastic or a 3D video game character',
      solution: 'Remove words like "photorealistic", "ultra-detailed", or "8K". Add "organic skin pores, natural imperfections, 35mm grain, unretouched analog capture" and use negative prompts for "plastic skin, CGI render, digital smoothing".'
    },
    {
      issue: 'The image defaults to futuristic cyberpunk instead of authentic 80s',
      solution: 'Replace generic "neon lights" with specific "1980s coin-operated arcade cabinets" or "soft fluorescent mall lighting". Avoid terms like "cyber", "futuristic", or "hologram".'
    },
    {
      issue: 'Modern cars, smartphones, or contemporary buildings appear in backgrounds',
      solution: 'Explicitly describe foreground and background props: "yellow Checker cab, 1980s boxy sedan, payphone on wall". Add "smartphone, modern automobile, contemporary skyline" into your negative prompt.'
    },
    {
      issue: 'Colors are too muted or washed out',
      solution: 'Specify "Kodachrome 64 color saturation" or "rich warm amber tones". Contrast this with direct strobe flash to give the pigments that signature pop.'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Which AI model works best for 80s retro photo prompts?',
      answer: 'Both Midjourney v6.1 (with `--style raw`) and Flux.1 Dev excel at 80s retro aesthetics. Midjourney produces unmatched analog color grading and period wardrobe accuracy, while Flux is exceptional at photorealistic skin textures, hand anatomy, and rendering on-screen timestamps.'
    },
    {
      id: 'faq-2',
      question: 'How do I avoid the generic purple/cyan synthwave look?',
      answer: 'Avoid terms like "synthwave", "retrowave", or "outrun". Instead, specify real physical environments such as "1980s suburban shopping mall with brass railings", "wood-paneled basement with shag carpet", or "daylight street photography on Kodachrome 64".'
    },
    {
      id: 'faq-3',
      question: 'Can I use these prompts with my own personal photo in image-to-image?',
      answer: 'Yes! In Midjourney, upload your portrait and use its image URL followed by the prompt with an image weight like `--iw 1.2`. In Stable Diffusion or Flux workflows, use ControlNet (OpenPose or Depth) along with these prompt descriptions to retain your facial likeness while applying the 80s analog styling.'
    },
    {
      id: 'faq-4',
      question: 'Why do aspect ratios matter so much for retro prompts?',
      answer: 'Because wide aspect ratios like 16:9 trigger contemporary cinematic training data. Using 4:3, 3:2, or 1:1 aligns the model with vintage 35mm film negatives, medium format cameras, Polaroid prints, and 4:3 analog television broadcasts from the decade.'
    },
    {
      id: 'faq-5',
      question: 'Are negative prompts necessary for achieving authentic results?',
      answer: 'Yes, negative prompts are crucial for suppressing modern AI biases. We recommend including "modern digital photo, smartphone selfie, 3D render, plastic skin, HDR sharpening, contemporary cars" in your negative prompt field or parameter.'
    }
  ],
  relatedArticles: [
    {
      id: 'art-related-vintage-film',
      title: 'Vintage Film Photo Prompts: 35mm, Kodachrome & Grain',
      slug: 'vintage-film-photo-prompts',
      description: 'Master the warm organic warmth of 1970s and 1980s 35mm film cameras with exact emulsion formulas.',
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
      description: 'Recreate direct-flash compact digital cameras, metallic puffer coats, and early millennium pop culture nostalgia.',
      media: {
        id: 'media-rel-2',
        url: '/images/articles/y2k-photo.jpg',
        altText: 'Y2K compact digicam snapshot with butterfly clips and silver puffer'
      },
      categoryName: 'Retro & Vintage',
      publishedAt: '2026-09-05T14:00:00Z'
    },
    {
      id: 'art-related-cinematic',
      title: 'Cinematic Photo Prompts: Hollywood Lighting & Color',
      slug: 'cinematic-photo-prompts',
      description: 'Elevate your prompts with anamorphic aspect ratios, blue hour tungsten lighting, and moody movie stillness.',
      media: {
        id: 'media-rel-3',
        url: '/images/articles/cinematic-photo.jpg',
        altText: 'Cinematic wide film still of a figure on a rainy bridge at night'
      },
      categoryName: 'Cinematic Stills',
      publishedAt: '2026-08-29T11:00:00Z'
    },
    {
      id: 'art-related-polaroid',
      title: 'Polaroid Photo Prompts: Authentic Instant Film Chemistry',
      slug: 'polaroid-photo-prompts',
      description: 'Capture candid flash falloff, square white borders, and emotional candid storytelling with instant film aesthetics.',
      media: {
        id: 'media-rel-4',
        url: '/images/articles/polaroid-photo.jpg',
        altText: 'Arrangement of authentic polaroid instant photos on rustic wood'
      },
      categoryName: 'Analog & Polaroid',
      publishedAt: '2026-08-22T09:30:00Z'
    }
  ]
};

export const ALL_ARTICLES: Article[] = [ARTICLE_80S_RETRO];
