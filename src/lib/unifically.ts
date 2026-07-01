/**
 * Unifically API Client — Production-Ready
 *
 * Single API key → 80+ AI models (video, image, audio, LLM)
 * Base URL: https://api.unifically.com
 * Docs: https://docs.unifically.com
 *
 * Response format: { code, success, data: { task_id, status, output } }
 */

const BASE = "https://api.unifically.com";

// ─── Types ─────────────────────────────
export interface TaskInput {
  prompt?: string;
  image_url?: string;
  image_urls?: string[];
  start_image_url?: string;
  end_image_url?: string;
  reference_image_urls?: string[];
  reference_characters?: Array<{
    image_urls: string[];
    name?: string;
    description?: string;
  }>;
  duration?: number;
  aspect_ratio?: string;
  resolution?: string;
  seed?: number;
  voice?: string;
  [key: string]: unknown;
}

export interface TaskResponse {
  task_id: string;
  status: "pending" | "processing" | "completed" | "failed";
  output?: {
    video_url?: string;
    image_url?: string;
    audio_url?: string;
    urls?: string[];
    [key: string]: unknown;
  };
  error?: {
    message: string;
    code: string;
  };
  cost?: number;
}

interface ApiResponse<T> {
  code: number;
  success: boolean;
  data: T;
}

// ─── Available Models ──────────────────
export const MODELS = {
  // Video
  "google/veo-3.1-fast": { type: "video", cost: 0.15, maxDuration: 8 },
  "google/veo-3.1-lite": { type: "video", cost: 0.09, maxDuration: 8 },
  "google/veo-3.1-quality": { type: "video", cost: 0.75, maxDuration: 8 },
  "kuaishou/kling-3.0-video": { type: "video", cost: 0.08, maxDuration: 15 },
  "kuaishou/kling-3.0-turbo-video": { type: "video", cost: 0.06, maxDuration: 10 },
  "kuaishou/kling-2.6-video": { type: "video", cost: 0.05, maxDuration: 10 },
  "hailuo/minimax-2.3": { type: "video", cost: 0.10, maxDuration: 10 },
  "hailuo/minimax-2.3-fast": { type: "video", cost: 0.07, maxDuration: 6 },

  // Image
  "google/nano-banana": { type: "image", cost: 0.025 },
  "google/nano-banana-pro": { type: "image", cost: 0.035 },
  "openai/gpt-image-2": { type: "image", cost: 0.03 },
  "black-forest-labs/flux.2-pro": { type: "image", cost: 0.055 },
  "black-forest-labs/flux.2-flex": { type: "image", cost: 0.025 },
  "black-forest-labs/flux.2-klein": { type: "image", cost: 0.01 },
  "kuaishou/kling-o1-image": { type: "image", cost: 0.02 },
} as const;

export type ModelId = keyof typeof MODELS;

// ─── Client ────────────────────────────
export class UnificallyClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.UNIFICALLY_API_KEY || "";
    if (!this.apiKey) throw new Error("UNIFICALLY_API_KEY is required");
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const json = await res.json();

    if (!res.ok || json.success === false) {
      const msg = json.data?.message || json.message || `HTTP ${res.status}`;
      throw new Error(`Unifically error: ${msg}`);
    }

    return json;
  }

  // ─── Account ──────────────────────────
  async getBalance(): Promise<number> {
    const res = await this.request<ApiResponse<{ balance_usd: number }>>("GET", "/account");
    return res.data.balance_usd;
  }

  // ─── Task: Create ─────────────────────
  async createTask(model: ModelId, input: TaskInput): Promise<TaskResponse> {
    const res = await this.request<ApiResponse<TaskResponse>>("POST", "/v1/tasks", {
      model,
      input,
    });
    return res.data;
  }

  // ─── Task: Dry Run (cost preview) ─────
  async estimateCost(model: ModelId, input: TaskInput): Promise<number> {
    const res = await this.request<ApiResponse<{ cost: number }>>("POST", "/v1/tasks", {
      model,
      input,
      dry_run: true,
    });
    return res.data.cost;
  }

  // ─── Task: Get Status ─────────────────
  async getTask(taskId: string): Promise<TaskResponse> {
    const res = await this.request<ApiResponse<TaskResponse>>("GET", `/v1/tasks/${taskId}`);
    return res.data;
  }

  // ─── Task: Poll Until Complete ────────
  async pollTask(
    taskId: string,
    opts: {
      maxAttempts?: number;
      intervalMs?: number;
      onProgress?: (task: TaskResponse) => void;
    } = {}
  ): Promise<TaskResponse> {
    const { maxAttempts = 120, intervalMs = 5000, onProgress } = opts;

    for (let i = 0; i < maxAttempts; i++) {
      const task = await this.getTask(taskId);
      onProgress?.(task);

      if (task.status === "completed" || task.status === "failed") {
        return task;
      }

      await new Promise((r) => setTimeout(r, intervalMs));
    }

    throw new Error(`Task ${taskId} timed out after ${maxAttempts} attempts`);
  }

  // ─── Convenience: Video ───────────────
  async generateVideo(input: TaskInput & { model?: ModelId }): Promise<{
    model: string;
    taskId: string;
    output: TaskResponse["output"];
    cost: number;
  }> {
    const model = (input.model || "kuaishou/kling-3.0-video") as ModelId;
    const task = await this.createTask(model, input);
    const result = await this.pollTask(task.task_id);

    if (result.status === "failed") {
      throw new Error(`Video generation failed: ${result.error?.message || "Unknown error"}`);
    }

    return {
      model,
      taskId: result.task_id,
      output: result.output,
      cost: MODELS[model]?.cost ?? 0,
    };
  }

  // ─── Convenience: Image ───────────────
  async generateImage(input: TaskInput & { model?: ModelId }): Promise<{
    model: string;
    taskId: string;
    imageUrl: string;
    cost: number;
  }> {
    const model = (input.model || "google/nano-banana") as ModelId;
    const task = await this.createTask(model, input);
    const result = await this.pollTask(task.task_id);

    if (result.status === "failed") {
      throw new Error(`Image generation failed: ${result.error?.message || "Unknown error"}`);
    }

    return {
      model,
      taskId: result.task_id,
      imageUrl: result.output?.image_url || "",
      cost: MODELS[model]?.cost ?? 0,
    };
  }
}

// ─── Singleton ─────────────────────────
let instance: UnificallyClient | null = null;
export function getClient(): UnificallyClient {
  if (!instance) instance = new UnificallyClient();
  return instance;
}
