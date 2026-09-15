"use client";

import * as React from "react";
import {
  Check,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  User,
  Calendar,
  Filter,
  ListTodo,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { initialActions } from "@/lib/mock-data/actions";
import { Action, ActionOwner, ActionPriority } from "@/types/action";

function getPriorityBadgeClass(priority: ActionPriority) {
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

function getOwnerBadgeClass(owner: ActionOwner) {
  switch (owner) {
    case "Me":
      return "bg-[#4a5441] text-white";
    case "Ashley":
      return "bg-[#e2e7dc] text-[#333c2a]";
    case "Charianne":
      return "bg-[#ebe4d8] text-[#4a3f2b]";
    default:
      return "bg-[#edf0e8] text-[#333d2b]";
  }
}

export default function ActionsPage() {
  const [actions, setActions] = React.useState<Action[]>(initialActions);
  const [activeFilter, setActiveFilter] = React.useState<string>("All");
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  // Form state for adding new action
  const [newTask, setNewTask] = React.useState("");
  const [newClient, setNewClient] = React.useState("");
  const [newDueDate, setNewDueDate] = React.useState("Today");
  const [newPriority, setNewPriority] =
    React.useState<ActionPriority>("Medium");
  const [newOwner, setNewOwner] = React.useState<ActionOwner>("Me");

  // Toggle action completion status
  const toggleAction = (id: string) => {
    setActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a)),
    );
  };

  // Handle adding new action
  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newActionItem: Action = {
      id: `act-${Date.now()}`,
      task: newTask.trim(),
      client: newClient.trim() || "General",
      dueDate: newDueDate.trim() || "Today",
      priority: newPriority,
      owner: newOwner,
      completed: false,
    };

    setActions((prev) => [newActionItem, ...prev]);
    setNewTask("");
    setNewClient("");
    setNewDueDate("Today");
    setNewPriority("Medium");
    setNewOwner("Me");
    setIsAddOpen(false);
  };

  // Metrics calculations
  const totalCount = actions.length;
  const completedCount = actions.filter((a) => a.completed).length;
  const outstandingCount = actions.filter((a) => !a.completed).length;
  const overdueCount = actions.filter(
    (a) =>
      !a.completed &&
      (a.dueDate === "Overdue" || a.dueDate.toLowerCase().includes("overdue")),
  ).length;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Filtered actions
  const filteredActions = actions.filter((action) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Mine") return action.owner === "Me";
    if (activeFilter === "Ashley") return action.owner === "Ashley";
    if (activeFilter === "Charianne") return action.owner === "Charianne";
    if (activeFilter === "Overdue") {
      return (
        !action.completed &&
        (action.dueDate === "Overdue" ||
          action.dueDate.toLowerCase().includes("overdue"))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1c221a] md:text-3xl">
            Actions
          </h1>
          <p className="text-sm text-[#6c7465]">
            Keep track of what needs to get done.
          </p>
        </div>

        <Button
          onClick={() => setIsAddOpen(true)}
          className="bg-[#4a5441] text-white hover:bg-[#3b4333] shadow-xs gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Action</span>
        </Button>
      </div>

      {/* TOP 3 SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Outstanding Card */}
        <Card className="border-[#e2e6dc] bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6a7262]">
              Outstanding
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf2e7] text-[#4a5441]">
              <ListTodo className="h-4 w-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#1c221a] mt-2">
            {outstandingCount}
          </p>
          <span className="text-xs text-[#6a7262] mt-1 block">
            Tasks currently pending action
          </span>
        </Card>

        {/* Overdue Card */}
        <Card className="border-[#e2e6dc] bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#a43b2d]">
              Overdue
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#faeae7] text-[#a43b2d]">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#a43b2d] mt-2">
            {overdueCount}
          </p>
          <span className="text-xs text-[#a43b2d]/80 mt-1 block">
            Requires immediate attention
          </span>
        </Card>

        {/* Completed Card */}
        <Card className="border-[#e2e6dc] bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#548045]">
              Completed
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf5e8] text-[#548045]">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#1c221a] mt-2">
            {completedCount}
          </p>
          <span className="text-xs text-[#548045] mt-1 block">
            Successfully resolved
          </span>
        </Card>
      </div>

      {/* PROGRESS INDICATOR CARD */}
      <Card className="border-[#e2e6dc] bg-white p-5 shadow-2xs">
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
            <span className="font-semibold text-[#1c221a] text-sm">
              Overall Action Progress
            </span>
            <span className="font-medium text-[#6a7262]">
              {completedCount} / {totalCount} actions completed (
              {progressPercent}%)
            </span>
          </div>
          <Progress value={progressPercent} className="h-2.5 bg-[#eef1ea]" />
        </div>
      </Card>

      {/* OUTSTANDING ACTIONS & FILTERS */}
      <Card className="border-[#e2e6dc] bg-white shadow-2xs overflow-hidden">
        {/* Filters Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#e8ece2] bg-[#fafbf8] p-4 gap-3">
          <div>
            <CardTitle className="font-serif text-base font-bold text-[#1c221a]">
              Outstanding Actions
            </CardTitle>
            <CardDescription className="text-xs text-[#6a7262]">
              Review, filter, and mark actions as complete
            </CardDescription>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "All", label: "All" },
              { id: "Mine", label: "Mine" },
              { id: "Ashley", label: "Ashley" },
              { id: "Charianne", label: "Charianne" },
              { id: "Overdue", label: "Overdue" },
            ].map((filter) => {
              const isSelected = activeFilter === filter.id;
              return (
                <Button
                  key={filter.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`h-8 text-xs font-medium ${
                    isSelected
                      ? "bg-[#4a5441] text-white hover:bg-[#3b4333]"
                      : "border-[#e2e6dc] text-[#555d4e] hover:bg-[#edf2e7]"
                  }`}
                >
                  {filter.label}
                  {filter.id === "Overdue" && overdueCount > 0 && (
                    <span className="ml-1.5 rounded-full bg-[#a43b2d] px-1.5 py-0.2 text-[10px] text-white font-bold">
                      {overdueCount}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Action Items List / Table */}
        <div className="divide-y divide-[#edf1e8]">
          {filteredActions.length > 0 ? (
            filteredActions.map((action) => (
              <div
                key={action.id}
                onClick={() => toggleAction(action.id)}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 transition-colors hover:bg-[#fafbf8] cursor-pointer gap-3 ${
                  action.completed ? "bg-[#fcfdfa] opacity-75" : ""
                }`}
              >
                {/* Checkbox + Task Name + Client */}
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <input
                    type="checkbox"
                    checked={action.completed}
                    onChange={() => toggleAction(action.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1 h-4 w-4 rounded border-[#ccd4c4] text-[#4a5441] focus:ring-[#626e53] cursor-pointer shrink-0"
                    aria-label={`Mark ${action.task} as completed`}
                  />
                  <div className="space-y-1 min-w-0">
                    <p
                      className={`text-sm font-medium leading-snug ${
                        action.completed
                          ? "line-through text-[#8f9788]"
                          : "text-[#1c221a]"
                      }`}
                    >
                      {action.task}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#6e7766]">
                      <span className="font-semibold text-[#424c3a]">
                        Client: {action.client}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Owner + Due Date + Priority */}
                <div className="flex items-center gap-3 self-end sm:self-center shrink-0 pl-7 sm:pl-0">
                  {/* Owner Badge */}
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${getOwnerBadgeClass(
                      action.owner,
                    )}`}
                  >
                    {action.owner}
                  </span>

                  {/* Due Date */}
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-sm ${
                      action.dueDate === "Overdue" ||
                      action.dueDate.toLowerCase().includes("overdue")
                        ? "bg-[#faeae7] text-[#a43b2d] font-bold"
                        : action.dueDate === "Today"
                          ? "text-[#1c221a] font-semibold"
                          : "text-[#6e7766]"
                    }`}
                  >
                    {action.dueDate}
                  </span>

                  {/* Priority Badge */}
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getPriorityBadgeClass(
                      action.priority,
                    )}`}
                  >
                    {action.priority}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-xs text-[#6e7766]">
              No actions match the selected filter.
            </div>
          )}
        </div>
      </Card>

      {/* ADD ACTION DIALOG */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md border-[#e2e6dc] shadow-2xl bg-white p-6">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl font-bold text-[#1c221a]">
              Add New Action
            </DialogTitle>
            <DialogDescription className="text-xs text-[#6c7465]">
              Create an action item and assign it to a team member.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddAction} className="space-y-4 pt-2">
            {/* Task */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1c221a]">
                Task Description *
              </label>
              <Input
                required
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="e.g. Follow up on safari proposal..."
                className="h-9 border-[#e2e6dc]"
              />
            </div>

            {/* Client */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1c221a]">
                Client / Reference
              </label>
              <Input
                value={newClient}
                onChange={(e) => setNewClient(e.target.value)}
                placeholder="e.g. Sondus Family, Catherine Family..."
                className="h-9 border-[#e2e6dc]"
              />
            </div>

            {/* Due Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1c221a]">
                Due Date
              </label>
              <Input
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                placeholder="e.g. Today, Tomorrow, Fri 20 Sep..."
                className="h-9 border-[#e2e6dc]"
              />
            </div>

            {/* Priority and Owner row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Priority */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1c221a]">
                  Priority
                </label>
                <div className="flex gap-1">
                  {(["High", "Medium", "Low"] as ActionPriority[]).map((p) => (
                    <Button
                      key={p}
                      type="button"
                      variant={newPriority === p ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewPriority(p)}
                      className={`flex-1 h-8 text-[11px] px-0 ${
                        newPriority === p
                          ? "bg-[#4a5441] text-white"
                          : "border-[#e2e6dc] text-[#555d4e]"
                      }`}
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Owner */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1c221a]">
                  Owner
                </label>
                <div className="flex gap-1">
                  {(["Me", "Ashley", "Charianne"] as ActionOwner[]).map((o) => (
                    <Button
                      key={o}
                      type="button"
                      variant={newOwner === o ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewOwner(o)}
                      className={`flex-1 h-8 text-[11px] px-0 ${
                        newOwner === o
                          ? "bg-[#4a5441] text-white"
                          : "border-[#e2e6dc] text-[#555d4e]"
                      }`}
                    >
                      {o}
                    </Button>
                  ))}
                </div>
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
                Create Action
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
