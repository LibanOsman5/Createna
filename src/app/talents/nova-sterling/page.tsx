"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Download,
  Edit3,
  User,
  Mic,
  Palette,
  BookOpen,
  FileText,
  Image,
  Plus,
} from "lucide-react";
import Link from "next/link";

// ═══ Mock Talent Data ═══
const talent = {
  name: "Nova Sterling",
  handle: "@novasterling",
  bio: "Fashion-tech futurist & lifestyle muse",
  status: "active",
  assets: 482,
  prompts: 96,
  reach: "248.3K",
  characterDNA: {
    face: "Heart-shaped, high cheekbones, almond eyes",
    hair: "Silver-white, shoulder-length, sleek bob",
    body: "Athletic, 5'8\", lean build",
    age: "Appears 25-30",
    ethnicity: "Pan-Asian features",
    distinguishing: "Minimalist style, sharp jawline, signature silver streak",
  },
  voiceDNA: {
    provider: "ElevenLabs",
    voiceId: "el_ nova_sterling_v2",
    accent: "Transatlantic (modern)",
    cadence: "Measured, deliberate pauses for effect",
    tone: "Warm but authoritative, slight husk",
    languages: ["English", "French", "Japanese (basic)"],
  },
  styleVault: {
    aesthetics: ["Cyber-minimalist", "Architectural", "Monochromatic with neon accents"],
    colors: ["#FFFFFF", "#0A0A0B", "#8B5CF6", "#06D6A0"],
    outfits: 24,
    lastUpdated: "5 hours ago",
  },
  knowledge: {
    background: "Digital native born in Tokyo, raised between London and Seoul. Former UX designer turned AI ethics advocate.",
    expertise: ["Fashion tech", "Sustainable design", "AI-human interaction", "Future of retail"],
    personality: "Curious, sharp, forward-thinking. Asks 'why not?' more than 'why.'",
    relationships: "Part of the Aurora Studio collective. Mentors Axel Voss on brand positioning.",
    lore: "Once walked a fully AI-designed runway at Paris Digital Fashion Week. Started #TechWearWednesday.",
  },
};

// ═══ Feature Module Cards ═══
const modules = [
  { icon: User, title: "Character DNA", phase: "Phase 1", desc: "Physical traits — face, hair, body as reusable JSON" },
  { icon: Mic, title: "Voice DNA", phase: "Phase 2", desc: "Accent, cadence, tone — ElevenLabs integrated" },
  { icon: Palette, title: "Style Vault", phase: "Phase 1", desc: "Reference images → structured style metadata" },
  { icon: BookOpen, title: "Knowledge", phase: "Phase 1", desc: "Facts, lore, and relationships to ground AI generation" },
];

