export type PriorityLevel = "High" | "Medium" | "Low"

export type BookingReason =
  | "High Value"
  | "Client Attention"
  | "Complicated Itinerary"
  | "At Risk"
  | "Good Opportunity"

export interface OverviewMetric {
  id: string
  title: string
  value: string
  trend: string
  isPositive: boolean
  icon: "conversations" | "watchlist" | "actions" | "opportunities" | "pipeline"
}

export interface BookingToWatchItem {
  id: string
  client: string
  destination: string
  subtitle: string
  value: string
  date: string
  starred: boolean
  imageGradient: string
  reason?: BookingReason
}

export interface RecentActivityItem {
  id: string
  initial: string
  actor: string
  action: string
  time: string
  category?: "fathom" | "ghl" | "client" | "internal"
}

export interface QuickLinkItem {
  id: string
  label: string
  href: string
  icon: "plus" | "calendar" | "report" | "ghl" | "fathom"
  isExternal?: boolean
}

export interface ActionListItem {
  id: string
  task: string
  priority: PriorityLevel
  dueDate: string
  completed: boolean
}

