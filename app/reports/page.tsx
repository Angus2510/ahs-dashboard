"use client";

import * as React from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Layers,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Star,
  Download,
  Info,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  reportSummaryMetrics,
  salesSummaryRows,
} from "@/lib/mock-data/reports";

function getMetricIcon(id: string) {
  switch (id) {
    case "pipeline-val":
      return <DollarSign className="h-4 w-4 text-[#4a5441]" />;
    case "active-opps":
      return <Layers className="h-4 w-4 text-[#4a5441]" />;
    case "bookings-month":
      return <CalendarCheck className="h-4 w-4 text-[#35522c]" />;
    case "actions-completed":
      return <CheckCircle2 className="h-4 w-4 text-[#35522c]" />;
    case "actions-outstanding":
      return <Clock className="h-4 w-4 text-[#9c392c]" />;
    case "bookings-watch":
      return <Star className="h-4 w-4 text-[#79836e]" />;
    default:
      return <BarChart3 className="h-4 w-4 text-[#4a5441]" />;
  }
}

export default function ReportsPage() {
  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1c221a] md:text-3xl">
              Reports
            </h1>
            <Badge variant="sage" className="px-2 font-bold">
              Management Summary
            </Badge>
          </div>
          <p className="text-sm text-[#6c7465]">
            High-level executive overview of sales velocity, pipeline value, and
            operational metrics.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs border-[#e2e6dc] bg-white text-[#3f4a36] hover:bg-[#edf2e7] self-start sm:self-auto"
        >
          <Download className="h-3.5 w-3.5 text-[#5e6b52]" />
          <span>Export Summary (CSV)</span>
        </Button>
      </div>

      {/* 6 SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reportSummaryMetrics.map((metric) => (
          <Card
            key={metric.id}
            className="border-[#e2e6dc] bg-white p-5 shadow-2xs transition-all hover:shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6a7262]">
                  {metric.label}
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf2e7]">
                  {getMetricIcon(metric.id)}
                </div>
              </div>
              <p className="font-serif text-2xl font-bold text-[#1c221a] sm:text-3xl mt-2">
                {metric.value}
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#f0f3eb] space-y-0.5">
              <span className="text-xs text-[#6a7262] block truncate">
                {metric.subtext}
              </span>
              {metric.trend && (
                <span
                  className={`text-[11px] font-medium block ${
                    metric.isPositive ? "text-[#548045]" : "text-[#a43b2d]"
                  }`}
                >
                  {metric.trend}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* SALES SUMMARY TABLE */}
      <Card className="border-[#e2e6dc] bg-white shadow-2xs overflow-hidden">
        <CardHeader className="p-4 pb-3 border-b border-[#e8ece2] bg-[#fafbf8]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div>
              <CardTitle className="font-serif text-base font-bold text-[#1c221a]">
                Sales &amp; Destination Summary
              </CardTitle>
              <CardDescription className="text-xs text-[#6a7262]">
                Breakdown of active opportunities, confirmed bookings, and
                conversion metrics by safari focus
              </CardDescription>
            </div>
            <span className="text-[11px] text-[#79836e] font-semibold">
              September 2026 YTD
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8f9f6] uppercase tracking-wider text-[#6c7465] border-b border-[#e5e7e0]">
                <tr>
                  <th className="py-3 px-4 font-semibold">
                    Safari Category / Region
                  </th>
                  <th className="py-3 px-3 font-semibold">Lead</th>
                  <th className="py-3 px-3 font-semibold text-center">
                    Active Deals
                  </th>
                  <th className="py-3 px-3 font-semibold">Pipeline Value</th>
                  <th className="py-3 px-3 font-semibold text-center">
                    Confirmed
                  </th>
                  <th className="py-3 px-3 font-semibold">Confirmed Revenue</th>
                  <th className="py-3 px-3 font-semibold">Conversion</th>
                  <th className="py-3 px-4 font-semibold text-right">
                    Avg Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf0e8]">
                {salesSummaryRows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-[#fafbf8] transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-[#1c221a]">
                      {row.category}
                    </td>
                    <td className="py-3.5 px-3 text-[#555d4e]">
                      <span className="inline-flex items-center rounded-md bg-[#edf1e8] px-2 py-0.5 text-[10px] font-semibold text-[#3a4432]">
                        {row.leadConsultant}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center text-[#2d3427] font-medium">
                      {row.activeDeals}
                    </td>
                    <td className="py-3.5 px-3 font-medium text-[#1c221a]">
                      {row.pipelineValue}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#edf5e8] text-[11px] font-bold text-[#35522c]">
                        {row.confirmedBookings}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-serif font-bold text-[#2d3427]">
                      {row.confirmedRevenue}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-[#4a5441]">
                        {row.conversionRate}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-[#4a5242]">
                      {row.avgBookingValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FUTURE ANALYTICS SYSTEM PLACEHOLDER */}
      <Card className="border border-dashed border-[#ccd6c5] bg-[#fafbf8] p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf2e7] text-[#4a5441]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-serif text-sm font-bold text-[#1c221a]">
                Advanced Analytics System (Future Phase)
              </h4>
              <p className="text-xs text-[#6a7262] leading-relaxed">
                Automated seasonal trend analysis, conversion velocity charts,
                and supplier yield metrics will plug in here once GoHighLevel
                integration is active.
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-8 text-xs border-[#dce2d6] text-[#3e4836] shrink-0"
          >
            <Link href="/ashley-sales">
              <span>View Active Pipeline</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
