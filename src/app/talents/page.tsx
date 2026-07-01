"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, FileImage, Megaphone, TrendingUp } from "lucide-react";

const talents = [
  {
    name: "Nova Sterling",
    handle: "@novasterling",
    bio: "Fashion-tech futurist & lifestyle muse",
    status: "active",
    color: "from-[#8B5CF6]/30 to-[#3B82F6]/20",
    dot: "#8B5CF6",
    assets: 482,
    campaigns: 7,
    reach: "248.3K",
    updated: "Jun 17",
    prompts: 96,
  },
  {
    name: "Axel Voss",
    handle: "@axelvoss",
    bio: "AI brand ambassador — automotive & gadgets",
    status: "draft",
    color: "from-[#3B82F6]/30 to-[#1a1a2e]",
    dot: "#3B82F6",
    assets: 23,
    campaigns: 0,
    reach: "0",
    updated: "Jun 16",
    prompts: 12,
  },
  {
    name: "Kai Mercer",
    handle: "@kaimercer",
    bio: "Fitness coach & wellness educator",
    status: "active",
    color: "from-[#22C55E]/30 to-[#0f3460]",
    dot: "#22C55E",
    assets: 311,
    campaigns: 4,
    reach: "132.9K",
    updated: "Jun 16",
    prompts: 78,
  },
  {
    name: "Lumi Hart",
    handle: "@lumihart",
    bio: "Travel & lifestyle creator",
    status: "active",
    color: "from-[#F59E0B]/30 to-[#EF4444]/20",
    dot: "#F59E0B",
    assets: 156,
    campaigns: 2,
    reach: "74.5K",
    updated: "Jun 15",
    prompts: 43,
  },
];

export default function TalentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Talents</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Create and manage AI influencers. Define their character, voice, style, and knowledge.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {talents.map((talent) => (
          <Link key={talent.name} href={`/talents/${talent.name.toLowerCase().replace(" ", "-")}`}>
            <Card className="group cursor-pointer border-[#2A2A30] bg-[#141416] transition-all hover:border-[#8B5CF6] hover:shadow-lg">
              <CardContent className="p-0">
                {/* Header Banner */}
                <div className={`flex h-20 items-end bg-gradient-to-br ${talent.color} px-4 pb-3`}>
                  <Badge className={`${talent.status === "active" ? "bg-[#22C55E]/20 text-[#22C55E]" : "bg-[#F59E0B]/20 text-[#F59E0B]"} border-0 text-[10px]`}>
                    {talent.status}
                  </Badge>
                </div>

                {/* Info */}
                <div className="px-4 pb-4 pt-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: talent.dot }} />
                    <h3 className="font-semibold">{talent.name}</h3>
                    <span className="text-xs text-muted-foreground">{talent.handle}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{talent.bio}</p>

                  {/* Metrics */}
                  <div className="mt-3 grid grid-cols-3 gap-2 rounded-md bg-[#1C1C1F] p-2">
                    <div className="text-center">
                      <div className="font-mono text-sm font-bold">{talent.assets}</div>
                      <div className="text-[10px] text-muted-foreground">Assets</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-sm font-bold">{talent.campaigns}</div>
                      <div className="text-[10px] text-muted-foreground">Campaigns</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-sm font-bold">{talent.reach}</div>
                      <div className="text-[10px] text-muted-foreground">Reach</div>
                    </div>
                  </div>

                  <div className="mt-2 text-[11px] text-muted-foreground">
                    {talent.prompts} prompts · Updated {talent.updated}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* Create New Talent */}
        <Card className="flex cursor-pointer items-center justify-center border-dashed border-[#2A2A30] bg-transparent transition-all hover:border-[#8B5CF6]">
          <CardContent className="py-12 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#8B5CF6]/10">
              <Plus className="h-6 w-6 text-[#8B5CF6]" />
            </div>
            <h3 className="font-semibold">Create a Talent</h3>
            <p className="mt-1 text-sm text-muted-foreground">Spin up a new digital human</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
