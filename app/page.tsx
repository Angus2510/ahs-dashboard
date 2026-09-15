"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sun,
  Star,
  ArrowRight,
  Plus,
  Calendar,
  FileSpreadsheet,
  ExternalLink,
  Users2,
  CalendarCheck2,
  Layers,
  CircleDollarSign,
  Compass,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  overviewMetrics,
  bookingsToWatchData,
  recentActivityData,
  quickLinksData,
  actionListData,
} from "@/lib/mock-data/home";
import { PriorityLevel } from "@/types/dashboard";

function getMetricIcon(iconType: string) {
  switch (iconType) {
    case "conversations":
      return <Users2 className="h-4 w-4 text-[#606c54]" />;
    case "watchlist":
      return <Star className="h-4 w-4 text-[#606c54]" />;
    case "actions":
      return <CalendarCheck2 className="h-4 w-4 text-[#606c54]" />;
    case "opportunities":
      return <Layers className="h-4 w-4 text-[#606c54]" />;
    case "pipeline":
      return <CircleDollarSign className="h-4 w-4 text-[#606c54]" />;
    default:
      return <Compass className="h-4 w-4 text-[#606c54]" />;
  }
}

function getQuickLinkIcon(iconType: string) {
  switch (iconType) {
    case "plus":
      return <Plus className="h-3.5 w-3.5 text-[#5e6b52]" />;
    case "calendar":
      return <Calendar className="h-3.5 w-3.5 text-[#5e6b52]" />;
    case "report":
      return <FileSpreadsheet className="h-3.5 w-3.5 text-[#5e6b52]" />;
    case "ghl":
      return <ExternalLink className="h-3.5 w-3.5 text-[#5e6b52]" />;
    case "fathom":
      return <ExternalLink className="h-3.5 w-3.5 text-[#5e6b52]" />;
    default:
      return <ExternalLink className="h-3.5 w-3.5 text-[#5e6b52]" />;
  }
}

function getPriorityBadgeClass(priority: PriorityLevel) {
  switch (priority) {
    case "High":
      return "border-[#f6d0ca] bg-[#fbf0ee] text-[#a43b2d]";
    case "Medium":
      return "border-[#f0dec0] bg-[#faf5e9] text-[#875d1b]";
    case "Low":
      return "border-[#dbe3d3] bg-[#f1f5ed] text-[#4d5942]";
    default:
      return "border-[#dce1d6] bg-[#f0f2eb] text-[#4a5441]";
  }
}

