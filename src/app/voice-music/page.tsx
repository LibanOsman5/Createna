"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Music, Volume2, Play } from "lucide-react";

export default function VoiceMusicPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Voice & Music</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Generate AI voiceovers, clone voices, and create custom music tracks for your videos.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Voice Generation */}
        <Card className="border-[#2A2A30] bg-[#141416]">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#8B5CF6]/10">
                <Mic className="h-4 w-4 text-[#8B5CF6]" />
              </div>
              <h3 className="text-sm font-semibold">Voice Generation</h3>
            </div>
            <p className="text-xs text-[#888891]">Convert scripts to natural voiceovers. Supports 30+ languages with emotion control.</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between rounded border border-[#2A2A30] bg-[#1C1C1F] p-2">
                <div>
                  <div className="text-[13px]">Narrator — Professional</div>
                  <div className="text-[11px] text-[#5C5C66]">ElevenLabs v3 · English</div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-[11px]"><Play className="mr-1 h-3 w-3" /> Preview</Button>
              </div>
              <div className="flex items-center justify-between rounded border border-[#2A2A30] bg-[#1C1C1F] p-2">
                <div>
                  <div className="text-[13px]">Sarah — Warm & Friendly</div>
                  <div className="text-[11px] text-[#5C5C66]">Cloned Voice · English</div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-[11px]"><Play className="mr-1 h-3 w-3" /> Preview</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Music Generation */}
        <Card className="border-[#2A2A30] bg-[#141416]">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#22C55E]/10">
                <Music className="h-4 w-4 text-[#22C55E]" />
              </div>
              <h3 className="text-sm font-semibold">Music Generation</h3>
            </div>
            <p className="text-xs text-[#888891]">Generate royalty-free background music. Choose genres, moods, and tempos via Suno AI.</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between rounded border border-[#2A2A30] bg-[#1C1C1F] p-2">
                <div>
                  <div className="text-[13px]">Upbeat Corporate</div>
                  <div className="text-[11px] text-[#5C5C66]">Suno · 120 BPM · Pop</div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-[11px]"><Play className="mr-1 h-3 w-3" /> Preview</Button>
              </div>
              <div className="flex items-center justify-between rounded border border-[#2A2A30] bg-[#1C1C1F] p-2">
                <div>
                  <div className="text-[13px]">Cinematic Tension</div>
                  <div className="text-[11px] text-[#5C5C66]">Suno · 90 BPM · Orchestral</div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-[11px]"><Play className="mr-1 h-3 w-3" /> Preview</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
