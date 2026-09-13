import { AITool, AIToolCategory } from '@/lib/types';

export const AI_TOOLS_REGISTRY: AITool[] = [
  // Primary General-Purpose Creation Tools
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'GENERAL_PURPOSE',
    capabilities: [
      'Multimodal Reasoning',
      'Prompt Expansion & Refinement',
      'Image Generation (Imagen 3)',
      'Creative Conceptualization',
      'Cross-Disciplinary Workflows'
    ],
    status: 'ACTIVE',
    officialUrl: 'https://gemini.google.com',
    notes: 'Primary general-purpose creation tool. Exceptional at creative reasoning, iterative prompt synthesis, and integrated photorealistic image generation via Imagen 3.'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'GENERAL_PURPOSE',
    capabilities: [
      'Conversational Ideation',
      'Prompt Architecture',
      'Image Generation (DALL·E 3)',
      'Style Modulation',
      'Textual Context Generation'
    ],
    status: 'ACTIVE',
    officialUrl: 'https://chatgpt.com',
    notes: 'Primary general-purpose creation tool. Excellent for conversational prompt discovery, prompt parameter translation, and integrated visual ideation.'
  },

  // Supported Visual / Image Tools
  {
    id: 'flux',
    name: 'Flux',
    category: 'IMAGE_GENERATION',
    capabilities: [
      'Photorealistic Textures',
      'Micro Skin Details',
      'Typographic Text Rendering',
      'Complex Prompt Adherence',
      'Analog Grain Emulation'
    ],
    status: 'ACTIVE',
    officialUrl: 'https://blackforestlabs.ai',
    notes: 'Supported modern open-weights/API visual creation tool. Outstanding for realistic skin anatomy, authentic on-screen date stamps, and unretouched textures.'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'IMAGE_GENERATION',
    capabilities: [
      'Stylistic Coherence',
      'Cinematic Color Grading',
      'Analog Emulation (--style raw)',
      'Aspect Ratio Framing',
      'Lighting Dynamics'
    ],
    status: 'ACTIVE',
    officialUrl: 'https://midjourney.com',
    notes: 'Supported visual creation tool. Widely recognized for rich filmic palettes, atmospheric lighting, and high-fidelity period aesthetics.'
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    category: 'IMAGE_GENERATION',
    capabilities: [
      'Local Pipeline Execution',
      'ControlNet Pose & Depth Guidance',
      'Custom LoRA Fine-Tuning',
      'Open-Weights Architecture',
      'High-Resolution Latent Upscaling'
    ],
    status: 'ACTIVE',
    officialUrl: 'https://stability.ai',
    notes: 'Supported visual creation tool. Preferred for advanced creators requiring structural pose control (ControlNet) and customized analog checkpoints.'
  },
  {
    id: 'dall-e',
    name: 'DALL·E',
    category: 'IMAGE_GENERATION',
    capabilities: [
      'Complex Compositional Logic',
      'Surreal & Editorial Framing',
      'Natural Language Understanding',
      'Prompt Literalness'
    ],
    status: 'ACTIVE',
    officialUrl: 'https://openai.com/dall-e-3',
    notes: 'Supported visual creation tool. Ideal for literal prompt compliance and intricate multi-element narrative compositions.'
  },

  // Future AI Video Creation Tool
  {
    id: 'google-flow',
    name: 'Google Flow',
    category: 'VIDEO_GENERATION',
    capabilities: [
      'AI Video Synthesis',
      'Camera Trajectory Motion',
      'Temporal Coherence',
      'Visual Scene Continuity'
    ],
    status: 'FUTURE_PLANNED',
    officialUrl: 'https://deepmind.google/technologies',
    notes: 'Positioned strictly as a future AI Video creation tool. Not treated as a generic image-prompt destination.'
  },

  // Reasoning & Code Tool (Not Primary Image Generation)
  {
    id: 'deepseek',
    name: 'DeepSeek',
    category: 'REASONING_AND_CODE',
    capabilities: [
      'Deep Reasoning',
      'Algorithmic Logic',
      'Prompt Decomposition',
      'Code Generation',
      'Technical Problem Solving'
    ],
    status: 'ACTIVE',
    officialUrl: 'https://deepseek.com',
    notes: 'Positioned for reasoning, logical prompt decomposition, and code generation. Explicitly not positioned as a primary image-generation tool.'
  }
];

export function getAIToolById(id: string): AITool | undefined {
  return AI_TOOLS_REGISTRY.find(t => t.id.toLowerCase() === id.toLowerCase());
}

export function getAIToolsByCategory(category: AIToolCategory): AITool[] {
  return AI_TOOLS_REGISTRY.filter(t => t.category === category);
}

export const PRIMARY_GENERAL_PURPOSE_TOOLS = AI_TOOLS_REGISTRY.filter(
  t => t.category === 'GENERAL_PURPOSE'
);

export const SUPPORTED_VISUAL_TOOLS = AI_TOOLS_REGISTRY.filter(
  t => t.category === 'IMAGE_GENERATION'
);

export const FUTURE_VIDEO_TOOLS = AI_TOOLS_REGISTRY.filter(
  t => t.category === 'VIDEO_GENERATION'
);

export const REASONING_TOOLS = AI_TOOLS_REGISTRY.filter(
  t => t.category === 'REASONING_AND_CODE'
);
