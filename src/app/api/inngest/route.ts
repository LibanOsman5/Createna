import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { processVideoJob } from "@/inngest/functions/process-video-job";

// Inngest API route handler — v4 serve
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processVideoJob],
});
