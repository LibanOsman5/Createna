"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Video,
  Image,
  Users,
  Layers,
  BarChart3,
  Search,
  FolderOpen,
  Settings,
  ChevronUp,
  Sparkles,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: LayoutDashboard },
  { name: "Video Studio", href: "/create", icon: Video },
  { name: "Image Generator", href: "/create?tab=image", icon: Image },
  { name: "Talent Studio", href: "/talents", icon: Users },
  { name: "Pipelines", href: "/pipelines/editor", icon: Layers },
  { name: "Asset Library", href: "/assets", icon: FolderOpen },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Strategist", href: "/strategist", icon: Search },
];

// Quick-access talents
const talents = [
  { name: "Nova Sterling", handle: "@novasterling", active: true, color: "#8B5CF6" },
  { name: "Axel Voss", handle: "@axelvoss", active: false, color: "#3B82F6" },
  { name: "Kai Mercer", handle: "@kaimercer", active: true, color: "#22C55E" },
  { name: "Lumi Hart", handle: "@lumihart", active: true, color: "#F59E0B" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[200px] shrink-0 flex-col border-r border-[#2A2A30] bg-[#141416]">
      {/* Logo */}
      <div className="px-3 pb-2 pt-4">
        <Link href="/" className="flex items-center gap-1.5 font-mono text-[15px] font-bold tracking-tight">
          <Sparkles className="h-4 w-4 text-[#8B5CF6]" />
          <span>createna</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-4 overflow-y-auto px-2">
        <div className="space-y-0.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-[#1C1C1F] text-foreground"
                    : "text-muted-foreground hover:bg-[#1C1C1F] hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Quick Talent Access */}
        <div>
          <h3 className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
            Talents
          </h3>
          <div className="space-y-0.5">
            {talents.map((talent) => (
              <Link
                key={talent.name}
                href={`/talents/${talent.name.toLowerCase().replace(" ", "-")}`}
                className="flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[13px] text-muted-foreground hover:bg-[#1C1C1F] hover:text-foreground transition-colors"
              >
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: talent.active ? talent.color : "#5C5C66" }}
                />
                <span className="truncate">{talent.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Settings + User */}
      <div className="border-t border-[#2A2A30] p-3 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-[#1C1C1F] hover:text-foreground transition-colors"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <button className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-[#1C1C1F] hover:text-foreground transition-colors">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8B5CF6] text-[10px] font-bold text-white">
            LM
          </div>
          <span className="truncate">Liban Mourad</span>
        </button>
      </div>
    </aside>
  );
}
