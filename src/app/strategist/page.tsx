"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Lightbulb, Target, Sparkles } from "lucide-react";

const insights = [
  {
    title: "Competitor Angle: 'Morning Routine'",
    description: "3 of your top 5 competitors are running UGC-style morning routine ads. This angle has 2.4x higher engagement than product-only demos in the skincare category.",
    action: "Generate UGC scripts",
    icon: TrendingUp,
    color: "text-[#22C55E]",
    bg: "bg-[#22C55E]/10",
  },
  {
    title: "Underperforming: Static Carousel",
    description: "Your carousel ads have 62% lower CTR than video formats. Recommend shifting 100% of budget to vertical video for next campaign.",
    action: "Switch to video-only",
    icon: Target,
    color: "text-[#EF4444]",
    bg: "bg-[#EF4444]/10",
  },
  {
    title: "Audience Insight: 25-34 Female",
    description: "This segment has 3.1x ROAS on your Vitamin C ads. They engage most with before/after transformations and ingredient breakdowns.",
    action: "Target this segment",
    icon: Lightbulb,
    color: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
  },
];

export default function StrategistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">AI Strategist</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          AI-powered creative strategy. Scans your brand assets, customer reviews, and competitor ads to surface winning angles.
        </p>
      </div>

      {/* Research Trigger */}
      <Card className="border-[#2A2A30] bg-[#141416]">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6]/10">
              <Search className="h-5 w-5 text-[#3B82F6]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold">Run Competitive Analysis</h3>
              <p className="text-xs text-[#888891]">Scan competitors, customer reviews, and market trends for your brand</p>
            </div>
            <Button size="sm" className="bg-[#3B82F6] hover:bg-[#2563EB]">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Analyze Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="space-y-3">
        {insights.map((insight) => (
          <Card key={insight.title} className="border-[#2A2A30] bg-[#141416]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded ${insight.bg}`}>
                  <insight.icon className={`h-4 w-4 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{insight.title}</h3>
                  <p className="mt-1 text-[13px] text-[#888891]">{insight.description}</p>
                  <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-[13px] text-[#3B82F6]">
                    {insight.action} →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
