"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, UserRound, Video, Mic, Sparkles } from "lucide-react";

const avatars = [
  { name: "Sarah — Lifestyle", model: "Seedance 2.0", clips: 142, thumbnail: "from-[#3B82F6]/20 via-[#8B5CF6]/20 to-[#3B82F6]/20", icon: "👩‍🦰", status: "ready" },
  { name: "Marcus — Fitness", model: "Kling 3.0", clips: 89, thumbnail: "from-[#22C55E]/20 via-[#3B82F6]/20 to-[#22C55E]/20", icon: "💪", status: "ready" },
  { name: "Elena — Beauty", model: "Veo 3.1", clips: 203, thumbnail: "from-[#F59E0B]/20 via-[#EF4444]/20 to-[#F59E0B]/20", icon: "💄", status: "ready" },
  { name: "James — Tech Review", model: "Seedance 2.0", clips: 56, thumbnail: "from-[#8B5CF6]/20 via-[#3B82F6]/20 to-[#8B5CF6]/20", icon: "🧑‍💻", status: "training"},
];

export default function AvatarsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">AI Avatars</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Create and manage AI influencer avatars. Train character LoRAs for consistent video generation across campaigns.
        </p>
      </div>

      {/* Create New Avatar CTA */}
      <Card className="border-dashed border-[#2A2A30] bg-transparent">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#3B82F6]/10">
              <Plus className="h-6 w-6 text-[#3B82F6]" />
            </div>
            <h3 className="font-semibold">Create New AI Avatar</h3>
            <p className="mt-1 text-sm text-[#888891]">Upload 10-20 reference images to train a custom character LoRA</p>
            <Button size="sm" className="mt-4 bg-[#3B82F6] hover:bg-[#2563EB]">Get Started</Button>
          </div>
        </CardContent>
      </Card>

      {/* Avatar Grid */}
      <div className="grid grid-cols-4 gap-3">
        {avatars.map((avatar) => (
          <Card key={avatar.name} className="cursor-pointer border-[#2A2A30] bg-[#141416] transition-colors hover:border-[#3B82F6]">
            <CardContent className="p-0">
              <div className={`flex h-32 items-center justify-center rounded-t-[10px] bg-gradient-to-br ${avatar.thumbnail} text-5xl`}>
                {avatar.icon}
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold">{avatar.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                    avatar.status === "ready" ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#F59E0B]/10 text-[#F59E0B]"
                  }`}>
                    {avatar.status}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#5C5C66]">
                  <span>{avatar.model}</span>
                  <span className="font-mono">{avatar.clips} clips</span>
                </div>
                <div className="mt-3 flex gap-1.5">
                  <Button variant="outline" size="sm" className="h-7 flex-1 border-[#2A2A30] bg-[#1C1C1F] text-[11px]">
                    <Video className="mr-1 h-3 w-3" /> Generate
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px] text-[#888891]">
                    <Sparkles className="h-3 w-3" />
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
