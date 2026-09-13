import { Prompt } from '@/lib/types';

export const RETRO_80S_PROMPTS: Prompt[] = [
  {
    id: 'prompt-80s-1',
    slug: 'classic-80s-studio-portrait',
    number: 1,
    title: 'Classic 80s Studio Glamour Portrait',
    promptText: 'Authentic 1980s studio portrait of a woman with voluminous feathered hair, warm soft-focus diffusion filter, airbrushed dusty rose and lilac canvas backdrop, wearing an oversized pastel knit cardigan sweater, delicate gold stud earrings, gentle smile, genuine Kodak Portra 35mm film grain, 1985 year aesthetic --ar 4:3 --v 6.1 --style raw',
    negativePrompt: 'modern digital look, hyper-clean 3D render, HDR sharpening, oversaturated neon, smartphone camera look',
    media: {
      id: 'media-80s-1',
      url: '/images/prompts/80s-retro/prompt-1-studio-portrait.jpg',
      altText: 'Authentic 1980s studio portrait of a woman with voluminous feathered hair and soft dusty rose backdrop',
      aspectRatio: '4:3',
      caption: 'Example 1: Studio portrait with characteristic feathered hair and airbrushed canvas backdrop.'
    },
    howToUse: [
      'Set aspect ratio to 4:3 or 5:4 to emulate classic analog print ratios.',
      'Specify clothing textures such as "oversized pastel knit" or "velour collar" for era accuracy.',
      'Use prompt modifiers like "soft-focus diffusion filter" to soften modern hyper-sharp digital edges.'
    ],
    practicalTip: 'Specify "Kodak Portra 400 film grain, soft-focus diffusion, unretouched skin pores" to avoid plastic-looking skin across generators.',
    recommendedTools: ['gemini', 'chatgpt', 'flux', 'midjourney'],
    compatibleTools: ['stable-diffusion', 'dall-e'],
    toolSpecificNotes: [
      {
        toolId: 'gemini',
        toolName: 'Google Gemini',
        note: 'Paste prompt into Gemini (Imagen 3). Imagen 3 excels at soft fabric textures (knit sweaters) and natural skin warmth without requiring custom CLI flags.'
      },
      {
        toolId: 'chatgpt',
        toolName: 'ChatGPT',
        note: 'Instruct ChatGPT to generate via DALL·E 3 with explicit instruction: "Render as an authentic 1985 analog photograph with soft diffusion, not a modern digital illustration".'
      },
      {
        toolId: 'flux',
        toolName: 'Flux',
        note: 'In Flux.1 Dev, request "35mm analog film scan, soft optical halation, natural hair flyaways". Flux produces ultra-realistic anatomical details and natural hair volume.'
      },
      {
        toolId: 'midjourney',
        toolName: 'Midjourney',
        note: 'Use parameters "--ar 4:3 --v 6.1 --style raw" to disengage the hyper-saturated default digital sheen and capture authentic 1985 salon tones.'
      }
    ],
    modelRecommended: 'Leading AI creation tools (Gemini, ChatGPT, Flux, Midjourney)',
    aspectRatio: '4:3',
    categorySlug: 'retro-vintage',
    tags: ['80s', 'Studio Portrait', 'Glamour', 'Analog Film'],
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-09-13T20:00:00Z'
  },
  {
    id: 'prompt-80s-2',
    slug: 'neon-arcade-night-portrait',
    number: 2,
    title: 'Neon Arcade Night Portrait',
    promptText: 'Candid 1985 portrait of a young man inside a dimly lit retro arcade, electric magenta and cyan neon illumination reflecting across his face and hands, wearing a vintage washed denim jacket adorned with enamel pins and an MTV patch, arcade cabinet glowing screen in foreground, moody ambient atmosphere, authentic 35mm film grain, cinematic depth of field --ar 4:3 --v 6.1 --style raw',
    negativePrompt: 'overly dark shadows, plastic skin, CGI glow effects, modern flat-screen monitors, clean LED bars',
    media: {
      id: 'media-80s-2',
      url: '/images/prompts/80s-retro/prompt-2-neon-arcade.jpg',
      altText: 'Young man in a denim jacket with pins inside an authentic 1980s neon arcade cabinet room',
      aspectRatio: '4:3',
      caption: 'Example 2: Dynamic neon bounce light combined with heavy tactile denim textures.'
    },
    howToUse: [
      'Prompt for two complementary neon colors (e.g., magenta and electric cyan) to create dimensional rim lighting.',
      'Anchor the setting with period-specific details like "arcade cabinet joystick", "CRT scanlines", and "enamel lapel pins".',
      'Keep subject expression relaxed and authentic rather than overly posed.'
    ],
    practicalTip: 'Avoid using generic words like "futuristic neon"; instead, explicitly say "1980s coin-op arcade neon tubes" to prevent generating modern synthwave or cyberpunk aesthetics.',
    recommendedTools: ['gemini', 'chatgpt', 'flux', 'midjourney'],
    compatibleTools: ['stable-diffusion', 'dall-e'],
    toolSpecificNotes: [
      {
        toolId: 'gemini',
        toolName: 'Google Gemini',
        note: 'Gemini handles the dark interior lighting and neon bounce reflection cleanly. Emphasize "dimly lit coin-op arcade with CRT glow".'
      },
      {
        toolId: 'chatgpt',
        toolName: 'ChatGPT',
        note: 'Remind ChatGPT to keep the CRT monitor curved and vintage with scanlines, rather than generating modern flat LCD screens.'
      },
      {
        toolId: 'flux',
        toolName: 'Flux',
        note: 'Flux renders realistic denim fabric weaves and pin badges with sharp physical fidelity. Use guidance scale 3.5 for optimal balance.'
      },
      {
        toolId: 'midjourney',
        toolName: 'Midjourney',
        note: 'Use "--style raw --c 5" to keep neon rim lights subtle and prevent overly stylized chromatic blooms.'
      }
    ],
    modelRecommended: 'Leading AI creation tools (Gemini, ChatGPT, Flux, Midjourney)',
    aspectRatio: '4:3',
    categorySlug: 'retro-vintage',
    tags: ['80s', 'Arcade', 'Neon', 'Streetwear'],
    createdAt: '2026-09-10T10:15:00Z',
    updatedAt: '2026-09-13T20:00:00Z'
  },
  {
    id: 'prompt-80s-3',
    slug: 'authentic-80s-mall-candid',
    number: 3,
    title: 'Authentic 80s Shopping Mall Candid',
    promptText: 'Candid full-body snapshot of two stylish teenage best friends walking through a bustling suburban American shopping mall in 1986, teasing feathered bangs, stone-washed denim jeans and oversized color-blocked sweatshirts, holding paper shopping bags, brass handrails and indoor ficus plants in background, illuminated neon storefront signs, natural overhead fluorescent mall glow, authentic 1986 Kodak Kodacolor print aesthetic, subtle red digital date stamp in corner --ar 4:3 --v 6.1',
    negativePrompt: 'modern minimalist mall architecture, smartphone in hand, high-definition digital sensor look, flat lighting',
    media: {
      id: 'media-80s-3',
      url: '/images/prompts/80s-retro/prompt-3-mall-glamour.jpg',
      altText: 'Two stylish 1980s teenage girls walking through an authentic shopping mall with neon storefronts and brass railings',
      aspectRatio: '4:3',
      caption: 'Example 3: Environmental storytelling with architectural 80s mall elements and paper shopping bags.'
    },
    howToUse: [
      'Describe both architectural props (tiled mall floors, brass railings, neon signage) and wardrobe elements.',
      'Specify "stone-washed denim" and "slouchy socks with white sneakers" for unmistakable 1986 styling.',
      'Add "subtle red digital date stamp in bottom right corner" for genuine analog point-and-shoot realism.'
    ],
    practicalTip: 'Mentioning background store types like "record store", "neon boutique", or "arcade corridor" will automatically contextualize the architectural elements without generic modern glass structures.',
    recommendedTools: ['gemini', 'chatgpt', 'flux', 'midjourney'],
    compatibleTools: ['stable-diffusion', 'dall-e'],
    toolSpecificNotes: [
      {
        toolId: 'gemini',
        toolName: 'Google Gemini',
        note: 'Gemini captures the natural group composition and authentic nostalgic facial interactions without artificial stiff poses.'
      },
      {
        toolId: 'chatgpt',
        toolName: 'ChatGPT',
        note: 'Emphasize "paper shopping bags with bold 80s geometric graphic patterns" so DALL·E does not generate contemporary canvas totes.'
      },
      {
        toolId: 'flux',
        toolName: 'Flux',
        note: 'Flux excels at rendering the red digital LED date stamp ("\'86 10 14") in the corner with clean alphanumeric clarity.'
      },
      {
        toolId: 'midjourney',
        toolName: 'Midjourney',
        note: 'Add "--ar 4:3 --v 6.1" to capture the architectural scale of the multi-level mall atrium and brass banisters.'
      }
    ],
    modelRecommended: 'Leading AI creation tools (Gemini, ChatGPT, Flux, Midjourney)',
    aspectRatio: '4:3',
    categorySlug: 'retro-vintage',
    tags: ['80s', 'Mall Culture', 'Candid', 'Fashion'],
    createdAt: '2026-09-10T10:30:00Z',
    updatedAt: '2026-09-13T20:00:00Z'
  },
  {
    id: 'prompt-80s-4',
    slug: 'vhs-camcorder-living-room',
    number: 4,
    title: 'VHS Camcorder Basement Snapshot',
    promptText: 'Authentic 1984 home video still frame captured on a consumer VHS camcorder, a teenage boy sitting cross-legged on a shag carpet in a wood-paneled basement living room holding a silver cassette boombox, wearing a retro red-and-white striped ringer t-shirt and light blue jeans, tube television and vintage rock band posters on wall, subtle magnetic tape tracking noise, horizontal color bleed, glowing CRT phosphor bloom, OSD timestamp "OCT 26 1984" in white block letters --ar 4:3 --v 6.1 --style raw',
    negativePrompt: 'crystal clear 4K resolution, modern flat screen TV, sleek furniture, high dynamic range rendering',
    media: {
      id: 'media-80s-4',
      url: '/images/prompts/80s-retro/prompt-4-vhs-camcorder.jpg',
      altText: '1984 VHS camcorder screenshot of a teenager with a boombox in a wood-paneled room with CRT television',
      aspectRatio: '4:3',
      caption: 'Example 4: Low-fi analog home video warmth with phosphor glow and authentic wood paneling.'
    },
    howToUse: [
      'Include physical analog artifacts like "subtle tape tracking noise", "chromatic aberration", and "phosphor bloom".',
      'Use classic 1980s domestic interior cues: "wood-paneled walls", "brown shag carpet", and "rabbit-ear tube television".',
      'The OSD (on-screen display) date gives an immediate visceral sense of home-recorded memory.'
    ],
    practicalTip: 'If your generator produces too much digital noise instead of analog VHS artifacts, replace "noise" with "magnetic video tape color bleed, soft analog resolution".',
    recommendedTools: ['gemini', 'chatgpt', 'flux', 'midjourney'],
    compatibleTools: ['stable-diffusion', 'dall-e'],
    toolSpecificNotes: [
      {
        toolId: 'gemini',
        toolName: 'Google Gemini',
        note: 'Gemini understands the nuance of "magnetic tape color bleed" and renders realistic cathode ray tube warm glow.'
      },
      {
        toolId: 'chatgpt',
        toolName: 'ChatGPT',
        note: 'Instruct ChatGPT to avoid generating modern OLED screens; specify "boxy wood-grain CRT television cabinet with rotary channel knobs".'
      },
      {
        toolId: 'flux',
        toolName: 'Flux',
        note: 'Flux is unmatched for rendering the exact OSD camcorder text "OCT 26 1984" in monospace block typography.'
      },
      {
        toolId: 'midjourney',
        toolName: 'Midjourney',
        note: 'Use "--style raw" to prevent Midjourney from sharpening magnetic tape blur into digital grain.'
      }
    ],
    modelRecommended: 'Leading AI creation tools (Gemini, ChatGPT, Flux, Midjourney)',
    aspectRatio: '4:3',
    categorySlug: 'retro-vintage',
    tags: ['80s', 'VHS', 'Analog Video', 'Nostalgia'],
    createdAt: '2026-09-10T10:45:00Z',
    updatedAt: '2026-09-13T20:00:00Z'
  },
  {
    id: 'prompt-80s-5',
    slug: 'retro-street-fashion-sports-car',
    number: 5,
    title: 'Retro Street Fashion & Vintage Sports Car',
    promptText: 'Candid 1987 street style photography in New York City, a confident young woman leaning casually against a classic red sports car parked beside a cobblestone sidewalk, wearing a vintage worn-in black leather bomber jacket over high-waisted acid-wash denim jeans and canvas high-top sneakers, dark wayfarer sunglasses, golden hour side lighting, yellow Checker cab and classic storefronts in background, authentic Kodachrome 64 grain, 35mm lens --ar 4:3 --v 6.1',
    negativePrompt: 'contemporary cars, modern LED traffic lights, smartphones, smooth plastic textures, flat overcast lighting',
    media: {
      id: 'media-80s-5',
      url: '/images/prompts/80s-retro/prompt-5-street-fashion.jpg',
      altText: 'Woman in leather bomber jacket leaning on a red vintage sports car on a 1980s city street',
      aspectRatio: '4:3',
      caption: 'Example 5: Golden hour sunlight on textured leather, vintage vehicle, and classic New York street backdrop.'
    },
    howToUse: [
      'Position the subject in interaction with an era vehicle (leaning against the hood or door frame).',
      'Describe specific eyewear and footwear: "Ray-Ban wayfarer sunglasses" and "canvas high-top sneakers".',
      'Use "Kodachrome 64" to achieve warm, saturated reds and deep rich blacks in the shadows.'
    ],
    practicalTip: 'Specify "worn-in vintage leather patina" so the jacket looks authentically loved rather than glossy polyurethane.',
    recommendedTools: ['gemini', 'chatgpt', 'flux', 'midjourney'],
    compatibleTools: ['stable-diffusion', 'dall-e'],
    toolSpecificNotes: [
      {
        toolId: 'gemini',
        toolName: 'Google Gemini',
        note: 'Gemini captures golden hour rim lighting on vehicle chrome and weathered brick facades with organic realism.'
      },
      {
        toolId: 'chatgpt',
        toolName: 'ChatGPT',
        note: 'Ensure you specify "classic boxy 1980s sports coupe with pop-up headlights" to prevent modern curved vehicle shapes.'
      },
      {
        toolId: 'flux',
        toolName: 'Flux',
        note: 'Flux handles the tactile micro-texture of cracked vintage leather and acid-washed denim seams with high fidelity.'
      },
      {
        toolId: 'midjourney',
        toolName: 'Midjourney',
        note: 'Add "--ar 4:3 --c 3" for authentic Kodachrome color science with rich warm reds and balanced shadow contrast.'
      }
    ],
    modelRecommended: 'Leading AI creation tools (Gemini, ChatGPT, Flux, Midjourney)',
    aspectRatio: '4:3',
    categorySlug: 'retro-vintage',
    tags: ['80s', 'Street Style', 'Kodachrome', 'Fashion'],
    createdAt: '2026-09-10T11:00:00Z',
    updatedAt: '2026-09-13T20:00:00Z'
  },
  {
    id: 'prompt-80s-6',
    slug: '80s-high-fashion-editorial',
    number: 6,
    title: '80s High-Fashion Editorial Portrait',
    promptText: 'Dramatic 1988 high-fashion magazine editorial portrait, statuesque female model with sculpted teased updo hairstyle, bold matte crimson red lipstick, oversized geometric gold-and-black enamel earrings, tailored double-breasted black power suit with exaggerated structured shoulder pads, hand gently touching chin, stark minimalist charcoal canvas backdrop, dramatic Rembrandt key light with warm amber rim light, medium format film grain, Vogue October 1988 cover photography style --ar 4:3 --v 6.1 --style raw',
    negativePrompt: 'casual candid look, slouchy streetwear, soft pastel color palette, blown-out highlights, modern Instagram beauty filter',
    media: {
      id: 'media-80s-6',
      url: '/images/prompts/80s-retro/prompt-6-magazine-editorial.jpg',
      altText: 'Statuesque model in structured black power suit with geometric earrings and sculpted hair in 1980s Vogue style',
      aspectRatio: '4:3',
      caption: 'Example 6: Power silhouette, sculptural shoulder pads, and dramatic high-contrast studio lighting.'
    },
    howToUse: [
      'Focus on silhouettes: exaggerated sharp shoulders, geometric accessories, and deliberate hand placement.',
      'Request "sculpted hair updo" and "bold matte red lipstick" for authentic editorial power aesthetic.',
      'Combine "dramatic Rembrandt key light" with "warm amber rim light" for depth and separation from dark backgrounds.'
    ],
    practicalTip: 'Adding "medium format Hasselblad 500C portrait, Fujichrome Provia 100F" produces the rich micro-contrast seen in late-80s luxury print magazines.',
    recommendedTools: ['gemini', 'chatgpt', 'flux', 'midjourney'],
    compatibleTools: ['stable-diffusion', 'dall-e'],
    toolSpecificNotes: [
      {
        toolId: 'gemini',
        toolName: 'Google Gemini',
        note: 'Gemini produces statuesque, elegant studio poses and handles the sharp geometric gold jewelry highlights cleanly.'
      },
      {
        toolId: 'chatgpt',
        toolName: 'ChatGPT',
        note: 'Specify "sculpted sharp shoulder pads with tailored wool drape" to guide DALL·E away from casual loose blazers.'
      },
      {
        toolId: 'flux',
        toolName: 'Flux',
        note: 'Flux renders matte makeup textures and hair strands with high micro-contrast and realistic anatomy.'
      },
      {
        toolId: 'midjourney',
        toolName: 'Midjourney',
        note: 'Apply "--style raw --v 6.1" to ensure dramatic studio shadow falloff without excessive digital glow.'
      }
    ],
    modelRecommended: 'Leading AI creation tools (Gemini, ChatGPT, Flux, Midjourney)',
    aspectRatio: '4:3',
    categorySlug: 'retro-vintage',
    tags: ['80s', 'High Fashion', 'Editorial', 'Power Dressing'],
    createdAt: '2026-09-10T11:15:00Z',
    updatedAt: '2026-09-13T20:00:00Z'
  },
  {
    id: 'prompt-80s-7',
    slug: 'polaroid-sunset-road-trip',
    number: 7,
    title: 'Polaroid Friends Road Trip Snapshot',
    promptText: 'Authentic 1983 Polaroid instant film photo of three laughing teenage friends sitting on the hood of an old blue sedan at sunset, genuine smiles and candid joy, vintage graphic MTV t-shirt, yellow striped tee and denim shorts, messy windswept hair, vibrant golden sunset sky over distant rolling hills, classic direct on-camera flash illumination, authentic white Polaroid instant film border, slight color shift with faded cyan and warm magenta emulsion tone, nostalgic handwritten "Summer \'83" caption at bottom border --ar 4:3 --v 6.1',
    negativePrompt: 'professional corporate smiles, clean digital photo, studio lighting, modern SUVs, smartphone selfies',
    media: {
      id: 'media-80s-7',
      url: '/images/prompts/80s-retro/prompt-7-polaroid-friends.jpg',
      altText: 'Three laughing friends on the hood of a car at sunset captured in an authentic 1983 Polaroid instant photo',
      aspectRatio: '4:3',
      caption: 'Example 7: Instant film chemistry feel with direct flash falloff and pure candid emotion.'
    },
    howToUse: [
      'Prompt for multiple subjects sharing an unforced interactive moment (laughing, looking at each other).',
      'Include the visual signifier "classic direct on-camera flash illumination with dark vignette falloff".',
      'The iconic "white Polaroid instant film border" with a handwritten summer date instantly frames the storytelling.'
    ],
    practicalTip: 'To prevent the AI from generating pristine white borders, add "slightly aged instant film frame with slight color shift at edges" to your prompt.',
    recommendedTools: ['gemini', 'chatgpt', 'flux', 'midjourney'],
    compatibleTools: ['stable-diffusion', 'dall-e'],
    toolSpecificNotes: [
      {
        toolId: 'gemini',
        toolName: 'Google Gemini',
        note: 'Gemini excels at natural interpersonal emotion and warm sunset sky color grading without stiff facial symmetry.'
      },
      {
        toolId: 'chatgpt',
        toolName: 'ChatGPT',
        note: 'Ask ChatGPT to generate with the white instant photo border and nostalgic handwritten marker caption at the bottom margin.'
      },
      {
        toolId: 'flux',
        toolName: 'Flux',
        note: 'Flux renders the chemistry color shift (cyan/magenta fading) and instant film emulsion textures faithfully.'
      },
      {
        toolId: 'midjourney',
        toolName: 'Midjourney',
        note: 'Use "--ar 4:3 --v 6.1" to capture direct on-camera flash falloff against the sunset backdrop.'
      }
    ],
    modelRecommended: 'Leading AI creation tools (Gemini, ChatGPT, Flux, Midjourney)',
    aspectRatio: '4:3',
    categorySlug: 'retro-vintage',
    tags: ['80s', 'Polaroid', 'Friends', 'Summer Nostalgia'],
    createdAt: '2026-09-10T11:30:00Z',
    updatedAt: '2026-09-13T20:00:00Z'
  }
];

export const HOMEPAGE_TRENDING_PROMPTS: Prompt[] = [
  RETRO_80S_PROMPTS[0],
  RETRO_80S_PROMPTS[1],
  RETRO_80S_PROMPTS[2],
  RETRO_80S_PROMPTS[4],
  RETRO_80S_PROMPTS[5],
  RETRO_80S_PROMPTS[6]
];
