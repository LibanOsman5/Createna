"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const assets = [
  { id: "a1", name: "Summer Sale v3", duration: "0:15", cost: "$0.14", status: "published", resolution: "1080p", model: "Veo 3.1", job: "#1842", gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]" },
  { id: "a2", name: "Glow Drops v2", duration: "0:30", cost: "$0.12", status: "approved", resolution: "1080p", model: "Kling 3.0", job: "#1843", gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]" },
  { id: "a3", name: "Vitamin C Before/After v4", duration: "0:20", cost: "$0.10", status: "published", resolution: "1080p", model: "Seedance 2.0", job: "#1838", gradient: "from-[#2d1b69] via-[#1a1a2e] to-[#16213e]" },
  { id: "a4", name: "Retinol Night v1", duration: "0:25", cost: "$0.15", status: "draft", resolution: "720p", model: "Seedance Fast", job: "#1839", gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]" },
  { id: "a5", name: "Hydra Serum UGC v7", duration: "0:15", cost: "$0.09", status: "published", resolution: "1080p", model: "Kling 3.0", job: "#1850", gradient: "from-[#0f3460] via-[#16213e] to-[#1a1a2e]" },
  { id: "a6", name: "Morning Routine v3", duration: "0:30", cost: "$0.11", status: "approved", resolution: "4K", model: "Veo 3.1", job: "#1851", gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]" },
  { id: "a7", name: "Cleanser Demo v2", duration: "0:20", cost: "$0.08", status: "published", resolution: "1080p", model: "Kling 3.0", job: "#1845", gradient: "from-[#16213e] via-[#0f3460] to-[#1a1a2e]" },
  { id: "a8", name: "Sunscreen SPF50 v1", duration: "0:15", cost: "$0.13", status: "draft", resolution: "1080p", model: "Seedance 2.0", job: "#1855", gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]" },
];

const statusColors: Record<string, string> = {
  published: "bg-[#22C55E]",
  approved: "bg-[#3B82F6]",
  draft: "bg-[#F59E0B]",
  archived: "bg-[#5C5C66]",
};

export default function AssetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Asset Library</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Browse, search, and manage all generated video assets across campaigns.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C5C66]" />
          <Input placeholder="Search assets..." className="pl-9 h-9 border-[#2A2A30] bg-[#141416] text-[13px]" />
        </div>
        <Button variant="outline" size="sm" className="border-[#2A2A30] bg-[#141416] text-[13px] text-[#888891]">
          <Filter className="mr-1.5 h-3.5 w-3.5" /> Tags
        </Button>
        <Button variant="outline" size="sm" className="border-[#2A2A30] bg-[#141416] text-[13px] text-[#888891]">
          Date ▾
        </Button>
        <Button variant="outline" size="sm" className="border-[#2A2A30] bg-[#141416] text-[13px] text-[#888891]">
          Pipeline ▾
        </Button>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-4 gap-3">
        {assets.map((asset) => (
          <Card
            key={asset.id}
            className="cursor-pointer overflow-hidden border-[#2A2A30] bg-[#1C1C1F] transition-colors hover:border-[#3B82F6]"
          >
            {/* Thumbnail */}
            <div className={`relative flex aspect-[9/16] items-center justify-center bg-gradient-to-br ${asset.gradient}`}>
              <div className="text-5xl text-white/20">▶</div>
              <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[11px] text-white">
                {asset.duration}
              </span>
              <span className={`absolute left-2 top-2 h-2 w-2 rounded-full ${statusColors[asset.status]}`} />
            </div>

            {/* Meta */}
            <CardContent className="p-3">
              <div className="text-[13px] font-semibold">{asset.name}</div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#888891]">{asset.cost}</span>
                <span className="rounded-full bg-[#141416] px-2 py-0.5 text-[10px] capitalize text-[#888891]">
                  {asset.status}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-[11px] text-[#5C5C66]">
                <span>{asset.resolution}</span>
                <span>·</span>
                <span>{asset.model}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
