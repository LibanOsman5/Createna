"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Check, X, MessageSquare } from "lucide-react";

const approvals = [
  {
    id: "#1838",
    name: "Vitamin C Before/After v4",
    qcScore: 94,
    qcWarn: false,
    cost: "$0.14",
    duration: "15s",
    model: "Seedance 2.0",
    pipeline: "Product Ad Factory",
    submittedAt: "2 hours ago",
    frames: 450,
    resolution: "1080p",
  },
  {
    id: "#1839",
    name: "Retinol Night Cream v1",
    qcScore: 89,
    qcWarn: true,
    cost: "$0.18",
    duration: "20s",
    model: "Veo 3.1",
    pipeline: "Product Ad Factory",
    submittedAt: "3 hours ago",
    frames: 600,
    resolution: "1080p",
  },
  {
    id: "#1852",
    name: "Glow Drops UGC v8",
    qcScore: 96,
    qcWarn: false,
    cost: "$0.11",
    duration: "15s",
    model: "Kling 3.0",
    pipeline: "UGC Creator Batch",
    submittedAt: "4 hours ago",
    frames: 450,
    resolution: "4K",
  },
  {
    id: "#1853",
    name: "Summer Sale Hook v2",
    qcScore: 82,
    qcWarn: true,
    cost: "$0.13",
    duration: "10s",
    model: "Seedance Fast",
    pipeline: "Creative Testing",
    submittedAt: "5 hours ago",
    frames: 300,
    resolution: "720p",
  },
];

export default function ApprovalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Approval Queue</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Review generated assets. Approve, reject, or request changes with frame-specific feedback.
        </p>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Pending Review", value: "8", color: "text-[#F59E0B]" },
          { label: "Approved Today", value: "34", color: "text-[#22C55E]" },
          { label: "Avg Wait Time", value: "2h 14m", color: "text-[#EDEDEF]" },
          { label: "Oldest Pending", value: "5h 32m", color: "text-[#EF4444]" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-xs text-[#888891]">{stat.label}</p>
              <p className={`mt-1 font-mono text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Approval Cards */}
      <div className="space-y-3">
        {approvals.map((item) => (
          <Card key={item.id} className="border-[#2A2A30] bg-[#141416]">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
                  <Play className="h-8 w-8 text-white/30" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <span className="font-mono text-xs text-[#888891]">{item.id}</span>
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-3 text-[13px]">
                    <div>
                      <span className="text-[#5C5C66]">QC Score: </span>
                      <span className={`font-mono font-semibold ${item.qcScore >= 90 ? "text-[#22C55E]" : item.qcScore >= 85 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>
                        {item.qcScore}%
                      </span>
                      {item.qcWarn && <span className="ml-1 text-[#F59E0B]">⚠</span>}
                    </div>
                    <div><span className="text-[#5C5C66]">Cost: </span><span className="font-mono">{item.cost}</span></div>
                    <div><span className="text-[#5C5C66]">Duration: </span><span className="font-mono">{item.duration}</span></div>
                    <div><span className="text-[#5C5C66]">Model: </span><span>{item.model}</span></div>
                  </div>
                  <div className="mt-2 text-xs text-[#5C5C66]">
                    Pipeline: {item.pipeline} · {item.frames} frames · {item.resolution} · Submitted {item.submittedAt}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="border-[#2A2A30] bg-[#1C1C1F] text-[13px]">
                    <Play className="mr-1.5 h-3.5 w-3.5" /> Preview
                  </Button>
                  <Button size="sm" className="bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20 border border-[#22C55E]/20 text-[13px]">
                    <Check className="mr-1.5 h-3.5 w-3.5" /> Approve
                  </Button>
                  <Button size="sm" className="bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20 border border-[#EF4444]/20 text-[13px]">
                    <X className="mr-1.5 h-3.5 w-3.5" /> Reject
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[#888891] text-[13px]">
                    <MessageSquare className="mr-1.5 h-3.5 w-3.5" /> Comment
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
