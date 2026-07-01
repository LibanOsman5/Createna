import { Inngest } from "inngest";

// Create the Inngest client for server-side use
export const inngest = new Inngest({
  id: "assembly-line",
  eventKey: process.env.INNGEST_EVENT_KEY,
});
