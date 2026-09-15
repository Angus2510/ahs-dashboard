export type ActionPriority = "High" | "Medium" | "Low";
export type ActionOwner = "Me" | "Ashley" | "Charianne";

export interface Action {
  id: string;
  task: string;
  client: string;
  dueDate: string;
  priority: ActionPriority;
  owner: ActionOwner;
  completed: boolean;
}
