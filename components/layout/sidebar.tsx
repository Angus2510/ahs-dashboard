"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  CalendarCheck2,
  Users2,
  Compass,
  CheckSquare2,
  Target,
  BarChart3,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  children?: { name: string; href: string }[];
}

export const navigationItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Client Search",
    href: "/client-search",
    icon: Search,
  },
  {
    name: "Weekly 1:1s",
    href: "/weekly-1-1s",
    icon: CalendarCheck2,
    children: [{ name: "Ashley", href: "/weekly-1-1s/ashley" }],
  },
  {
    name: "Ashley Sales",
    href: "/ashley-sales",
    icon: Users2,
    children: [{ name: "Pipeline", href: "/ashley-sales/pipeline" }],
  },
  {
    name: "Reservations Updates",
    href: "/reservations",
    icon: Compass,
    children: [{ name: "Long-Term", href: "/reservations/long-term" }],
  },
  {
    name: "Actions",
    href: "/actions",
    icon: CheckSquare2,
  },
  {
    name: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
];

interface SidebarProps {
  className?: string;
  onItemClick?: () => void;
}

export function Sidebar({ className, onItemClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col justify-between bg-[#303629] text-[#e8ebe3] select-none",
        className,
      )}
    >
      {/* Top Header / Branding */}
      <div className="overflow-y-auto">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-[#414a38]">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#424b38] text-[#d6ded0] shadow-inner">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-widest text-[#f5f7f2]">
              A H S
            </span>
            <span className="text-[9px] font-medium tracking-[0.18em] text-[#9ca793] uppercase">
              Sales & Reservations Hub
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-3 px-3 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isExactActive = pathname === item.href;
            const isChildActive =
              item.children?.some((child) => pathname === child.href) ?? false;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : isExactActive || isChildActive;

            return (
              <div key={item.name} className="space-y-0.5">
                <Link
                  href={item.href}
                  onClick={onItemClick}
                  className={cn(
                    "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#454e3c] text-white shadow-xs font-semibold"
                      : "text-[#b6beaf] hover:bg-[#3b4333] hover:text-[#f0f2eb]",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive
                          ? "text-[#e2e7dd]"
                          : "text-[#8e9885] group-hover:text-[#d3dbcc]",
                      )}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.children && (
                    <ChevronRight
                      className={cn(
                        "h-3.5 w-3.5 transition-transform text-[#9ca793]",
                        isActive ? "rotate-90 text-[#e2e7dd]" : "",
                      )}
                    />
                  )}
                </Link>

                {/* Sub-items if present and active */}
                {item.children && (
                  <div
                    className={cn(
                      "pl-9 pr-2 space-y-0.5 pb-1 pt-0.5",
                      isActive ? "block" : "hidden",
                    )}
                  >
                    {item.children.map((child) => {
                      const isChildCurrent = pathname === child.href;
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={onItemClick}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                            isChildCurrent
                              ? "bg-[#525d48] text-white font-semibold"
                              : "text-[#9ca793] hover:bg-[#3d4535] hover:text-[#e4ebe0]",
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              isChildCurrent ? "bg-[#d8e2cb]" : "bg-[#6d7962]",
                            )}
                          />
                          <span>{child.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Scenic Card */}
      <div className="p-4 pt-2">
        <div className="relative overflow-hidden rounded-xl border border-[#444c3c] bg-linear-to-b from-[#3a4232] to-[#282d22] p-3.5 text-center shadow-md">
          {/* Decorative Safari Silhouette Graphic */}
          <div className="mb-2 flex items-center justify-center text-[#9ca793]/40">
            <svg
              className="h-9 w-auto opacity-70"
              viewBox="0 0 120 40"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 28 C12 22, 18 18, 22 14 C26 18, 32 22, 32 28 Z"
                opacity="0.6"
              />
              <path d="M22 28 L22 34 L21 34 L21 28 Z" />
              <path d="M70 32 C68 28, 70 24, 76 22 C82 20, 88 22, 92 24 C95 22, 98 24, 99 27 C101 27, 103 29, 102 33 L100 34 L98 34 L97 30 L95 34 L93 34 L92 28 L86 34 L84 34 L85 27 L80 34 L78 34 Z" />
              <path
                d="M0 35 L120 35"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
            </svg>
          </div>
          <p className="font-serif text-[11px] italic tracking-wide text-[#dbe2d4]">
            &ldquo;Extraordinary journeys.
            <br />
            Lasting impact.&rdquo;
          </p>
        </div>
      </div>
    </aside>
  );
}