export default function TalentDetailPage() {
  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Link href="/talents" className="text-[#888891] hover:text-[#EDEDEF] transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{talent.name}</h2>
              <Badge className="bg-[#22C55E]/10 text-[#22C55E] border-0 text-[11px]">{talent.status}</Badge>
            </div>
            <p className="text-[13px] text-muted-foreground">{talent.handle} · {talent.bio}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-4 text-[13px] text-muted-foreground">
            <span className="font-mono font-semibold text-foreground">{talent.assets}</span> Assets
            <span className="font-mono font-semibold text-foreground">{talent.prompts}</span> Prompts
            <span className="font-mono font-semibold text-foreground">{talent.reach}</span> Reach
          </div>
          <div className="ml-3 flex gap-2">
            <Button variant="outline" size="sm" className="border-[#2A2A30] bg-[#1C1C1F] text-[13px]">
              <Download className="mr-1.5 h-3.5 w-3.5" /> Export Bible
            </Button>
            <Button size="sm" className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
              <Edit3 className="mr-1.5 h-3.5 w-3.5" /> Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="border-b border-border w-full justify-start rounded-none bg-transparent h-auto p-0 gap-0">
          {["Overview", "Character DNA", "Voice DNA", "Style Vault", "Knowledge"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase().replace(" ", "-")}
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#8B5CF6] rounded-none px-4 py-2.5 text-[13px] data-[state=active]:text-foreground text-muted-foreground"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {modules.map((mod) => (
              <Card key={mod.title} className="cursor-pointer border-[#2A2A30] bg-[#141416] transition-colors hover:border-[#8B5CF6]">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#8B5CF6]/10">
                      <mod.icon className="h-5 w-5 text-[#8B5CF6]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold">{mod.title}</h3>
                        <Badge className="bg-[#1C1C1F] text-[#5C5C66] border-0 text-[10px]">{mod.phase}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{mod.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Content Module */}
            <Card className="cursor-pointer border-[#2A2A30] bg-[#141416] transition-colors hover:border-[#8B5CF6]">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#22C55E]/10">
                    <FileText className="h-5 w-5 text-[#22C55E]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold">Content</h3>
                      <Badge className="bg-[#1C1C1F] text-[#5C5C66] border-0 text-[10px]">Phase 2</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Posts, reels, scripts, carousels — generate for any platform</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media Library */}
            <Card className="cursor-pointer border-[#2A2A30] bg-[#141416] transition-colors hover:border-[#8B5CF6]">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#3B82F6]/10">
                    <Image className="h-5 w-5 text-[#3B82F6]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold">Media Library</h3>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Searchable database of every generated image, video, and voice file</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Character DNA Tab */}
        <TabsContent value="character-dna" className="mt-4">
          <Card className="border-[#2A2A30] bg-[#141416]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Character DNA</h3>
                <Button variant="outline" size="sm" className="border-[#2A2A30] bg-[#1C1C1F] text-[13px]">
                  <Edit3 className="mr-1.5 h-3.5 w-3.5" /> Edit
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(talent.characterDNA).map(([key, value]) => (
                  <div key={key} className="rounded-md bg-[#1C1C1F] p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{key}</div>
                    <div className="mt-1 text-[13px]">{value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Voice DNA Tab */}
        <TabsContent value="voice-dna" className="mt-4">
          <Card className="border-[#2A2A30] bg-[#141416]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold">Voice DNA</h3>
                  <p className="text-xs text-muted-foreground">Powered by {talent.voiceDNA.provider}</p>
                </div>
                <Button variant="outline" size="sm" className="border-[#2A2A30] bg-[#1C1C1F] text-[13px]">
                  <Edit3 className="mr-1.5 h-3.5 w-3.5" /> Edit
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(talent.voiceDNA).filter(([k]) => k !== "provider").map(([key, value]) => (
                  <div key={key} className="rounded-md bg-[#1C1C1F] p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{key}</div>
                    <div className="mt-1 text-[13px]">{Array.isArray(value) ? value.join(", ") : value}</div>
                  </div>
                ))}
              </div>
              <Button size="sm" className="mt-3 bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20">
                <Mic className="mr-1.5 h-3.5 w-3.5" /> Preview Voice Sample
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Style Vault Tab */}
        <TabsContent value="style-vault" className="mt-4">
          <Card className="border-[#2A2A30] bg-[#141416]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold">Style Vault</h3>
                  <p className="text-xs text-muted-foreground">{talent.styleVault.outfits} outfits · Updated {talent.styleVault.lastUpdated}</p>
                </div>
                <Button size="sm" className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                  <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Outfit
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md bg-[#1C1C1F] p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Aesthetics</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {talent.styleVault.aesthetics.map((a) => (
                      <Badge key={a} className="bg-[#141416] text-[#EDEDEF] border-0 text-[11px]">{a}</Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-md bg-[#1C1C1F] p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Color Palette</div>
                  <div className="mt-1 flex gap-2">
                    {talent.styleVault.colors.map((c) => (
                      <div key={c} className="h-6 w-6 rounded border border-[#2A2A30]" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Knowledge Tab */}
        <TabsContent value="knowledge" className="mt-4">
          <Card className="border-[#2A2A30] bg-[#141416]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Knowledge Base</h3>
                <Button variant="outline" size="sm" className="border-[#2A2A30] bg-[#1C1C1F] text-[13px]">
                  <Edit3 className="mr-1.5 h-3.5 w-3.5" /> Edit
                </Button>
              </div>
              <div className="space-y-3">
                {Object.entries(talent.knowledge).map(([key, value]) => (
                  <div key={key} className="rounded-md bg-[#1C1C1F] p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{key}</div>
                    <div className="mt-1 text-[13px]">
                      {Array.isArray(value) ? value.join(" · ") : value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
