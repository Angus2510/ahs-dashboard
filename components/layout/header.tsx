"use client"

import * as React from "react"
import {
  Search,
  CheckSquare,
  Bell,
  Settings,
  Menu,
  Sun,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"

interface HeaderProps {
  user?: {
    name: string
    role: string
    avatar?: string
  }
}

export function Header({
  user = {
    name: "Kayleigh",
    role: "Sales & Reservations Lead",
  },
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#e2e5dc] bg-white/95 px-6 backdrop-blur-xs">
      {/* Left side: Mobile Menu Trigger + Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        {/* Mobile Navigation Sheet */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#3b4333] hover:bg-[#f0f2eb]"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar onItemClick={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Global Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c9485]" />
          <Input
            type="search"
            placeholder="Search clients, destinations, opportunities..."
            className="h-9 w-full rounded-lg border-[#e2e5dc] bg-[#f8f9f6] pl-9 pr-4 text-sm text-[#1e231d] placeholder:text-[#8c9485] focus-visible:bg-white focus-visible:ring-[#626e53]"
          />
        </div>
      </div>

      {/* Right side: Actions, Notifications, Settings, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Actions / To-Do */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="hidden sm:flex items-center gap-2 text-[#343c2c] hover:bg-[#f0f2eb]"
        >
          <a href="/actions">
            <CheckSquare className="h-4 w-4 text-[#5f6b52]" />
            <span className="text-sm font-medium">To-Do</span>
            <Badge
              variant="sage"
              className="h-5 min-w-5 px-1.5 text-[11px] font-semibold"
            >
              5
            </Badge>
          </a>
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-[#343c2c] hover:bg-[#f0f2eb]"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4 text-[#5f6b52]" />
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8c9979] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5f6b52]" />
          </span>
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          className="text-[#343c2c] hover:bg-[#f0f2eb]"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4 text-[#5f6b52]" />
        </Button>

        <div className="h-4 w-px bg-[#e2e5dc] mx-1 hidden sm:block" />

        {/* User Avatar & Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#626e53] focus:ring-offset-2">
              <Avatar className="h-8 w-8 cursor-pointer border border-[#d6dcce] transition-transform hover:scale-105">
                <AvatarImage src="/avatar.jpg" alt={user.name} />
                <AvatarFallback className="bg-[#48533e] text-white text-xs font-semibold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm font-medium text-[#1e231d]">{user.name}</p>
                <p className="text-xs text-[#6c7365]">{user.role}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-700">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
