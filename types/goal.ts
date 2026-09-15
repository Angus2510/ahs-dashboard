export type GoalCategory =
  | "Personal Sales Goals"
  | "Team Goals"
  | "Monthly Targets"
  | "Projects"
  | "Development Goals"
  | "Long-Term Reservations / Operational Projects";

export type GoalStatus = "On Track" | "Ahead" | "Needs Focus" | "Completed";

export interface Goal {
  id: string;
  category: GoalCategory;
  title: string;
  description: string;
  target: string;
  current: string;
  percentage: number;
  dueDate: string;
  status: GoalStatus;
}
