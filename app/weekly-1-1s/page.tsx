"use client";

import * as React from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  Save,
  Plus,
  AlertTriangle,
  Trophy,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  User,
  ListTodo,
  Sparkles,
  ChevronRight,
  X,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { mockWeeklyMeetings } from "@/lib/mock-data/meetings";
import { WeeklyMeeting, MeetingActionItem } from "@/types/meeting";
import { ActionOwner, ActionPriority } from "@/types/action";

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

export default function Weekly11sPage() {
  const [meetings, setMeetings] =
    React.useState<WeeklyMeeting[]>(mockWeeklyMeetings);
  const [selectedMeetingId, setSelectedMeetingId] = React.useState<string>(
    mockWeeklyMeetings[0].id,
  );
  const [isEditing, setIsEditing] = React.useState(false);

  // Current active meeting object
  const currentMeeting =
    meetings.find((m) => m.id === selectedMeetingId) || meetings[0];

  // Form draft state for editing
  const [draftMeeting, setDraftMeeting] =
    React.useState<WeeklyMeeting>(currentMeeting);

  // Keep draft updated when changing meeting
  React.useEffect(() => {
    setDraftMeeting(currentMeeting);
    setIsEditing(false);
  }, [selectedMeetingId, currentMeeting]);

  // Toggle action completion inside the meeting
  const toggleActionItem = (actionId: string) => {
    setMeetings((prev) =>
      prev.map((m) => {
        if (m.id === currentMeeting.id) {
          return {
            ...m,
            actionItems: m.actionItems.map((item) =>
              item.id === actionId
                ? { ...item, completed: !item.completed }
                : item,
            ),
          };
        }
        return m;
      }),
    );
  };

  // Handle saving edits
  const handleSaveEdits = () => {
    setMeetings((prev) =>
      prev.map((m) => (m.id === draftMeeting.id ? draftMeeting : m)),
    );
    setIsEditing(false);
  };

  // Handle adding a new action item to the current meeting
  const [newActionTask, setNewActionTask] = React.useState("");
  const [newActionOwner, setNewActionOwner] =
    React.useState<ActionOwner>("Ashley");
  const [newActionPriority, setNewActionPriority] =
    React.useState<ActionPriority>("Medium");
  const [newActionDue, setNewActionDue] = React.useState("Next 1:1");
  const [isAddingAction, setIsAddingAction] = React.useState(false);

  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionTask.trim()) return;

    const newItem: MeetingActionItem = {
      id: `mact-${Date.now()}`,
      task: newActionTask.trim(),
      owner: newActionOwner,
      priority: newActionPriority,
      dueDate: newActionDue.trim() || "Next 1:1",
      completed: false,
    };

    setMeetings((prev) =>
      prev.map((m) => {
        if (m.id === currentMeeting.id) {
          return {
            ...m,
            actionItems: [newItem, ...m.actionItems],
          };
        }
        return m;
      }),
    );

    setNewActionTask("");
    setIsAddingAction(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1c221a] md:text-3xl">
              Weekly 1:1s
            </h1>
            <Badge variant="sage" className="px-2 font-bold">
              Ashley Sales
            </Badge>
          </div>
          <p className="text-sm text-[#6c7465]">
            Review pipeline health, deal coaching, pending items, and weekly
            agreed actions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDraftMeeting(currentMeeting);
                  setIsEditing(false);
                }}
                className="h-8 text-xs border-[#e2e6dc]"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveEdits}
                className="h-8 gap-1.5 bg-[#4a5441] text-white hover:bg-[#3b4333] text-xs shadow-xs"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="h-8 gap-1.5 text-xs border-[#e2e6dc] bg-white hover:bg-[#f2f5ee] text-[#333d2b]"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Meeting Notes</span>
            </Button>
          )}
        </div>
      </div>

      {/* 2-COLUMN LAYOUT: Left Meetings Sidebar & Right Main Meeting Workspace */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT COLUMN: Previous Meetings List (4 Cols) */}
        <div className="space-y-4 lg:col-span-4">
          <Card className="border-[#e2e6dc] bg-white shadow-2xs">
            <CardHeader className="p-4 pb-3 border-b border-[#e8ece2] bg-[#fafbf8]">
              <CardTitle className="font-serif text-sm font-bold text-[#1c221a]">
                Meeting History
              </CardTitle>
              <CardDescription className="text-xs text-[#6a7262]">
                Select a week to review notes and actions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 space-y-1.5">
              {meetings.map((meeting, index) => {
                const isSelected = meeting.id === currentMeeting.id;
                const pendingActions = meeting.actionItems.filter(
                  (a) => !a.completed,
                ).length;

                return (
                  <div
                    key={meeting.id}
                    onClick={() => {
                      setSelectedMeetingId(meeting.id);
                      setIsEditing(false);
                    }}
                    className={`group flex flex-col rounded-lg p-3 text-left transition-all cursor-pointer border ${
                      isSelected
                        ? "border-[#4a5441] bg-[#f4f7f0] shadow-xs"
                        : "border-transparent bg-white hover:bg-[#fafbf8] hover:border-[#e2e7dc]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[#6c7860]" />
                        <span
                          className={`text-xs font-bold ${
                            isSelected ? "text-[#2a3322]" : "text-[#1c221a]"
                          }`}
                        >
                          {meeting.date}
                        </span>
                      </div>
                      {index === 0 && (
                        <Badge
                          variant="sage"
                          className="h-4.5 px-1.5 text-[9px] font-bold"
                        >
                          Current
                        </Badge>
                      )}
                    </div>

                    <p className="mt-1 line-clamp-1 text-xs font-medium text-[#444c3c]">
                      {meeting.title.replace("Weekly 1:1 • ", "")}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-[#6e7766]">
                      <span>
                        {pendingActions > 0 ? (
                          <span className="font-medium text-[#8f3f33]">
                            {pendingActions} action
                            {pendingActions === 1 ? "" : "s"} due
                          </span>
                        ) : (
                          <span className="text-[#528043] font-medium">
                            All actions completed
                          </span>
                        )}
                      </span>
                      <ChevronRight
                        className={`h-3.5 w-3.5 transition-transform ${
                          isSelected
                            ? "text-[#4a5441] translate-x-0.5"
                            : "text-[#9ea797]"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Context Card */}
          <Card className="border-[#e2e6dc] bg-[#fafbf8] p-4 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#3a4432]">
              <Sparkles className="h-4 w-4 text-[#758462]" />
              <span>Meeting Cadence &amp; Coaching</span>
            </div>
            <p className="text-xs text-[#6e7766] leading-relaxed">
              Weekly 1:1s are held every Tuesday at 10:00 AM with Ashley. Topics
              automatically pull active high-value deals and follow-ups.
            </p>
          </Card>
        </div>

        {/* RIGHT MAIN AREA: Selected Meeting Details (8 Cols) */}
        <div className="space-y-5 lg:col-span-8">
          {/* Main Meeting Banner Card */}
          <Card className="border-[#e2e6dc] bg-white shadow-2xs p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#edf1e8] pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#79836e]">
                  Meeting Overview • {currentMeeting.date}
                </span>
                {isEditing ? (
                  <Input
                    value={draftMeeting.title}
                    onChange={(e) =>
                      setDraftMeeting({
                        ...draftMeeting,
                        title: e.target.value,
                      })
                    }
                    className="mt-1 font-serif text-lg font-bold text-[#1c221a]"
                  />
                ) : (
                  <h2 className="font-serif text-xl font-bold text-[#1c221a]">
                    {currentMeeting.title}
                  </h2>
                )}
              </div>
              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <Badge
                  variant="outline"
                  className="border-[#dce2d6] text-[#444e3a] text-xs"
                >
                  Ashley &amp; Kayleigh
                </Badge>
              </div>
            </div>

            {/* TOP DUAL CARDS: Wins & Risks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Wins Card */}
              <div className="rounded-lg border border-[#cdddc8] bg-[#f2f7ef] p-4 space-y-2">
                <div className="flex items-center gap-2 text-[#35522c]">
                  <Trophy className="h-4 w-4 text-[#4f7842]" />
                  <span className="font-serif text-sm font-bold">
                    Wins &amp; Highlights
                  </span>
                </div>
                {isEditing ? (
                  <Textarea
                    rows={3}
                    value={draftMeeting.wins}
                    onChange={(e) =>
                      setDraftMeeting({ ...draftMeeting, wins: e.target.value })
                    }
                    className="text-xs bg-white"
                  />
                ) : (
                  <p className="text-xs text-[#3b4c34] leading-relaxed whitespace-pre-line">
                    {currentMeeting.wins}
                  </p>
                )}
              </div>

              {/* Risks / Watchlist Card */}
              <div className="rounded-lg border border-[#f2d5cf] bg-[#fdf2f0] p-4 space-y-2">
                <div className="flex items-center gap-2 text-[#9a382a]">
                  <AlertTriangle className="h-4 w-4 text-[#a83d2e]" />
                  <span className="font-serif text-sm font-bold">
                    Risks / Things to Watch
                  </span>
                </div>
                {isEditing ? (
                  <Textarea
                    rows={3}
                    value={draftMeeting.risks}
                    onChange={(e) =>
                      setDraftMeeting({
                        ...draftMeeting,
                        risks: e.target.value,
                      })
                    }
                    className="text-xs bg-white"
                  />
                ) : (
                  <p className="text-xs text-[#6e2b21] leading-relaxed whitespace-pre-line">
                    {currentMeeting.risks}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* SECTION 1 & 2: Previous Discussion & Current Opportunities */}
          <div className="grid grid-cols-1 gap-5">
            {/* Current Opportunities Card */}
            <Card className="border-[#e2e6dc] bg-white shadow-2xs">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="font-serif text-sm font-bold text-[#1c221a]">
                  Current Opportunities
                </CardTitle>
                <CardDescription className="text-xs text-[#6a7262]">
                  High priority active deals and status checks
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                {isEditing ? (
                  <Textarea
                    rows={4}
                    value={draftMeeting.currentOpportunities}
                    onChange={(e) =>
                      setDraftMeeting({
                        ...draftMeeting,
                        currentOpportunities: e.target.value,
                      })
                    }
                    className="text-xs"
                  />
                ) : (
                  <div className="rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-3 text-xs text-[#2b3324] leading-relaxed whitespace-pre-line font-medium">
                    {currentMeeting.currentOpportunities}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Previous Discussion Card */}
            <Card className="border-[#e2e6dc] bg-white shadow-2xs">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="font-serif text-sm font-bold text-[#1c221a]">
                  Previous Discussion Recap
                </CardTitle>
                <CardDescription className="text-xs text-[#6a7262]">
                  Follow-ups from preceding check-ins
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                {isEditing ? (
                  <Textarea
                    rows={3}
                    value={draftMeeting.previousDiscussion}
                    onChange={(e) =>
                      setDraftMeeting({
                        ...draftMeeting,
                        previousDiscussion: e.target.value,
                      })
                    }
                    className="text-xs"
                  />
                ) : (
                  <p className="text-xs text-[#4c5444] leading-relaxed">
                    {currentMeeting.previousDiscussion}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* SECTION 3 & 4: What We're Waiting On & Next Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* What We're Waiting On */}
            <Card className="border-[#e2e6dc] bg-white shadow-2xs">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="font-serif text-sm font-bold text-[#1c221a]">
                  What We&apos;re Waiting On
                </CardTitle>
                <CardDescription className="text-xs text-[#6a7262]">
                  External client &amp; lodge dependencies
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                {isEditing ? (
                  <Textarea
                    rows={4}
                    value={draftMeeting.waitingOn}
                    onChange={(e) =>
                      setDraftMeeting({
                        ...draftMeeting,
                        waitingOn: e.target.value,
                      })
                    }
                    className="text-xs"
                  />
                ) : (
                  <p className="text-xs text-[#4c5444] leading-relaxed whitespace-pre-line">
                    {currentMeeting.waitingOn}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-[#e2e6dc] bg-white shadow-2xs">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="font-serif text-sm font-bold text-[#1c221a]">
                  Next Steps
                </CardTitle>
                <CardDescription className="text-xs text-[#6a7262]">
                  Immediate milestones and priority actions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                {isEditing ? (
                  <Textarea
                    rows={4}
                    value={draftMeeting.nextSteps}
                    onChange={(e) =>
                      setDraftMeeting({
                        ...draftMeeting,
                        nextSteps: e.target.value,
                      })
                    }
                    className="text-xs"
                  />
                ) : (
                  <p className="text-xs text-[#4c5444] leading-relaxed whitespace-pre-line">
                    {currentMeeting.nextSteps}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* SECTION 5: Coaching Notes */}
          <Card className="border-[#e2e6dc] bg-white shadow-2xs">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="font-serif text-sm font-bold text-[#1c221a]">
                Coaching Notes
              </CardTitle>
              <CardDescription className="text-xs text-[#6a7262]">
                Sales consultation guidance, technique refinements, and
                strategic alignment
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              {isEditing ? (
                <Textarea
                  rows={3}
                  value={draftMeeting.coachingNotes}
                  onChange={(e) =>
                    setDraftMeeting({
                      ...draftMeeting,
                      coachingNotes: e.target.value,
                    })
                  }
                  className="text-xs"
                />
              ) : (
                <div className="rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-3 text-xs text-[#3a4434] leading-relaxed">
                  {currentMeeting.coachingNotes}
                </div>
              )}
            </CardContent>
          </Card>

          {/* SECTION 6: Action Items (Connected to Actions Concept) */}
          <Card className="border-[#e2e6dc] bg-white shadow-2xs">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 border-b border-[#edf1e8] bg-[#fafbf8]">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="font-serif text-base font-bold text-[#1c221a]">
                    Agreed Action Items
                  </CardTitle>
                  <Badge
                    variant="sage"
                    className="h-5 px-1.5 text-[10px] font-bold"
                  >
                    {
                      currentMeeting.actionItems.filter((a) => !a.completed)
                        .length
                    }{" "}
                    open
                  </Badge>
                </div>
                <CardDescription className="text-xs text-[#6a7262]">
                  Action items assigned during this check-in
                </CardDescription>
              </div>

              {!isAddingAction && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAddingAction(true)}
                  className="h-7 text-xs gap-1 border-[#dce2d6] text-[#3e4836]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Action</span>
                </Button>
              )}
            </CardHeader>

            <CardContent className="p-4 space-y-3">
              {/* Inline Action Creator */}
              {isAddingAction && (
                <form
                  onSubmit={handleAddAction}
                  className="rounded-lg border border-[#dce3d5] bg-[#f9faf7] p-3.5 space-y-3"
                >
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1c221a]">
                      Task Description *
                    </label>
                    <Input
                      required
                      value={newActionTask}
                      onChange={(e) => setNewActionTask(e.target.value)}
                      placeholder="e.g. Follow up on safari proposal with client..."
                      className="h-8 text-xs bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="text-[11px] font-medium text-[#6a7262] block mb-1">
                        Owner
                      </label>
                      <select
                        value={newActionOwner}
                        onChange={(e) =>
                          setNewActionOwner(e.target.value as ActionOwner)
                        }
                        className="h-8 w-full rounded-md border border-[#e2e6dc] bg-white px-2 text-xs text-[#1c221a]"
                      >
                        <option value="Ashley">Ashley</option>
                        <option value="Me">Me</option>
                        <option value="Charianne">Charianne</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-[#6a7262] block mb-1">
                        Priority
                      </label>
                      <select
                        value={newActionPriority}
                        onChange={(e) =>
                          setNewActionPriority(e.target.value as ActionPriority)
                        }
                        className="h-8 w-full rounded-md border border-[#e2e6dc] bg-white px-2 text-xs text-[#1c221a]"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-[#6a7262] block mb-1">
                        Due Date
                      </label>
                      <Input
                        value={newActionDue}
                        onChange={(e) => setNewActionDue(e.target.value)}
                        placeholder="e.g. Next 1:1, Today"
                        className="h-8 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAddingAction(false)}
                      className="h-7 text-xs"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      className="h-7 bg-[#4a5441] text-white hover:bg-[#3b4333] text-xs"
                    >
                      Save Action
                    </Button>
                  </div>
                </form>
              )}

              {/* Action items list */}
              <div className="space-y-2">
                {currentMeeting.actionItems.length > 0 ? (
                  currentMeeting.actionItems.map((action) => (
                    <div
                      key={action.id}
                      onClick={() => toggleActionItem(action.id)}
                      className="flex items-center justify-between rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-3 text-xs transition-colors hover:bg-white cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                        <input
                          type="checkbox"
                          checked={action.completed}
                          onChange={() => toggleActionItem(action.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 rounded border-[#ccd4c4] text-[#4a5441] focus:ring-[#626e53] cursor-pointer shrink-0"
                        />
                        <span
                          className={`font-medium ${
                            action.completed
                              ? "line-through text-[#8f9788]"
                              : "text-[#1c221a]"
                          }`}
                        >
                          {action.task}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${getOwnerBadgeClass(
                            action.owner,
                          )}`}
                        >
                          {action.owner}
                        </span>
                        <span className="text-[11px] text-[#6e7766] whitespace-nowrap">
                          {action.dueDate}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold ${getPriorityBadgeClass(
                            action.priority,
                          )}`}
                        >
                          {action.priority}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#6e7766] py-2 text-center">
                    No action items recorded for this session.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
