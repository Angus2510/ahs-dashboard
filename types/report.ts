export interface ReportSummaryMetric {
  id: string;
  label: string;
  value: string;
  subtext: string;
  trend?: string;
  isPositive?: boolean;
}

export interface SalesSummaryRow {
  id: string;
  category: string;
  leadConsultant: string;
  activeDeals: number;
  pipelineValue: string;
  confirmedBookings: number;
  confirmedRevenue: string;
  conversionRate: string;
  avgBookingValue: string;
}
