"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Camera, Film, FileText, Image, Send } from "lucide-react";

const contentTypes = [
  { id: "post", label: "Posts", icon: Camera, desc: "Instagram feed posts with captions" },
  { id: "reel", label: "Reels", icon: Film, desc: "Short-form vertical video scripts" },
  { id: "script", label: "Scripts", icon: FileText, desc: "Long-form video & voiceover scripts" },
  { id: "carousel", label: "Carousels", icon: Image, desc: "Multi-slide educational content" },
];

const recentContent = [
  { type: "Reel", title: "5 Techwear Trends for 2026", talent: "Nova Sterling", date: "2 hours ago", status: "generated" },
  { type: "Post", title: "The Future of Digital Fashion", talent: "Nova Sterling", date: "5 hours ago", status: "published" },
  { type: "Carousel", title: "AI Ethics: What Creators Should Know", talent: "Nova Sterling", date: "1 day ago", status: "generated" },
  { type: "Script", title: "Paris Digital Fashion Week Recap", talent: "Nova Sterling", date: "2 days ago", status: "draft" },
];

export default function ContentStudioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Content Studio</h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Generate posts, reels, scripts, and carousels for your AI talents.
        </p>
      </div>

      {/* Content Type Selector */}
      <div className="grid grid-cols-4 gap-3">
        {contentTypes.map((ct) => (
          <Card key={ct.id} className="cursor-pointer border-[#2A2A30] bg-[#141416] transition-all hover:border-[#8B5CF6] hover:bg-[#1C1C1F]">
            <CardContent className="p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-[#8B5CF6]/10">
                <ct.icon className="h-5 w-5 text-[#8B5CF6]" />
              </div>
              <h3 className="text-sm font-semibold">{ct.label}</h3>
              <p className="mt-1 text-[11px] text-muted-foreground">{ct.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generation Panel */}
      <Card className="border-[#2A2A30] bg-[#141416]">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Select defaultValue="nova-sterling">
              <SelectTrigger className="w-[200px] border-[#2A2A30] bg-[#1C1C1F] text-[13px]">
                <SelectValue placeholder="Select talent" />
              </SelectTrigger>
              <SelectContent className="border-[#2A2A30] bg-[#1C1C1F]">
                <SelectItem value="nova-sterling">Nova Sterling</SelectItem>
                <SelectItem value="axel-voss">Axel Voss</SelectItem>
                <SelectItem value="kai-mercer">Kai Mercer</SelectItem>
                <SelectItem value="lumi-hart">Lumi Hart</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="instagram">
              <SelectTrigger className="w-[150px] border-[#2A2A30] bg-[#1C1C1F] text-[13px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent className="border-[#2A2A30] bg-[#1C1C1F]">
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="twitter">X / Twitter</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="trending">
              <SelectTrigger className="w-[150px] border-[#2A2A30] bg-[#1C1C1F] text-[13px]">
                <SelectValue placeholder="Angle" />
              </SelectTrigger>
              <SelectContent className="border-[#2A2A30] bg-[#1C1C1F]">
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
                <SelectItem value="behind-scenes">Behind the Scenes</SelectItem>
                <SelectItem value="product">Product Showcase</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="ml-auto bg-[#8B5CF6] hover:bg-[#7C3AED]">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Generate
            </Button>
          </div>
          <textarea
            placeholder="Describe what you want to create... e.g. 'A carousel about sustainable fashion trends for 2026 with Nova's perspective on AI in design'"
            className="w-full rounded-md border border-[#2A2A30] bg-[#1C1C1F] p-3 text-[13px] text-foreground placeholder:text-muted-foreground min-h-[80px] resize-y outline-none focus:border-[#8B5CF6]"
          />
        </CardContent>
      </Card>

      {/* Recent Content */}
      <Card className="border-[#2A2A30] bg-[#141416]">
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b border-[#2A2A30] px-4 py-3">
            <h3 className="text-sm font-semibold">Recent Content</h3>
            <Button variant="ghost" size="sm" className="text-[13px] text-[#888891]">View all</Button>
          </div>
          {recentContent.map((item, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < recentContent.length - 1 ? "border-b border-[#2A2A30]" : ""}`}>
              <div className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                item.type === "Reel" ? "bg-[#EF4444]/10 text-[#EF4444]" :
                item.type === "Post" ? "bg-[#3B82F6]/10 text-[#3B82F6]" :
                item.type === "Carousel" ? "bg-[#F59E0B]/10 text-[#F59E0B]" :
                "bg-[#8B5CF6]/10 text-[#8B5CF6]"
              }`}>{item.type}</div>
              <div className="flex-1">
                <div className="text-[13px] font-medium">{item.title}</div>
                <div className="text-[11px] text-muted-foreground">{item.talent} · {item.date}</div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                item.status === "published" ? "bg-[#22C55E]/10 text-[#22C55E]" :
                item.status === "generated" ? "bg-[#3B82F6]/10 text-[#3B82F6]" :
                "bg-[#F59E0B]/10 text-[#F59E0B]"
              }`}>{item.status}</span>
              <Button variant="ghost" size="sm" className="h-7 text-[11px] text-[#888891]">
                <Send className="mr-1 h-3 w-3" /> Publish
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
