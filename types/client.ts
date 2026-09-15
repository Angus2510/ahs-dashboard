export type BookingStatus =
  | "Discovery"
  | "Proposal Sent"
  | "Decision Pending"
  | "Provisional Hold"
  | "Deposit Received"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export interface Client {
  id: string;
  name: string;
  destination: string;
  consultant: string;
  bookingStatus: BookingStatus;
  tripDate: string;
  value: string;
  notes: string;
}
