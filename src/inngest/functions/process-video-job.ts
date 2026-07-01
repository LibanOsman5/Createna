import { inngest } from "@/lib/inngest";
import { routeVideo, generateVideo } from "@/lib/model-router";

/**
 * Process Video Job — Production Pipeline
 *
 * Uses Unifically API with hybrid model routing.
 * Flow: Brief Intake → Route Model → Video Generation → Asset Save
 */

interface JobPayload {
  jobId: string;
  brief: {
    title: string;
    script: string;
    duration?: number;
    useCase?: "product_demo" | "ugc" | "cinematic" | "fast_draft";
  };
}

export const processVideoJob = inngest.createFunction(
  {
    id: "process-video-job",
    name: "Process Video Job",
    triggers: { event: "jobs/process" },
    concurrency: 5,
    retries: 2,
  },
  async ({ event, step }) => {
    const payload = event.data as JobPayload;
    const { jobId, brief } = payload;

    // Stage 1: Brief Intake
    await step.run("brief-intake", async () => {
      console.log(`[Job ${jobId}] Brief: "${brief.title}"`);
      return { stage: "brief_intake", status: "completed" };
    });

    // Stage 2: Model Routing
    const route = await step.run("model-routing", async () => {
      const r = routeVideo({
        prompt: brief.script,
        duration: brief.duration || 5,
        useCase: brief.useCase || "product_demo",
      });
      console.log(`[Job ${jobId}] Primary: ${r.primaryId} ($${r.estCost})`);
      console.log(`[Job ${jobId}] Fallbacks: ${r.fallbacks.join(", ")}`);
      return r;
    });

    // Stage 3: Video Generation with fallback
    const result = await step.run("video-generation", async () => {
      return generateVideo({
        prompt: brief.script,
        duration: brief.duration || 5,
        useCase: brief.useCase || "product_demo",
        onProgress: (s) => console.log(`[Job ${jobId}] ${s}`),
      });
    });

    if (!result.success) {
      throw new Error(`All models failed: ${result.errors?.join("; ")}`);
    }

    // Stage 4: Asset Save
    await step.run("asset-save", async () => {
      console.log(`[Job ${jobId}] Output: ${result.output?.video_url}`);
      return { stage: "asset_save", status: "completed" };
    });

    return {
      jobId,
      status: "completed",
      model: result.model,
      taskId: result.taskId,
      outputUrl: result.output?.video_url,
    };
  }
);
