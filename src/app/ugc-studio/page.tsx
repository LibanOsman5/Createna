"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Film, Sparkles, UserRound, RefreshCw, Play, Image, Music, Wand2 } from "lucide-react";

const remixOptions = [
  { icon: UserRound, label: "Face Swap", desc: "Replace the face in any video with your AI avatar", color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10" },
  { icon: RefreshCw, label: "Style Transfer", desc: "Transform footage into anime, 3D, or cinematic styles", color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10" },
  { icon: Wand2, label: "Background Replace", desc: "Change backgrounds while keeping the subject intact", color: "text-[#22C55E]", bg: "bg-[#22C55E]/10" },
  { icon: Music, label: "Lip Sync", desc: "Sync AI-generated voice to any avatar video", color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
];

const recentRemixes = [
  { title: "Nova Sterling — Spring Capsule", type: "Style Transfer", talent: "Nova Sterling", date: "2 hours ago", status: "completed" },
  { title: "Kai Mercer — Workout Reel", type: "Face Swap", talent: "Kai Mercer", date: "5 hours ago", status: "processing" },
  { title: "Lumi Hart — Tokyo Travel", type: "Background Replace", talent: "Lumi Hart", date: "1 day ago", status: "completed" },
];

export default function UGCStudioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">UGC Video Studio</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Remix, transform, and enhance videos with AI. Face swap, style transfer, background replace, and more.
        </p>
      </div>

      {/* Remix Types */}
      <div className="grid grid-cols-4 gap-3">
        {remixOptions.map((opt) => (
          <Card key={opt.label} className="cursor-pointer border-[#2A2A30] bg-[#141416] transition-all hover:border-[#8B5CF6]">
            <CardContent className="p-4 text-center">
              <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${opt.bg}`}>
                <opt.icon className={`h-6 w-6 ${opt.color}`} />
              </div>
              <h3 className="text-sm font-semibold">{opt.label}</h3>
              <p className="mt-1 text-[11px] text-muted-foreground">{opt.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload & Remix Panel */}
      <Card className="border-[#2A2A30] bg-[#141416]">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {/* Upload Area */}
            <div className="flex-1">
              <div className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#2A2A30] bg-[#1C1C1F] py-8 transition-colors hover:border-[#8B5CF6]">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/10">
                    <Film className="h-5 w-5 text-[#8B5CF6]" />
                  </div>
                  <p className="text-sm font-medium">Drop a video or click to upload</p>
                  <p className="mt-1 text-xs text-muted-foreground">MP4, MOV, WebM up to 500MB</p>
                </div>
              </div>
            </div>

            {/* Config */}
            <div className="flex w-64 flex-col gap-2">
              <Select defaultValue="nova-sterling">
                <SelectTrigger className="border-[#2A2A30] bg-[#1C1C1F] text-[13px]">
                  <SelectValue placeholder="Select avatar" />
                </SelectTrigger>
                <SelectContent className="border-[#2A2A30] bg-[#1C1C1F]">
                  <SelectItem value="nova-sterling">👩‍🦰 Nova Sterling</SelectItem>
                  <SelectItem value="axel-voss">🧑‍💻 Axel Voss</SelectItem>
                  <SelectItem value="kai-mercer">💪 Kai Mercer</SelectItem>
                  <SelectItem value="lumi-hart">🌴 Lumi Hart</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="face-swap">
                <SelectTrigger className="border-[#2A2A30] bg-[#1C1C1F] text-[13px]">
                  <SelectValue placeholder="Effect type" />
                </SelectTrigger>
                <SelectContent className="border-[#2A2A30] bg-[#1C1C1F]">
                  <SelectItem value="face-swap">Face Swap</SelectItem>
                  <SelectItem value="style-transfer">Style Transfer</SelectItem>
                  <SelectItem value="bg-replace">Background Replace</SelectItem>
                  <SelectItem value="lip-sync">Lip Sync</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Remix Video
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Remixes */}
      <Card className="border-[#2A2A30] bg-[#141416]">
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b border-[#2A2A30] px-4 py-3">
            <h3 className="text-sm font-semibold">Recent Remixes</h3>
          </div>
          {recentRemixes.map((item, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < recentRemixes.length - 1 ? "border-b border-[#2A2A30]" : ""}`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
                <Play className="h-4 w-4 text-white/30" />
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium">{item.title}</div>
                <div className="text-[11px] text-muted-foreground">{item.type} · {item.talent} · {item.date}</div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                item.status === "completed" ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#3B82F6]/10 text-[#3B82F6]"
              }`}>{item.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
