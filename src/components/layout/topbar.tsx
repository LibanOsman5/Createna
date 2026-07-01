"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Zap, Bell } from "lucide-react";

const pageConfig: Record<string, { title: string; cta: string; ctaHref?: string }> = {
  "/": { title: "Pipelines", cta: "New Pipeline", ctaHref: "/pipelines/editor" },
  "/create": { title: "Create", cta: "" },
  "/jobs": { title: "Job Queue", cta: "New Job" },
  "/assets": { title: "Asset Library", cta: "Upload" },
  "/approvals": { title: "Approval Queue", cta: "Review All" },
  "/talents": { title: "Talents", cta: "New Talent" },
  "/content-studio": { title: "Content Studio", cta: "Generate" },
  "/ugc-studio": { title: "UGC Video Studio", cta: "Remix Video" },
  "/campaigns": { title: "Campaigns", cta: "New Campaign" },
  "/analytics": { title: "Analytics", cta: "Export" },
  "/strategist": { title: "AI Strategist", cta: "New Analysis" },
  "/inspiration": { title: "Inspiration Board", cta: "Add Source" },
};

export function AppTopbar() {
  const pathname = usePathname();
  const config = pageConfig[pathname] || { title: "Createna", cta: "" };

  return (
    <header className="flex h-[52px] shrink-0 items-center gap-4 border-b border-border bg-card px-6">
      <h1 className="text-base font-semibold">{config.title}</h1>

      {/* Global Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="Search talents, assets, prompts…"
            className="w-full rounded-md border border-border bg-accent py-1.5 pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-[#3B82F6]"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <FileText className="mr-1.5 h-3.5 w-3.5" />
          Docs
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Zap className="mr-1.5 h-3.5 w-3.5" />
          API
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Bell className="h-4 w-4" />
        </Button>
        {config.cta && (
          <Button size="sm" className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            {config.cta}
          </Button>
        )}
      </div>
    </header>
  );
}
