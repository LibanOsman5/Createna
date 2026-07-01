import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const runningJobs = [
  { id: "#1842", name: "Summer Sale — Hydra Serum", pipeline: "Product Ad Factory", stage: "3/7", elapsed: "2m 14s", progress: 65, cost: "$0.08", status: "running" },
  { id: "#1843", name: "Morning Routine — Glow Drops", pipeline: "UGC Creator", stage: "2/5", elapsed: "45s", progress: 30, cost: "$0.03", status: "running" },
];

const approvalJobs = [
  { id: "#1838", name: "Vitamin C Before/After v4", qcScore: "94%", qcWarn: false, cost: "$0.14", duration: "15s" },
  { id: "#1839", name: "Retinol Night Cream v1", qcScore: "89%", qcWarn: true, cost: "$0.18", duration: "20s" },
];

const completedJobs = [
  { id: "#1835", name: "Summer Sale v3", platform: "Meta Ads", platformId: "120246802192", pipeline: "Product Ad Factory", cost: "$0.12", status: "published" },
  { id: "#1834", name: "Glow Drops UGC v6", platform: "TikTok", platformId: "719284710293", pipeline: "UGC Creator", cost: "$0.09", status: "published" },
];

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Job Queue</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Monitor active jobs, review completed runs, and manage the production queue.
        </p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="border-b border-border w-full justify-start rounded-none bg-transparent h-auto p-0 gap-0">
          <TabsTrigger value="all" className="data-[state=active]:border-b-2 data-[state=active]:border-[#3B82F6] rounded-none px-4 py-2.5 text-[13px]">
            All Jobs <span className="ml-1.5 font-mono text-[11px] text-muted-foreground">1,247</span>
          </TabsTrigger>
          <TabsTrigger value="running" className="data-[state=active]:border-b-2 data-[state=active]:border-[#3B82F6] rounded-none px-4 py-2.5 text-[13px]">
            Running <span className="ml-1.5 font-mono text-[11px] text-[#3B82F6]">12</span>
          </TabsTrigger>
          <TabsTrigger value="approval" className="data-[state=active]:border-b-2 data-[state=active]:border-[#3B82F6] rounded-none px-4 py-2.5 text-[13px]">
            Awaiting Approval <span className="ml-1.5 font-mono text-[11px] text-[#F59E0B]">8</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:border-b-2 data-[state=active]:border-[#3B82F6] rounded-none px-4 py-2.5 text-[13px]">
            Completed <span className="ml-1.5 font-mono text-[11px] text-[#22C55E]">1,227</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-3">
          {/* Running */}
          <Card>
            <CardContent className="p-0">
              <div className="border-b border-border px-4 py-3 text-sm font-semibold">Running — 12 jobs</div>
              {runningJobs.map((job) => (
                <div key={job.id} className="flex items-center gap-3 border-b border-border px-4 py-3 text-[13px] last:border-b-0">
                  <span className="font-mono text-xs text-[#3B82F6] min-w-[52px]">{job.id}</span>
                  <div className="flex-1">
                    <p className="font-medium">{job.name}</p>
                    <p className="text-xs text-muted-foreground">Pipeline: {job.pipeline} · Stage {job.stage} · {job.elapsed} elapsed</p>
                  </div>
                  <Progress value={job.progress} className="w-[120px] h-1 bg-accent [&>div]:bg-[#3B82F6]" />
                  <Badge variant="outline" className="bg-[#3B82F6]/10 text-[#3B82F6] border-0 text-[11px]">
                    {job.status === "running" ? "Video Gen" : job.status}
                  </Badge>
                  <span className="font-mono text-xs text-muted-foreground min-w-[52px] text-right">{job.cost}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Awaiting Approval */}
          <Card>
            <CardContent className="p-0">
              <div className="border-b border-border px-4 py-3 text-sm font-semibold">Awaiting Approval — 8 jobs</div>
              {approvalJobs.map((job) => (
                <div key={job.id} className="flex items-center gap-3 border-b border-border px-4 py-3 text-[13px] last:border-b-0">
                  <span className="font-mono text-xs text-muted-foreground min-w-[52px]">{job.id}</span>
                  <div className="flex-1">
                    <p className="font-medium">{job.name}</p>
                    <p className="text-xs text-muted-foreground">
                      QC Score: {job.qcScore} {job.qcWarn ? "⚠" : "✓"} · Cost: {job.cost} · Duration: {job.duration}
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-[#F59E0B]/10 text-[#F59E0B] border-0 text-[11px]">Review</Badge>
                  <div className="flex gap-1.5">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">▶ Preview</Button>
                    <Button size="sm" className="h-7 text-xs bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20 border border-[#22C55E]/20">✓ Approve</Button>
                    <Button size="sm" className="h-7 text-xs bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20 border border-[#EF4444]/20">✗ Reject</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Completed */}
          <Card>
            <CardContent className="p-0">
              <div className="border-b border-border px-4 py-3 text-sm font-semibold">Completed Today — 47 jobs</div>
              {completedJobs.map((job) => (
                <div key={job.id} className="flex items-center gap-3 border-b border-border px-4 py-3 text-[13px] last:border-b-0">
                  <span className="font-mono text-xs text-muted-foreground min-w-[52px]">{job.id}</span>
                  <div className="flex-1">
                    <p className="font-medium">{job.name} — Published</p>
                    <p className="text-xs text-muted-foreground">
                      {job.platform} ID: {job.platformId} · Pipeline: {job.pipeline}
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-[#22C55E]/10 text-[#22C55E] border-0 text-[11px]">Published</Badge>
                  <span className="font-mono text-xs text-muted-foreground min-w-[52px] text-right">{job.cost}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
