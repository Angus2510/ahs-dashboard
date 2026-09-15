"use client";

import * as React from "react";
import {
  Target,
  Calendar,
  CheckCircle2,
  TrendingUp,
  User,
  Users,
  FolderKanban,
  GraduationCap,
  Sparkles,
  Compass,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockGoals } from "@/lib/mock-data/goals";
import { Goal, GoalCategory, GoalStatus } from "@/types/goal";

const categories: { label: GoalCategory; icon: React.ElementType }[] = [
  { label: "Personal Sales Goals", icon: User },
  { label: "Team Goals", icon: Users },
  { label: "Monthly Targets", icon: Calendar },
  { label: "Projects", icon: FolderKanban },
  { label: "Development Goals", icon: GraduationCap },
  { label: "Long-Term Reservations / Operational Projects", icon: Compass },
];

function getStatusBadgeClass(status: GoalStatus) {
  switch (status) {
    case "Completed":
      return "border-[#cdddc8] bg-[#edf5e8] text-[#35522c] font-semibold";
    case "Ahead":
      return "border-[#c9ded0] bg-[#eef7f2] text-[#2c4f3d] font-semibold";
    case "On Track":
      return "border-[#dce2d6] bg-[#f2f6ee] text-[#3f4a36] font-medium";
    case "Needs Focus":
      return "border-[#f2ddb8] bg-[#fbf5e7] text-[#8a5e18] font-semibold";
    default:
      return "border-[#dce1d5] bg-[#f3f5ee] text-[#444e3b]";
  }
}

export default function GoalsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const filteredGoals = mockGoals.filter((g) => {
    if (selectedCategory === "All") return true;
    return g.category === selectedCategory;
  });

  const completedGoalsCount = mockGoals.filter(
    (g) => g.status === "Completed" || g.percentage === 100,
  ).length;
  const avgCompletionPercentage = Math.round(
    mockGoals.reduce((sum, g) => sum + g.percentage, 0) / mockGoals.length,
  );

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1c221a] md:text-3xl">
              Goals
            </h1>
            <Badge variant="sage" className="px-2 font-bold">
              Performance &amp; Targets
            </Badge>
          </div>
          <p className="text-sm text-[#6c7465]">
            Track personal milestones, monthly targets, team goals, and
            long-term projects.
          </p>
        </div>

        {/* Top summary capsule */}
        <div className="flex items-center gap-3 rounded-lg border border-[#e2e6dc] bg-white px-3.5 py-1.5 text-xs text-[#525a4a] shadow-2xs self-start sm:self-auto">
          <span>
            Overall Average: <strong>{avgCompletionPercentage}%</strong>
          </span>
          <span className="h-3 w-px bg-[#dbe0d4]" />
          <span>
            <strong>{completedGoalsCount}</strong> of {mockGoals.length}{" "}
            Completed
          </span>
        </div>
      </div>

      {/* CATEGORY FILTER BUTTONS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#e2e6dc] pb-3">
        <Button
          variant={selectedCategory === "All" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("All")}
          className={`h-8 text-xs font-medium ${
            selectedCategory === "All"
              ? "bg-[#4a5441] text-white hover:bg-[#3b4333]"
              : "border-[#e2e6dc] text-[#555d4e] hover:bg-[#edf2e7]"
          }`}
        >
          All Categories ({mockGoals.length})
        </Button>

        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.label;
          const count = mockGoals.filter(
            (g) => g.category === cat.label,
          ).length;

          return (
            <Button
              key={cat.label}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.label)}
              className={`h-8 text-xs font-medium gap-1.5 ${
                isSelected
                  ? "bg-[#4a5441] text-white hover:bg-[#3b4333]"
                  : "border-[#e2e6dc] text-[#555d4e] hover:bg-[#edf2e7]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1 rounded-sm ${isSelected ? "bg-white/20 text-white" : "bg-[#edf1e8] text-[#5b6653]"}`}
              >
                {count}
              </span>
            </Button>
          );
        })}
      </div>

      {/* GOALS GRID */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredGoals.map((goal) => (
          <Card
            key={goal.id}
            className="border-[#e2e6dc] bg-white shadow-2xs transition-all hover:border-[#4a5441] hover:shadow-xs flex flex-col justify-between"
          >
            <div>
              <CardHeader className="p-4 pb-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6a7460] truncate max-w-[65%]">
                    {goal.category}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] shrink-0 ${getStatusBadgeClass(
                      goal.status,
                    )}`}
                  >
                    {goal.status}
                  </span>
                </div>
                <CardTitle className="font-serif text-base font-bold text-[#1c221a] leading-tight">
                  {goal.title}
                </CardTitle>
                <CardDescription className="text-xs text-[#6a7262] leading-relaxed">
                  {goal.description}
                </CardDescription>
              </CardHeader>
            </div>

            <CardContent className="p-4 pt-1 space-y-3">
              {/* Target & Current Values */}
              <div className="flex items-baseline justify-between rounded-lg bg-[#fafbf8] border border-[#edf1e8] p-2.5 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#79836e] block">
                    Current
                  </span>
                  <p className="font-serif text-base font-bold text-[#1c221a]">
                    {goal.current}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold text-[#79836e] block">
                    Target
                  </span>
                  <p className="text-xs font-semibold text-[#4c5545]">
                    {goal.target}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[#6a7262]">
                  <span className="font-medium text-[#2d3427]">
                    {goal.percentage}% Completed
                  </span>
                  <span>Due: {goal.dueDate}</span>
                </div>
                <Progress
                  value={goal.percentage}
                  className="h-2 bg-[#eef1ea]"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