export default function HomePage() {
  const [tasks, setTasks] = React.useState(actionListData);
  const [starredBookings, setStarredBookings] = React.useState<
    Record<string, boolean>
  >({
    "btw-1": true,
    "btw-2": true,
  });

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const toggleStar = (id: string) => {
    setStarredBookings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const pendingTaskCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1c221a] md:text-3xl">
            Good morning, Kayleigh
          </h1>
          <p className="text-xs sm:text-sm text-[#6c7465]">
            Here&apos;s what&apos;s happening across Sales &amp; Reservations.
          </p>
        </div>

        {/* Date, Weather & Location Capsule */}
        <div className="flex items-center gap-3 self-start rounded-lg border border-[#e2e6dc] bg-white px-3.5 py-1.5 text-xs text-[#525a4a] shadow-2xs sm:self-auto">
          <span>Tuesday, 16 September 2026</span>
          <span className="h-3 w-px bg-[#dbe0d4]" />
          <div className="flex items-center gap-1 font-medium">
            <Sun className="h-3.5 w-3.5 text-[#7f8e67]" />
            <span>18°C</span>
          </div>
          <span className="h-3 w-px bg-[#dbe0d4]" />
          <span className="font-medium text-[#2d3427]">Cape Town</span>
        </div>
      </div>

      {/* 5 KEY METRIC CARDS */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
        {overviewMetrics.map((metric) => (
          <Card
            key={metric.id}
            className="border-[#e2e6dc] bg-white p-4 shadow-2xs transition-all hover:shadow-xs"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f2f4ee]">
                {getMetricIcon(metric.icon)}
              </div>
              <span className="truncate text-xs font-medium text-[#656d5e]">
                {metric.title}
              </span>
            </div>
            <p className="font-serif text-xl font-bold tracking-tight text-[#1c221a] sm:text-2xl mt-2">
              {metric.value}
            </p>
            <span
              className={`mt-1 block text-[11px] font-medium ${
                metric.isPositive ? "text-[#548045]" : "text-[#b0402f]"
              }`}
            >
              {metric.trend}
            </span>
          </Card>
        ))}
      </div>

      {/* 4-PANEL DASHBOARD GRID (Scene 1 Layout) */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* PANEL 1: Top Bookings to Watch (4 Columns) */}
        <Card className="border-[#e2e6dc] shadow-2xs lg:col-span-4 bg-white flex flex-col justify-between">
          <div>
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <CardTitle className="font-serif text-sm font-bold text-[#1c221a]">
                Top Bookings to Watch
              </CardTitle>
              <Link
                href="/reservations/long-term"
                className="flex items-center gap-1 text-xs text-[#67705f] hover:text-[#1c221a] transition-colors font-medium"
              >
                <span>View all</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2.5">
              {bookingsToWatchData.map((booking) => {
                const isStarred =
                  starredBookings[booking.id] ?? booking.starred;
                return (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-2.5 transition-colors hover:bg-white"
                  >
                    {/* Thumbnail + Details */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`h-10 w-10 shrink-0 rounded-md bg-linear-to-br ${booking.imageGradient} flex flex-col items-center justify-center text-white shadow-2xs`}
                      >
                        <Compass className="h-4 w-4 opacity-75" />
                        <span className="text-[7px] tracking-widest font-semibold uppercase opacity-90">
                          AHS
                        </span>
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-xs font-bold text-[#1c221a] truncate">
                          {booking.client} – {booking.destination}
                        </p>
                        <p className="text-[11px] text-[#6b7364] truncate">
                          {booking.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Value + Star */}
                    <div className="flex items-center gap-2.5 shrink-0 pl-2">
                      <div className="text-right">
                        <p className="font-serif text-xs font-bold text-[#2d3427]">
                          {booking.value}
                        </p>
                        <p className="text-[10px] text-[#868f7f]">
                          {booking.date}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleStar(booking.id)}
                        className="text-[#9ea797] hover:text-[#5f6b52] transition-colors focus:outline-none"
                        aria-label="Star booking"
                      >
                        <Star
                          className={`h-4 w-4 ${
                            isStarred
                              ? "fill-[#7b8969] text-[#7b8969]"
                              : "text-[#c4cbc0]"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </div>
        </Card>

        {/* PANEL 2: Recent Activity (3 Columns) */}
        <Card className="border-[#e2e6dc] shadow-2xs lg:col-span-3 bg-white flex flex-col justify-between">
          <div>
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <CardTitle className="font-serif text-sm font-bold text-[#1c221a]">
                Recent Activity
              </CardTitle>
              <Link
                href="/weekly-1-1s"
                className="flex items-center gap-1 text-xs text-[#67705f] hover:text-[#1c221a] transition-colors font-medium"
              >
                <span>View all</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-3">
              {recentActivityData.map((item) => (
                <div key={item.id} className="flex items-start gap-2.5 text-xs">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#edf1e8] text-[11px] font-bold text-[#444f3b] border border-[#dde4d6]">
                    {item.initial}
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1c221a] text-xs">
                        {item.actor}
                      </span>
                      <span className="text-[10px] text-[#8a9284]">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#677060] leading-snug">
                      {item.action}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </div>
        </Card>

        {/* PANEL 3: Quick Links (2 Columns) */}
        <Card className="border-[#e2e6dc] shadow-2xs lg:col-span-2 bg-white flex flex-col justify-between">
          <div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="font-serif text-sm font-bold text-[#1c221a]">
                Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2">
              {quickLinksData.map((link) => (
                <Button
                  key={link.id}
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs border-[#e2e6dc] bg-[#fafbf8] hover:bg-[#f0f3eb] hover:text-[#1c221a] text-[#444d3d] h-8 px-2.5"
                >
                  <Link
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noreferrer" : undefined}
                    className="flex items-center gap-2 truncate"
                  >
                    {getQuickLinkIcon(link.icon)}
                    <span className="truncate font-medium">{link.label}</span>
                  </Link>
                </Button>
              ))}
            </CardContent>
          </div>
        </Card>

        {/* PANEL 4: Action List (3 Columns) */}
        <Card className="border-[#e2e6dc] shadow-2xs lg:col-span-3 bg-white flex flex-col justify-between">
          <div>
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="font-serif text-sm font-bold text-[#1c221a]">
                  Action List
                </CardTitle>
                <Badge
                  variant="sage"
                  className="h-4.5 px-1.5 text-[10px] font-bold bg-[#e3e9dc] text-[#3e4834]"
                >
                  {pendingTaskCount}
                </Badge>
              </div>
              <Link
                href="/actions"
                className="flex items-center gap-1 text-xs text-[#67705f] hover:text-[#1c221a] transition-colors font-medium"
              >
                <span>View all</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-start justify-between gap-2 border-b border-[#f0f3eb] pb-2 text-xs last:border-0 cursor-pointer group"
                >
                  <div className="flex items-start gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-0.5 h-3.5 w-3.5 rounded border-[#ccd3c4] text-[#4a5441] focus:ring-[#626e53] cursor-pointer"
                    />
                    <div className="min-w-0 space-y-1">
                      <p
                        className={`text-xs font-medium leading-tight ${
                          task.completed
                            ? "line-through text-[#99a293]"
                            : "text-[#1c221a] group-hover:text-[#424c38]"
                        }`}
                      >
                        {task.task}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full border px-1.5 py-0.2 text-[9px] font-medium ${getPriorityBadgeClass(
                          task.priority,
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#868f7f] whitespace-nowrap pt-0.5 font-medium">
                    {task.dueDate}
                  </span>
                </div>
              ))}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
