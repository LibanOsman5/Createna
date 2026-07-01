"use client";

import { Card, CardContent } from "@/components/ui/card";

const costByModel = [
  { model: "Veo 3.1", cost: 52.4, jobs: 412, color: "bg-[#3B82F6]", width: "75%" },
  { model: "Kling 3.0", cost: 34.2, jobs: 389, color: "bg-[#8B5CF6]", width: "56%" },
  { model: "Seedance 2.0", cost: 22.1, jobs: 298, color: "bg-[#22C55E]", width: "38%" },
  { model: "Sora 2", cost: 12.8, jobs: 148, color: "bg-[#F59E0B]", width: "22%" },
];

const weeklyThroughput = [
  { week: "W1", bars: [85, 90, 88, 82, 92, 45, 30] },
  { week: "W2", bars: [88, 85, 92, 78, 90, 42, 28] },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Analytics</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Track costs, throughput, model performance, and approval queue health.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Jobs (30d)", value: "1,247", sub: "↑ 12% vs prior period", subColor: "text-[#22C55E]" },
          { label: "Avg Cost / Job", value: "$0.11", sub: "↓ 8% vs last month", subColor: "text-[#22C55E]" },
          { label: "QC Pass Rate", value: "94.2%", sub: "↑ 2.1% improvement", subColor: "text-[#22C55E]" },
          { label: "Total Spend (30d)", value: "$137.17", sub: "Across all models", subColor: "text-[#888891]" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-xs text-[#888891]">{stat.label}</p>
              <p className="mt-1 font-mono text-2xl font-bold">{stat.value}</p>
              <p className={`mt-1 text-xs ${stat.subColor}`}>{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cost by Model */}
      <Card className="border-[#2A2A30] bg-[#141416]">
        <CardContent className="p-4">
          <h3 className="mb-4 text-sm font-semibold">Cost by Model (Last 30 Days)</h3>
          <div className="space-y-3">
            {costByModel.map((item) => (
              <div key={item.model} className="flex items-center gap-3">
                <span className="w-24 text-[13px] font-medium">{item.model}</span>
                <div className="flex-1">
                  <div className="h-6 overflow-hidden rounded-sm bg-[#1C1C1F]">
                    <div
                      className={`h-full rounded-sm ${item.color}`}
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
                <span className="w-20 text-right font-mono text-[13px]">${item.cost.toFixed(2)}</span>
                <span className="w-24 text-right text-xs text-[#888891]">{item.jobs} jobs</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Throughput */}
      <Card className="border-[#2A2A30] bg-[#141416]">
        <CardContent className="p-4">
          <h3 className="mb-4 text-sm font-semibold">Pipeline Throughput (Weekly)</h3>
          <div className="space-y-4">
            {weeklyThroughput.map((w) => (
              <div key={w.week} className="flex items-center gap-3">
                <span className="w-8 text-[13px] font-mono text-[#888891]">{w.week}</span>
                <div className="flex flex-1 gap-1">
                  {w.bars.map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-[#3B82F6]"
                      style={{ height: `${height}%`, minHeight: "4px", opacity: 0.3 + (height / 100) * 0.7 }}
                    />
                  ))}
                </div>
                <div className="flex gap-1 pl-2 text-[10px] text-[#5C5C66]">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                    <span key={d} className="w-4 text-center">{d}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
