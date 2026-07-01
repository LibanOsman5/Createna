"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Calendar, TrendingUp, Plus, Play, Pause } from "lucide-react";

const campaigns = [
  {
    name: "Spring Capsule 2026",
    talent: "Nova Sterling",
    status: "active",
    type: "Sponsored",
    platforms: ["Instagram", "TikTok"],
    posts: 12,
    engagement: "4.8%",
    reach: "142K",
    budget: "$2,500",
    startDate: "Jun 10",
    color: "#8B5CF6",
  },
  {
    name: "Wellness Wednesday",
    talent: "Kai Mercer",
    status: "active",
    type: "Organic",
    platforms: ["Instagram", "YouTube"],
    posts: 8,
    engagement: "6.2%",
    reach: "89K",
    budget: "$0",
    startDate: "Jun 5",
    color: "#22C55E",
  },
  {
    name: "Travel Gear Launch",
    talent: "Lumi Hart",
    status: "planned",
    type: "Sponsored",
    platforms: ["Instagram", "TikTok", "YouTube"],
    posts: 0,
    engagement: "—",
    reach: "—",
    budget: "$5,000",
    startDate: "Jul 1",
    color: "#F59E0B",
  },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Campaigns</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Plan, execute, and track campaigns across your AI talents.
        </p>
      </div>

      <div className="space-y-3">
        {campaigns.map((campaign) => (
          <Card key={campaign.name} className="border-[#2A2A30] bg-[#141416] transition-colors hover:border-[#8B5CF6]">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${campaign.color}15` }}>
                  <Megaphone className="h-5 w-5" style={{ color: campaign.color }} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <Badge className={`border-0 text-[10px] ${
                      campaign.status === "active" ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#F59E0B]/10 text-[#F59E0B]"
                    }`}>{campaign.status}</Badge>
                    <Badge className="bg-[#1C1C1F] text-[#888891] border-0 text-[10px]">{campaign.type}</Badge>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {campaign.talent} · {campaign.platforms.join(" + ")} · Starts {campaign.startDate}
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-3">
                    <div className="rounded bg-[#1C1C1F] px-3 py-2 text-center">
                      <div className="font-mono text-sm font-bold">{campaign.posts}</div>
                      <div className="text-[10px] text-muted-foreground">Posts</div>
                    </div>
                    <div className="rounded bg-[#1C1C1F] px-3 py-2 text-center">
                      <div className="font-mono text-sm font-bold">{campaign.engagement}</div>
                      <div className="text-[10px] text-muted-foreground">Engagement</div>
                    </div>
                    <div className="rounded bg-[#1C1C1F] px-3 py-2 text-center">
                      <div className="font-mono text-sm font-bold">{campaign.reach}</div>
                      <div className="text-[10px] text-muted-foreground">Reach</div>
                    </div>
                    <div className="rounded bg-[#1C1C1F] px-3 py-2 text-center">
                      <div className="font-mono text-sm font-bold">{campaign.budget}</div>
                      <div className="text-[10px] text-muted-foreground">Budget</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {campaign.status === "active" ? (
                    <Button variant="outline" size="sm" className="border-[#2A2A30] bg-[#1C1C1F] text-[13px]">
                      <Pause className="mr-1.5 h-3.5 w-3.5" /> Pause
                    </Button>
                  ) : (
                    <Button size="sm" className="bg-[#22C55E] hover:bg-[#16A34A]">
                      <Play className="mr-1.5 h-3.5 w-3.5" /> Launch
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
