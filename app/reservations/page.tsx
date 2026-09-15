"use client";

import * as React from "react";
import Link from "next/link";
import {
  Plus,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  Compass,
  ArrowRight,
  User,
  Layers,
  Sparkles,
  BookmarkCheck,
  FolderKanban,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { initialReservationUpdates } from "@/lib/mock-data/reservations";
import {
  ReservationUpdate,
  ReservationPriority,
  ReservationAuthor,
} from "@/types/reservation";

function getPriorityBadgeClass(priority: ReservationPriority) {
  switch (priority) {
    case "URGENT":
      return "border-[#f4cfc8] bg-[#faebe7] text-[#a43b2d] font-bold";
    case "IMPORTANT":
      return "border-[#f2ddb8] bg-[#fbf5e7] text-[#8a5e18] font-semibold";
    case "NORMAL":
      return "border-[#dce2d6] bg-[#f2f6ee] text-[#3f4a36]";
    case "LONG-TERM":
      return "border-[#d1dcd5] bg-[#edf3f0] text-[#2c473f] font-semibold";
    default:
      return "border-[#dce1d5] bg-[#f3f5ee] text-[#444e3b]";
  }
}

function getAuthorBadgeClass(author: ReservationAuthor) {
  switch (author) {
    case "Charianne":
      return "bg-[#e8efe2] text-[#313f27] border-[#d4decb]";
    case "Kayleigh":
      return "bg-[#4a5441] text-white border-transparent";
    case "Ashley":
      return "bg-[#f1ebe1] text-[#4f422e] border-[#e2d7c5]";
    default:
      return "bg-[#edf1e8] text-[#333d2b] border-[#dce2d6]";
  }
}

export default function ReservationsPage() {
  const [updates, setUpdates] = React.useState<ReservationUpdate[]>(
    initialReservationUpdates,
  );
  const [activeTab, setActiveTab] = React.useState<
    "active" | "all" | "resolved"
  >("active");
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  // Form state for creating new update
  const [newUpdateText, setNewUpdateText] = React.useState("");
  const [newPriority, setNewPriority] =
    React.useState<ReservationPriority>("NORMAL");
  const [newAuthor, setNewAuthor] =
    React.useState<ReservationAuthor>("Kayleigh");
  const [newCategory, setNewCategory] = React.useState("");

  // Toggle resolved state
  const toggleResolved = (id: string) => {
    setUpdates((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, resolved: !item.resolved } : item,
      ),
    );
  };

  // Handle adding new update
  const handleAddUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdateText.trim()) return;

    const newEntry: ReservationUpdate = {
      id: `res-${Date.now()}`,
      update: newUpdateText.trim(),
      author: newAuthor,
      createdAt: "Just now",
      priority: newPriority,
      resolved: false,
      category: newCategory.trim() || undefined,
    };

    setUpdates((prev) => [newEntry, ...prev]);
    setNewUpdateText("");
    setNewPriority("NORMAL");
    setNewAuthor("Kayleigh");
    setNewCategory("");
    setIsAddOpen(false);
  };

  // Separate regular daily updates vs long-term items
  const dailyUpdates = updates.filter((u) => u.priority !== "LONG-TERM");
  const longTermItems = updates.filter((u) => u.priority === "LONG-TERM");

  // Filter daily feed based on active/resolved tabs
  const filteredDailyUpdates = dailyUpdates.filter((item) => {
    if (activeTab === "active") return !item.resolved;
    if (activeTab === "resolved") return item.resolved;
    return true;
  });

  const urgentCount = dailyUpdates.filter(
    (u) =>
      (u.priority === "URGENT" || u.priority === "IMPORTANT") && !u.resolved,
  ).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1c221a] md:text-3xl">
              Reservations Updates
            </h1>
            <Badge variant="sage" className="px-2 font-bold">
              Operations Hub
            </Badge>
          </div>
          <p className="text-sm text-[#6c7465]">
            Keep operational information visible and up to date.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsAddOpen(true)}
            className="bg-[#4a5441] text-white hover:bg-[#3b4333] shadow-xs gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Update</span>
          </Button>
        </div>
      </div>

      {/* TOP SUMMARY BAR */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-[#e2e6dc] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6a7262]">
              Active Operational Logs
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf2e7] text-[#4a5441]">
              <Compass className="h-4 w-4" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-[#1c221a] mt-1.5">
            {dailyUpdates.filter((u) => !u.resolved).length}
          </p>
          <span className="text-xs text-[#6a7262] mt-0.5 block">
            Shared between Kayleigh &amp; Charianne
          </span>
        </Card>

        <Card className="border-[#e2e6dc] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#a43b2d]">
              Urgent &amp; Holds Expiring
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#faeae7] text-[#a43b2d]">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-[#a43b2d] mt-1.5">
            {urgentCount}
          </p>
          <span className="text-xs text-[#a43b2d]/80 mt-0.5 block">
            Requires immediate reservation action
          </span>
        </Card>

        <Card className="border-[#e2e6dc] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#35544a]">
              Long-Term Projects
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#eaf2ef] text-[#2c473f]">
              <FolderKanban className="h-4 w-4" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-[#1c221a] mt-1.5">
            {longTermItems.length}
          </p>
          <span className="text-xs text-[#526f65] mt-0.5 block">
            Strategic supplier &amp; process items
          </span>
        </Card>
      </div>

      {/* 2-COLUMN WORKSPACE: Left Feed & Right Long-Term Column */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT AREA: Daily Update Feed (7 Cols) */}
        <div className="space-y-4 lg:col-span-7">
          <Card className="border-[#e2e6dc] bg-white shadow-2xs overflow-hidden">
            {/* Feed Header with Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#e8ece2] bg-[#fafbf8] p-4 gap-3">
              <div>
                <CardTitle className="font-serif text-base font-bold text-[#1c221a]">
                  Daily Operations Feed
                </CardTitle>
                <CardDescription className="text-xs text-[#6a7262]">
                  Live lodge notes, flight alterations, and hold status
                </CardDescription>
              </div>

              {/* View filter tabs */}
              <div className="flex items-center gap-1 bg-[#edf1e8] p-1 rounded-lg">
                {(["active", "all", "resolved"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold capitalize transition-colors ${
                      activeTab === tab
                        ? "bg-white text-[#1c221a] shadow-xs"
                        : "text-[#6a7262] hover:text-[#1c221a]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Updates list */}
            <div className="divide-y divide-[#edf1e8] p-1">
              {filteredDailyUpdates.length > 0 ? (
                filteredDailyUpdates.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col gap-2.5 p-4 transition-colors hover:bg-[#fafbf8] ${
                      item.resolved ? "bg-[#fdfefa] opacity-65" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      {/* Priority and Category tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] ${getPriorityBadgeClass(
                            item.priority,
                          )}`}
                        >
                          {item.priority}
                        </span>
                        {item.category && (
                          <span className="text-[11px] font-semibold text-[#6e7766]">
                            • {item.category}
                          </span>
                        )}
                      </div>

                      {/* Author + Timestamp */}
                      <div className="flex items-center gap-2 shrink-0 text-xs">
                        <span
                          className={`inline-flex items-center rounded-md border px-1.5 py-0.2 text-[10px] font-semibold ${getAuthorBadgeClass(
                            item.author,
                          )}`}
                        >
                          {item.author}
                        </span>
                        <span className="text-[11px] text-[#8a9284]">
                          {item.createdAt}
                        </span>
                      </div>
                    </div>

                    {/* Update Text */}
                    <p
                      className={`text-xs leading-relaxed ${
                        item.resolved
                          ? "line-through text-[#8e9686]"
                          : "text-[#1c221a] font-medium"
                      }`}
                    >
                      {item.update}
                    </p>

                    {/* Resolved Button / Checkbox footer */}
                    <div className="flex items-center justify-end pt-1">
                      <button
                        onClick={() => toggleResolved(item.id)}
                        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                          item.resolved
                            ? "bg-[#edf5e8] text-[#3e6630] hover:bg-[#e2edd9]"
                            : "bg-[#f2f5ee] text-[#55604e] hover:bg-[#e6ebdf] hover:text-[#1c221a]"
                        }`}
                      >
                        <CheckCircle2
                          className={`h-3.5 w-3.5 ${
                            item.resolved ? "text-[#477a36]" : "text-[#79856f]"
                          }`}
                        />
                        <span>
                          {item.resolved ? "Resolved" : "Mark as resolved"}
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-xs text-[#6e7766]">
                  No reservation updates found in this view.
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* RIGHT AREA: Long-Term Section (Visually Distinct 5 Cols) */}
        <div className="space-y-4 lg:col-span-5">
          <Card className="border-[#c9d9d2] bg-linear-to-b from-[#f5f8f6] to-[#edf3f0] shadow-xs">
            <CardHeader className="p-4 pb-2 border-b border-[#d8e4de]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2c473f] text-white">
                    <FolderKanban className="h-3.5 w-3.5" />
                  </div>
                  <CardTitle className="font-serif text-base font-bold text-[#1a2e28]">
                    Long-Term
                  </CardTitle>
                </div>
                <Badge className="bg-[#2c473f] text-white text-[10px] hover:bg-[#2c473f]">
                  Strategic
                </Badge>
              </div>
              <CardDescription className="text-xs text-[#526f65]">
                Operational projects &amp; future issues that must not get lost
              </CardDescription>
            </CardHeader>

            <CardContent className="p-3.5 space-y-3">
              {longTermItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-[#cfe0d8] bg-white p-3.5 shadow-2xs space-y-2 transition-all hover:border-[#2c473f]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2c473f] bg-[#e6efec] px-2 py-0.5 rounded-sm">
                      {item.category || "Long-Term Project"}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span
                        className={`inline-flex items-center rounded-md border px-1.5 py-0.2 text-[10px] font-semibold ${getAuthorBadgeClass(
                          item.author,
                        )}`}
                      >
                        {item.author}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#22332d] leading-relaxed font-medium">
                    {item.update}
                  </p>

                  <div className="flex items-center justify-between border-t border-[#edf3f0] pt-2 text-[11px] text-[#6b8279]">
                    <span>Logged: {item.createdAt}</span>
                    <button
                      onClick={() => toggleResolved(item.id)}
                      className="hover:text-[#1a2e28] font-semibold transition-colors flex items-center gap-1"
                    >
                      <BookmarkCheck className="h-3.5 w-3.5" />
                      <span>{item.resolved ? "Archived" : "Active Item"}</span>
                    </button>
                  </div>
                </div>
              ))}

              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full text-xs border-[#c9d9d2] bg-white text-[#22332d] hover:bg-[#e4eee9] mt-2"
              >
                <Link
                  href="/reservations/long-term"
                  className="gap-1.5 flex items-center justify-center"
                >
                  <span>Open 2026/2027 Calendar View</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ADD UPDATE DIALOG */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md border-[#e2e6dc] shadow-2xl bg-white p-6">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl font-bold text-[#1c221a]">
              Add Reservation Update
            </DialogTitle>
            <DialogDescription className="text-xs text-[#6c7465]">
              Log a live lodge note, flight update, or long-term operational
              project.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddUpdate} className="space-y-4 pt-2">
            {/* Update Text */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1c221a]">
                Update Description *
              </label>
              <Textarea
                required
                rows={3}
                value={newUpdateText}
                onChange={(e) => setNewUpdateText(e.target.value)}
                placeholder="e.g. Bushwillow provisional hold expiry date, airstrip maintenance notes..."
                className="text-xs"
              />
            </div>

            {/* Priority Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1c221a]">
                Priority Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {(
                  [
                    "URGENT",
                    "IMPORTANT",
                    "NORMAL",
                    "LONG-TERM",
                  ] as ReservationPriority[]
                ).map((p) => (
                  <Button
                    key={p}
                    type="button"
                    variant={newPriority === p ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewPriority(p)}
                    className={`h-8 text-[10px] font-bold px-1 ${
                      newPriority === p
                        ? p === "LONG-TERM"
                          ? "bg-[#2c473f] text-white"
                          : "bg-[#4a5441] text-white"
                        : "border-[#e2e6dc] text-[#555d4e]"
                    }`}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>

            {/* Author and Category */}
            <div className="grid grid-cols-2 gap-3">
              {/* Author */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1c221a]">
                  Author
                </label>
                <select
                  value={newAuthor}
                  onChange={(e) =>
                    setNewAuthor(e.target.value as ReservationAuthor)
                  }
                  className="h-9 w-full rounded-md border border-[#e2e6dc] bg-white px-2.5 text-xs text-[#1c221a]"
                >
                  <option value="Kayleigh">Kayleigh</option>
                  <option value="Charianne">Charianne</option>
                  <option value="Ashley">Ashley</option>
                </select>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1c221a]">
                  Category (Optional)
                </label>
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g. Supplier Project, Hold"
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <DialogFooter className="pt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddOpen(false)}
                className="text-xs border-[#e2e6dc]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-[#4a5441] text-white hover:bg-[#3b4333] text-xs"
              >
                Post Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
