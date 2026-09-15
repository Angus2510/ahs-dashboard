import { ActionPriority, ActionOwner } from "./action";

export interface MeetingActionItem {
  id: string;
  task: string;
  owner: ActionOwner;
  priority: ActionPriority;
  dueDate: string;
  completed: boolean;
}

export interface WeeklyMeeting {
  id: string;
  date: string;
  title: string;
  previousDiscussion: string;
  currentOpportunities: string;
  waitingOn: string;
  nextSteps: string;
  coachingNotes: string;
  wins: string;
  risks: string;
  actionItems: MeetingActionItem[];
  // Future architecture placeholders for Fathom
  fathomTranscriptUrl?: string;
  fathomSummary?: string;
}
