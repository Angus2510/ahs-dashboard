export type PipelineStage =
  | "Discovery"
  | "Proposal"
  | "Invoice / Proposal"
  | "Booking";

export type OpportunityAttentionReason =
  | "No recent activity"
  | "Proposal needs follow-up"
  | "High-value opportunity"
  | "Booking approaching deadline";

export interface Opportunity {
  id: string;
  client: string;
  destination: string;
  stage: PipelineStage;
  value: string;
  numericValue: number;
  lastActivity: string;
  nextAction: string;
  tripDate: string;
  attentionReason?: OpportunityAttentionReason;
}
