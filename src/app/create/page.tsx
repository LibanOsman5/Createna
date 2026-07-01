"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  ArrowRight,
  Paperclip,
  Film,
  Camera,
  UserRound,
  ShoppingBag,
  GraduationCap,
  Briefcase,
  Smile,
} from "lucide-react";
import Link from "next/link";

const styles = [
  { value: "cinematic", label: "Cinematic" },
  { value: "ugc", label: "UGC Style" },
  { value: "product", label: "Product Demo" },
  { value: "anime", label: "Anime" },
  { value: "3d", label: "3D Render" },
  { value: "realistic", label: "Photorealistic" },
];

const avatars = [
  { value: "nova", label: "Nova Sterling", icon: "👩‍🦰" },
  { value: "axel", label: "Axel Voss", icon: "🧑‍💻" },
  { value: "kai", label: "Kai Mercer", icon: "💪" },
  { value: "lumi", label: "Lumi Hart", icon: "🌴" },
  { value: "none", label: "No Avatar", icon: "🎬" },
];

const suggestions = [
  { icon: Smile, text: "UGC video — morning skincare routine", color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10" },
  { icon: Briefcase, text: "Product promo — new tech gadget launch", color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10" },
  { icon: ShoppingBag, text: "Fashion haul — try-on with transitions", color: "text-[#22C55E]", bg: "bg-[#22C55E]/10" },
  { icon: GraduationCap, text: "Educational explainer — AI for beginners", color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
];

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
      {/* Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2A2A30] bg-[#1C1C1F] px-4 py-1.5">
        <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6]" />
        <span className="text-[13px] text-muted-foreground">Your AI Video Starts Here</span>
      </div>

      {/* Headline */}
      <h1 className="max-w-2xl text-center text-3xl font-bold tracking-tight">
        Create Videos Instantly with a{" "}
        <span className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
          Single Prompt
        </span>
      </h1>
      <p className="mt-3 max-w-xl text-center text-[14px] text-muted-foreground">
        Type your idea, pick a style or avatar, and our AI instantly turns it into a video or image.
        Preview in real-time, customize, and export with a single click.
      </p>

      {/* Mode Toggle */}
      <div className="mt-8 flex gap-1 rounded-lg bg-[#141416] border border-[#2A2A30] p-1">
        <span className="flex items-center gap-2 rounded-md bg-[#1C1C1F] px-4 py-2 text-[13px] font-medium text-foreground shadow-sm">
          <Film className="h-4 w-4" />
          Video
        </span>
        <span className="flex items-center gap-2 rounded-md px-4 py-2 text-[13px] font-medium text-muted-foreground">
          <Camera className="h-4 w-4" />
          Image
        </span>
      </div>

      {/* Main Input */}
      <div className="mt-6 w-full max-w-2xl">
        <div className="rounded-2xl border border-[#2A2A30] bg-[#141416] p-4 shadow-lg transition-all focus-within:border-[#8B5CF6] focus-within:shadow-xl">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the video you want to create... e.g. 'A cinematic product reveal for a luxury watch, slow camera pan, dramatic lighting'"
            className="w-full min-h-[80px] resize-none bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground outline-none"
          />

          {/* Toolbar */}
          <div className="flex items-center gap-2 border-t border-[#2A2A30] pt-3">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
              <Paperclip className="h-4 w-4" />
            </Button>

            <Select defaultValue="none">
              <SelectTrigger className="h-8 gap-1.5 rounded-full border-[#2A2A30] bg-[#1C1C1F] px-3 text-[12px] text-muted-foreground">
                <UserRound className="h-3.5 w-3.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-[#2A2A30] bg-[#1C1C1F]">
                {avatars.map((a) => (
                  <SelectItem key={a.value} value={a.value} className="text-[13px]">
                    <span className="mr-2">{a.icon}</span> {a.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select defaultValue="cinematic">
              <SelectTrigger className="h-8 gap-1.5 rounded-full border-[#2A2A30] bg-[#1C1C1F] px-3 text-[12px] text-muted-foreground">
                <Film className="h-3.5 w-3.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-[#2A2A30] bg-[#1C1C1F]">
                {styles.map((s) => (
                  <SelectItem key={s.value} value={s.value} className="text-[13px]">{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex-1" />

            <Button
              size="icon"
              className="h-9 w-9 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED]"
              disabled={!prompt.trim()}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="mt-8 w-full max-w-2xl">
        <p className="mb-3 text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
          Quick Ideas
        </p>
        <div className="grid grid-cols-2 gap-2">
          {suggestions.map((s) => (
            <button
              key={s.text}
              onClick={() => setPrompt(s.text)}
              className="flex items-center gap-3 rounded-xl border border-[#2A2A30] bg-[#141416] p-3 text-left transition-all hover:border-[#8B5CF6] hover:bg-[#1C1C1F]"
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <span className="text-[13px] text-muted-foreground">{s.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
