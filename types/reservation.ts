export type ReservationPriority =
  | "URGENT"
  | "IMPORTANT"
  | "NORMAL"
  | "LONG-TERM";

export type ReservationAuthor = "Kayleigh" | "Charianne" | "Ashley";

export interface ReservationUpdate {
  id: string;
  update: string;
  author: ReservationAuthor;
  createdAt: string;
  priority: ReservationPriority;
  resolved: boolean;
  category?: string;
}
