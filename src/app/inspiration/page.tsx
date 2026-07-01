"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Plus, ExternalLink } from "lucide-react";

const sources = [
  { name: "@digitalfashion_", platform: "Instagram", note: "Minimalist tech-fashion aesthetic", talent: "Nova Sterling", category: "Aesthetic" },
  { name: "@fitwithkai", platform: "TikTok", note: "High-energy workout transitions", talent: "Kai Mercer", category: "Format" },
  { name: "Architectural Digest", platform: "YouTube", note: "Clean, wide-angle interior shots", talent: "Lumi Hart", category: "Visual" },
  { name: "@techreview", platform: "Instagram", note: "Product unboxing style", talent: "Axel Voss", category: "Format" },
  { name: "Vogue Future", platform: "Web", note: "Editorial fashion-tech coverage", talent: "Nova Sterling", category: "Content" },
  { name: "@travelnoire", platform: "Instagram", note: "Vibrant destination content", talent: "Lumi Hart", category: "Aesthetic" },
];

export default function InspirationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Inspiration Board</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Accounts, styles, and content that inspire your talents' direction.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {sources.map((source) => (
          <Card key={source.name} className="border-[#2A2A30] bg-[#141416] transition-colors hover:border-[#8B5CF6]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-[#F59E0B]" />
                  <span className="text-[11px] text-muted-foreground">{source.category}</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <h3 className="mt-2 font-semibold">{source.name}</h3>
              <p className="text-xs text-muted-foreground">{source.platform}</p>
              <p className="mt-1 text-[13px] text-muted-foreground">{source.note}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
                <span className="text-[11px] text-[#8B5CF6]">{source.talent}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
