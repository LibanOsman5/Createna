/**
 * Model Router — Hybrid Multi-Provider Architecture
 *
 * Strategy:
 * 1. Direct provider APIs first (cheapest, no markup)
 * 2. Unifically aggregator as fallback (one key, all models)
 *
 * Unifically model IDs verified from docs.unifically.com — July 2026
 */

import { getClient, type ModelId } from "./unifically";

// ═══ Unifically Video Models (verified from docs) ═══
export const VIDEO = {
  // Kling (cheapest, best all-rounder)
  "kuaishou/kling-3.0-video":       { provider: "Kling 3.0",     cost: 0.08, maxDur: 15, tier: "standard" },
  "kuaishou/kling-3.0-turbo-video": { provider: "Kling 3.0 Turbo", cost: 0.06, maxDur: 10, tier: "fast" },
  "kuaishou/kling-2.6-video":       { provider: "Kling 2.6",     cost: 0.05, maxDur: 10, tier: "budget" },

  // Veo (Google — quality leader, expensive)
  "google/veo-3.1-lite":   { provider: "Veo 3.1 Lite",   cost: 0.09, maxDur: 8, tier: "standard" },
  "google/veo-3.1-fast":   { provider: "Veo 3.1 Fast",   cost: 0.15, maxDur: 8, tier: "fast" },
  "google/veo-3.1-quality": { provider: "Veo 3.1 Quality", cost: 0.75, maxDur: 8, tier: "premium" },

  // Hailuo (Minimax — budget alternative)
  "hailuo/minimax-2.3-fast": { provider: "Hailuo 2.3 Fast", cost: 0.07, maxDur: 6, tier: "fast" },
  "hailuo/minimax-2.3":      { provider: "Hailuo 2.3",      cost: 0.10, maxDur: 10, tier: "standard" },
} as const;

// ═══ Unifically Image Models (verified from docs) ═══
export const IMAGE = {
  "black-forest-labs/flux.2-klein": { provider: "Flux.2 Klein", cost: 0.01, tier: "budget" },
  "kuaishou/kling-o1-image":        { provider: "Kling O1 Image", cost: 0.02, tier: "budget" },
  "google/nano-banana":             { provider: "Nano Banana",  cost: 0.025, tier: "standard" },
  "black-forest-labs/flux.2-flex":  { provider: "Flux.2 Flex",  cost: 0.025, tier: "standard" },
  "openai/gpt-image-2":             { provider: "GPT Image 2",  cost: 0.03, tier: "standard" },
  "google/nano-banana-pro":         { provider: "Nano Banana Pro", cost: 0.035, tier: "pro" },
  "black-forest-labs/flux.2-pro":   { provider: "Flux.2 Pro",   cost: 0.055, tier: "premium" },
} as const;

export type VideoModel = keyof typeof VIDEO;
export type ImageModel = keyof typeof IMAGE;

// ═══ Router ═══════════════════════════════

interface VideoRoute {
  prompt: string;
  duration?: number;
  maxBudget?: number;
  preferSpeed?: boolean;
  useCase?: "product_demo" | "ugc" | "cinematic" | "fast_draft";
}

export function routeVideo(opts: VideoRoute) {
  const { duration = 5, maxBudget = 0.15, preferSpeed, useCase = "product_demo" } = opts;

  // Use-case → preferred models
  const prefs: Record<string, VideoModel[]> = {
    product_demo: ["kuaishou/kling-3.0-video", "google/veo-3.1-fast", "kuaishou/kling-2.6-video"],
    ugc:          ["kuaishou/kling-3.0-video", "kuaishou/kling-3.0-turbo-video", "google/veo-3.1-lite"],
    cinematic:    ["google/veo-3.1-quality", "google/veo-3.1-fast", "kuaishou/kling-3.0-video"],
    fast_draft:   ["kuaishou/kling-3.0-turbo-video", "hailuo/minimax-2.3-fast", "kuaishou/kling-2.6-video"],
  };

  const candidates = (prefs[useCase] || prefs.product_demo)
    .filter((id) => {
      const m = VIDEO[id];
      return m.cost <= maxBudget && duration <= m.maxDur;
    });

  if (candidates.length === 0) {
    // Fallback: cheapest viable
    const all = (Object.entries(VIDEO) as [VideoModel, typeof VIDEO[VideoModel]][])
      .filter(([, m]) => m.cost <= maxBudget && duration <= m.maxDur)
      .sort(([, a], [, b]) => (preferSpeed ? a.cost - b.cost : a.cost - b.cost));

    if (all.length === 0) throw new Error(`No model for ${duration}s under $${maxBudget}/sec`);

    const [primary, ...fallbacks] = all.map(([id]) => id);
    return {
      primary,
      primaryId: primary,
      estCost: +(VIDEO[primary].cost * duration).toFixed(4),
      fallbacks: fallbacks.slice(0, 3),
    };
  }

  const sorted = candidates.sort((a, b) => VIDEO[a].cost - VIDEO[b].cost);
  const primary = sorted[0];
  const fallbacks = sorted.slice(1, 4);

  return {
    primary,
    primaryId: primary,
    estCost: +(VIDEO[primary].cost * duration).toFixed(4),
    fallbacks,
  };
}

export function routeImage(maxBudget = 0.05): ImageModel {
  const sorted = (Object.entries(IMAGE) as [ImageModel, typeof IMAGE[ImageModel]][])
    .filter(([, m]) => m.cost <= maxBudget)
    .sort(([, a], [, b]) => a.cost - b.cost);

  if (sorted.length === 0) return "google/nano-banana"; // default
  return sorted[0][0];
}

// ═══ Execute with Fallback ══════════════

export async function generateVideo(opts: VideoRoute & { onProgress?: (s: string) => void }) {
  const route = routeVideo(opts);
  const client = getClient();
  const models = [route.primary, ...route.fallbacks];
  const errors: string[] = [];

  for (const model of models) {
    try {
      opts.onProgress?.(`→ ${model}`);
      const task = await client.createTask(model as ModelId, {
        prompt: opts.prompt,
        duration: opts.duration,
      });
      opts.onProgress?.(`⏳ ${model} (${task.task_id})`);

      const result = await client.pollTask(task.task_id, {
        onProgress: (t) => opts.onProgress?.(`${model}: ${t.status}`),
      });

      if (result.status === "completed") {
        return {
          success: true as const,
          model,
          taskId: result.task_id,
          output: result.output,
          cost: VIDEO[model as VideoModel]?.cost ?? 0,
        };
      }

      errors.push(`${model}: ${result.error?.message || "failed"}`);
      opts.onProgress?.(`✗ ${model}`);
    } catch (e) {
      errors.push(`${model}: ${e instanceof Error ? e.message : "error"}`);
    }
  }

  return { success: false as const, errors };
}
