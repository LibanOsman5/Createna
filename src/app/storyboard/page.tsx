"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Image, Film, Type } from "lucide-react";

const scenes = [
  { id: 1, title: "Opening Hook", description: "Close-up product reveal with dramatic lighting", duration: "3s", type: "video", status: "draft" },
  { id: 2, title: "Pain Point", description: "Split screen — problem vs solution", duration: "5s", type: "video", status: "draft" },
  { id: 3, title: "Product Demo", description: "Hands-on product application sequence", duration: "8s", type: "video", status: "generating" },
  { id: 4, title: "Social Proof", description: "Before/after comparison with testimonial overlay", duration: "5s", type: "image", status: "draft" },
  { id: 5, title: "CTA End Card", description: "Brand logo + shop now button animation", duration: "3s", type: "text", status: "draft" },
];

export default function StoryboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Storyboard</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Plan video sequences scene by scene. Define shots, camera angles, and transitions before generation.
        </p>
      </div>

      {/* Timeline View */}
      <Card className="border-[#2A2A30] bg-[#141416]">
        <CardContent className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-sm font-semibold">Product Ad Factory — Summer Sale v3</h3>
            <span className="font-mono text-xs text-[#888891]">5 scenes · 24s total</span>
            <div className="ml-auto">
              <Button size="sm" className="bg-[#3B82F6] hover:bg-[#2563EB]">
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Scene
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {scenes.map((scene, i) => (
              <div
                key={scene.id}
                className="flex items-center gap-4 rounded-md border border-[#2A2A30] bg-[#1C1C1F] p-3 transition-colors hover:border-[#3B82F6]"
              >
                {/* Scene Number */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#141416] font-mono text-xs text-[#888891]">
                  {i + 1}
                </div>

                {/* Scene Thumbnail */}
                <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
                  {scene.type === "video" ? (
                    <Film className="h-6 w-6 text-white/20" />
                  ) : scene.type === "image" ? (
                    <Image className="h-6 w-6 text-white/20" />
                  ) : (
                    <Type className="h-6 w-6 text-white/20" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="text-[13px] font-semibold">{scene.title}</div>
                  <div className="text-xs text-[#888891]">{scene.description}</div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[#888891]">{scene.duration}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                    scene.status === "generating"
                      ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                      : "bg-[#F59E0B]/10 text-[#F59E0B]"
                  }`}>
                    {scene.status}
                  </span>
                  <Button variant="ghost" size="sm" className="text-[11px] text-[#888891]">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
