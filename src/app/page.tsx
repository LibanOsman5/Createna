"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sparkles,
  ArrowRight,
  Video,
  Image,
  PenTool,
  UserRound,
  Users,
  Layers,
  FolderOpen,
  Megaphone,
  BarChart3,
  Search,
  CheckCircle,
  Shirt,
  Scissors,
  ZoomIn,
  Palette,
  Zap,
  Film,
  Clock,
} from "lucide-react";

/* ─── App definitions ─── */
const apps = [
  {
    section: "Core Creation",
    items: [
      {
        name: "Video Studio",
        description: "Create UGC ads, product demos, and social videos from a single prompt",
        href: "/create",
        icon: Video,
        color: "text-[#8B5CF6]",
        bg: "bg-[#8B5CF6]/10",
        border: "border-[#8B5CF6]/20",
        hover: "hover:border-[#8B5CF6]/40",
        status: null,
        cta: "Create",
      },
      {
        name: "AI Image Generator",
        description: "6 AI models — Flux, OpenAI, Ideogram, Nano Banana, SeeDream, Leonardo",
        href: "/create",
        icon: Image,
        color: "text-[#3B82F6]",
        bg: "bg-[#3B82F6]/10",
        border: "border-[#3B82F6]/20",
        hover: "hover:border-[#3B82F6]/40",
        status: { text: "BETA", color: "bg-[#3B82F6]/15 text-[#3B82F6]" },
        cta: "Open →",
      },
      {
        name: "Content Studio",
        description: "Generate posts, reels, scripts, and carousels for your AI talents",
        href: "/content-studio",
        icon: PenTool,
        color: "text-[#22C55E]",
        bg: "bg-[#22C55E]/10",
        border: "border-[#22C55E]/20",
        hover: "hover:border-[#22C55E]/40",
        status: null,
        cta: "Open →",
      },
      {
        name: "UGC Video Studio",
        description: "Face swap, style transfer, background replace, lip sync — upload + remix",
        href: "/ugc-studio",
        icon: UserRound,
        color: "text-[#F59E0B]",
        bg: "bg-[#F59E0B]/10",
        border: "border-[#F59E0B]/20",
        hover: "hover:border-[#F59E0B]/40",
        status: null,
        cta: "Open →",
      },
    ],
  },
  {
    section: "Talent & Production",
    items: [
      {
        name: "Talent Studio",
        description: "4 AI avatars — Nova, Axel, Kai, Lumi — with character DNA, voice, style vaults",
        href: "/talents",
        icon: Users,
        color: "text-[#8B5CF6]",
        bg: "bg-[#8B5CF6]/10",
        border: "border-[#8B5CF6]/20",
        hover: "hover:border-[#8B5CF6]/40",
        status: { text: "4 ACTIVE", color: "bg-[#22C55E]/15 text-[#22C55E]" },
        cta: "Manage →",
      },
      {
        name: "Pipelines",
        description: "7-stage AI production assembly line — brief → generate → QC → approve → publish",
        href: "/pipelines/editor",
        icon: Layers,
        color: "text-[#3B82F6]",
        bg: "bg-[#3B82F6]/10",
        border: "border-[#3B82F6]/20",
        hover: "hover:border-[#3B82F6]/40",
        status: { text: "3 ACTIVE", color: "bg-[#3B82F6]/15 text-[#3B82F6]" },
        cta: "Open →",
      },
      {
        name: "Campaigns",
        description: "Active campaigns with live metrics — engagement, reach, conversion tracking",
        href: "/campaigns",
        icon: Megaphone,
        color: "text-[#22C55E]",
        bg: "bg-[#22C55E]/10",
        border: "border-[#22C55E]/20",
        hover: "hover:border-[#22C55E]/40",
        status: { text: "3 LIVE", color: "bg-[#22C55E]/15 text-[#22C55E]" },
        cta: "View →",
      },
      {
        name: "Asset Library",
        description: "All generated videos, images, and assets — search, tag, download, version history",
        href: "/assets",
        icon: FolderOpen,
        color: "text-[#06B6D4]",
        bg: "bg-[#06B6D4]/10",
        border: "border-[#06B6D4]/20",
        hover: "hover:border-[#06B6D4]/40",
        status: null,
        cta: "Browse →",
      },
    ],
  },
  {
    section: "Analyze & Optimize",
    items: [
      {
        name: "Analytics",
        description: "Production metrics, cost per job, model performance, throughput dashboards",
        href: "/analytics",
        icon: BarChart3,
        color: "text-[#3B82F6]",
        bg: "bg-[#3B82F6]/10",
        border: "border-[#3B82F6]/20",
        hover: "hover:border-[#3B82F6]/40",
        status: null,
        cta: "Open →",
      },
      {
        name: "AI Strategist",
        description: "Research angles, discover trends, auto-generate briefs from competitor analysis",
        href: "/strategist",
        icon: Search,
        color: "text-[#F59E0B]",
        bg: "bg-[#F59E0B]/10",
        border: "border-[#F59E0B]/20",
        hover: "hover:border-[#F59E0B]/40",
        status: null,
        cta: "Open →",
      },
      {
        name: "Approvals",
        description: "Review queue with QC reports, frame-level feedback, batch approval mode",
        href: "/approvals",
        icon: CheckCircle,
        color: "text-[#EF4444]",
        bg: "bg-[#EF4444]/10",
        border: "border-[#EF4444]/20",
        hover: "hover:border-[#EF4444]/40",
        status: { text: "8 PENDING", color: "bg-[#F59E0B]/15 text-[#F59E0B]" },
        cta: "Review →",
      },
    ],
  },
  {
    section: "Coming Soon",
    items: [
      {
        name: "Mockup Generator",
        description: "Place your designs on product templates — t-shirts, hoodies, mugs, devices",
        href: "#",
        icon: Shirt,
        color: "text-[#F97316]",
        bg: "bg-[#F97316]/10",
        border: "border-[#F97316]/20",
        hover: "hover:border-[#F97316]/20",
        status: { text: "SOON", color: "bg-[#5C5C66]/15 text-[#5C5C66]" },
        cta: "Coming",
        disabled: true,
      },
      {
        name: "Background Remover",
        description: "One-click AI background removal — isolate subjects instantly",
        href: "#",
        icon: Scissors,
        color: "text-[#06B6D4]",
        bg: "bg-[#06B6D4]/10",
        border: "border-[#06B6D4]/20",
        hover: "hover:border-[#06B6D4]/20",
        status: { text: "SOON", color: "bg-[#5C5C66]/15 text-[#5C5C66]" },
        cta: "Coming",
        disabled: true,
      },
      {
        name: "Image Upscaler",
        description: "Enhance resolution up to 8x with AI — before/after comparison",
        href: "#",
        icon: ZoomIn,
        color: "text-[#6366F1]",
        bg: "bg-[#6366F1]/10",
        border: "border-[#6366F1]/20",
        hover: "hover:border-[#6366F1]/20",
        status: { text: "SOON", color: "bg-[#5C5C66]/15 text-[#5C5C66]" },
        cta: "Coming",
        disabled: true,
      },
      {
        name: "SVG Studio",
        description: "Generate SVG designs or convert images into clean vector graphics",
        href: "#",
        icon: Palette,
        color: "text-[#EC4899]",
        bg: "bg-[#EC4899]/10",
        border: "border-[#EC4899]/20",
        hover: "hover:border-[#EC4899]/20",
        status: { text: "SOON", color: "bg-[#5C5C66]/15 text-[#5C5C66]" },
        cta: "Coming",
        disabled: true,
      },
    ],
  },
];

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  return (
    <div className="space-y-10 pb-12">
      {/* ═══ Token Status Bar ═══ */}
      <div className="-mx-6 -mt-6 border-b border-[#2A2A30] bg-[#141416] px-6 py-3">
        <div className="flex items-center gap-8">
          {/* Monthly Tokens */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8B5CF6]/10">
              <Zap className="h-4 w-4 text-[#8B5CF6]" />
            </div>
            <div>
              <div className="font-mono text-[18px] font-bold tabular-nums leading-none">500</div>
              <div className="text-[11px] text-muted-foreground">monthly tokens</div>
            </div>
          </div>

          {/* Bonus Tokens */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#22C55E]/10">
              <Sparkles className="h-4 w-4 text-[#22C55E]" />
            </div>
            <div>
              <div className="font-mono text-[18px] font-bold tabular-nums leading-none">150</div>
              <div className="text-[11px] text-muted-foreground">bonus tokens</div>
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="h-8 text-[12px]">
              + Buy tokens
            </Button>
            <Button size="sm" className="h-8 bg-[#8B5CF6] text-[12px] hover:bg-[#7C3AED]">
              Upgrade
            </Button>
          </div>
        </div>
      </div>

      {/* ═══ Quick Create ═══ */}
      <div className="flex flex-col items-center pt-6">
        <h1 className="text-2xl font-bold tracking-tight">
          What do you want to{" "}
          <span className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
            create
          </span>
          ?
        </h1>
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          Describe your idea — we handle the AI models, rendering, and pipeline
        </p>

        {/* Prompt Input */}
        <div className="mt-5 w-full max-w-2xl">
          <div className="rounded-2xl border border-[#2A2A30] bg-[#141416] p-4 shadow-lg transition-all focus-within:border-[#8B5CF6]">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the video or image you want to create..."
              className="w-full min-h-[56px] resize-none bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground outline-none"
            />

            <div className="flex items-center gap-2 border-t border-[#2A2A30] pt-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
                <Film className="h-4 w-4" />
              </Button>

              <Select defaultValue="cinematic">
                <SelectTrigger className="h-8 gap-1.5 rounded-full border-[#2A2A30] bg-[#1C1C1F] px-3 text-[12px] text-muted-foreground w-auto">
                  <span className="text-[12px]">Style:</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[#2A2A30] bg-[#1C1C1F]">
                  <SelectItem value="cinematic">Cinematic</SelectItem>
                  <SelectItem value="ugc">UGC Style</SelectItem>
                  <SelectItem value="product">Product Demo</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                  <SelectItem value="3d">3D Render</SelectItem>
                  <SelectItem value="realistic">Photorealistic</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="nova">
                <SelectTrigger className="h-8 gap-1.5 rounded-full border-[#2A2A30] bg-[#1C1C1F] px-3 text-[12px] text-muted-foreground w-auto">
                  <span className="text-[12px]">Avatar:</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[#2A2A30] bg-[#1C1C1F]">
                  <SelectItem value="nova">Nova Sterling</SelectItem>
                  <SelectItem value="axel">Axel Voss</SelectItem>
                  <SelectItem value="kai">Kai Mercer</SelectItem>
                  <SelectItem value="lumi">Lumi Hart</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex-1" />

              <Button
                size="icon"
                className="h-9 w-9 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED]"
                disabled={!prompt.trim()}
                onClick={() => router.push("/create")}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Ideas */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {[
            { icon: "🎬", text: "UGC ad for skincare brand" },
            { icon: "📦", text: "Product demo for tech gadget" },
            { icon: "👗", text: "Fashion try-on with transitions" },
            { icon: "📚", text: "Educational explainer video" },
          ].map((s) => (
            <button
              key={s.text}
              onClick={() => setPrompt(s.text)}
              className="flex items-center gap-1.5 rounded-full border border-[#2A2A30] bg-[#141416] px-3.5 py-1.5 text-[12px] text-muted-foreground transition-all hover:border-[#8B5CF6] hover:text-foreground"
            >
              <span className="text-[13px]">{s.icon}</span>
              {s.text}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ App Grid ═══ */}
      {apps.map((section) => (
        <div key={section.section}>
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              {section.section}
            </h2>
            <div className="h-px flex-1 bg-[#2A2A30]" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {section.items.map((app) => {
              const isDisabled = "disabled" in app ? app.disabled : false;

              const card = (
                <div
                  className={`group relative flex flex-col rounded-xl border bg-[#141416] p-5 transition-all ${
                    isDisabled
                      ? `${app.border} cursor-default opacity-60`
                      : `${app.border} ${app.hover} cursor-pointer`
                  }`}
                >
                  {/* Status badge */}
                  {app.status && (
                    <div className="absolute right-4 top-4">
                      <span
                        className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${app.status.color}`}
                      >
                        {app.status.text}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${app.bg} mb-3`}>
                    <app.icon className={`h-5 w-5 ${app.color}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-[14px] font-semibold">{app.name}</h3>

                  {/* Description */}
                  <p className="mt-1 flex-1 text-[12px] leading-relaxed text-muted-foreground">
                    {app.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-4">
                    <span
                      className={`text-[12px] font-medium ${
                        isDisabled ? "text-muted-foreground" : app.color
                      }`}
                    >
                      {app.cta}
                    </span>
                  </div>
                </div>
              );

              return isDisabled ? (
                <div key={app.name}>{card}</div>
              ) : (
                <Link key={app.name} href={app.href}>
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
