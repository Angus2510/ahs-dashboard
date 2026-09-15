"use client";

import * as React from "react";
import Link from "next/link";
import {
  Layers,
  FileText,
  Receipt,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  MapPin,
  Calendar,
  Sparkles,
  ChevronRight,
  TrendingUp,
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
import { mockOpportunities } from "@/lib/mock-data/opportunities";
import {
  Opportunity,
  PipelineStage,
  OpportunityAttentionReason,
} from "@/types/opportunity";

const stages: PipelineStage[] = [
  "Discovery",
  "Proposal",
  "Invoice / Proposal",
  "Booking",
];

function getStageHeaderStyles(stage: PipelineStage) {
  switch (stage) {
    case "Discovery":
      return {
        bg: "bg-[#f5f6f3]",
        border: "border-[#e2e6dc]",
        text: "text-[#4a5441]",
        badge: "bg-[#e2e7dc] text-[#333d2b]",
      };
    case "Proposal":
      return {
        bg: "bg-[#f2f6ee]",
        border: "border-[#d8e2d2]",
        text: "text-[#3f4f34]",
        badge: "bg-[#d9e4d1] text-[#2c3d22]",
      };
    case "Invoice / Proposal":
      return {
        bg: "bg-[#f7f5ee]",
        border: "border-[#e6dfd1]",
        text: "text-[#5e543e]",
        badge: "bg-[#ede6d5] text-[#4d422c]",
      };
    case "Booking":
      return {
        bg: "bg-[#edf4e8]",
        border: "border-[#ccdcc7]",
        text: "text-[#284222]",
        badge: "bg-[#cde0c6] text-[#1c3316]",
      };
  }
}

function getAttentionBadgeClass(reason: OpportunityAttentionReason) {
  switch (reason) {
    case "No recent activity":
      return "border-[#f4d0cb] bg-[#faebe8] text-[#8e3226]";
    case "Proposal needs follow-up":
      return "border-[#f2ddb8] bg-[#fbf5e7] text-[#8a5e18]";
    case "High-value opportunity":
      return "border-[#ccd6c3] bg-[#edf2e8] text-[#333d2a]";
    case "Booking approaching deadline":
      return "border-[#f4cfc8] bg-[#faebe7] text-[#a43b2d] font-semibold";
    default:
      return "border-[#dce1d5] bg-[#f3f5ee] text-[#444e3b]";
  }
}

export default function AshleySalesPage() {
  const [opportunities] = React.useState<Opportunity[]>(mockOpportunities);

  // Aggregated metrics
  const activeOpportunitiesCount = opportunities.length;
  const totalPipelineValue = opportunities.reduce(
    (sum, o) => sum + o.numericValue,
    0,
  );
  const proposalsCount = opportunities.filter(
    (o) => o.stage === "Proposal",
  ).length;
  const bookingsCount = opportunities.filter(
    (o) => o.stage === "Booking",
  ).length;

  // Attention items
  const attentionOpportunities = opportunities.filter(
    (o) => o.attentionReason !== undefined,
  );

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1c221a] md:text-3xl">
              Ashley Sales
            </h1>
            <Badge variant="sage" className="px-2 font-bold">
              Sales Pipeline
            </Badge>
          </div>
          <p className="text-sm text-[#6c7465]">
            A clear view of the current sales pipeline.
          </p>
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs border-[#e2e6dc] bg-white self-start sm:self-auto"
        >
          <Link href="/weekly-1-1s">
            <Sparkles className="h-3.5 w-3.5 text-[#5e6b52]" />
            <span>Open 1:1 Hub</span>
          </Link>
        </Button>
      </div>

      {/* SUMMARY 4 CARDS */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-[#e2e6dc] bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6a7262]">
              Active Opportunities
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf2e7] text-[#4a5441]">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#1c221a] mt-2">
            {activeOpportunitiesCount}
          </p>
          <span className="text-xs text-[#548045] font-medium mt-1 block">
            ↑ 4 new inquiries this month
          </span>
        </Card>

        <Card className="border-[#e2e6dc] bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6a7262]">
              Pipeline Value
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf2e7] text-[#4a5441]">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#1c221a] mt-2">
            USD {totalPipelineValue.toLocaleString()}
          </p>
          <span className="text-xs text-[#548045] font-medium mt-1 block">
            ↑ 12% vs prior month
          </span>
        </Card>

        <Card className="border-[#e2e6dc] bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6a7262]">
              Proposals
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f4f7ef] text-[#4a5441]">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#1c221a] mt-2">
            {proposalsCount}
          </p>
          <span className="text-xs text-[#6a7262] mt-1 block">
            Awaiting client review
          </span>
        </Card>

        <Card className="border-[#e2e6dc] bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#35522c]">
              Bookings
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf5e8] text-[#35522c]">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#35522c] mt-2">
            {bookingsCount}
          </p>
          <span className="text-xs text-[#548045] font-medium mt-1 block">
            100% deposit confirmed
          </span>
        </Card>
      </div>

      {/* NEEDS ATTENTION SECTION */}
      <Card className="border-[#e2e6dc] bg-[#fbfbfa] shadow-2xs">
        <CardHeader className="p-4 pb-3 border-b border-[#e8ece2]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fcedea] text-[#9c392c]">
                <AlertTriangle className="h-3.5 w-3.5" />
              </div>
              <CardTitle className="font-serif text-base font-bold text-[#1c221a]">
                Needs Attention
              </CardTitle>
            </div>
            <Badge
              variant="outline"
              className="border-[#f4cfc8] bg-[#faebe7] text-[#9c392c] text-xs font-semibold"
            >
              {attentionOpportunities.length} opportunities
            </Badge>
          </div>
          <CardDescription className="text-xs text-[#6a7262]">
            High-value deals, stalled conversations, and impending deadlines
            requiring Ashley&apos;s intervention
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {attentionOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="rounded-lg border border-[#e2e6dc] bg-white p-3.5 shadow-2xs space-y-2.5 transition-all hover:border-[#4a5441]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-serif font-bold text-sm text-[#1c221a] truncate block">
                      {opp.client}
                    </span>
                    <span className="text-xs text-[#6a7262] flex items-center gap-1 truncate">
                      <MapPin className="h-3 w-3 text-[#7a886c] shrink-0" />
                      <span className="truncate">{opp.destination}</span>
                    </span>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#2d3427] shrink-0">
                    {opp.value}
                  </span>
                </div>

                {opp.attentionReason && (
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] ${getAttentionBadgeClass(
                      opp.attentionReason,
                    )}`}
                  >
                    {opp.attentionReason}
                  </span>
                )}

                <div className="rounded-md bg-[#fafbf8] border border-[#edf1e8] p-2 text-xs space-y-1 text-[#4a5242]">
                  <div className="flex items-center justify-between text-[11px] text-[#717a6c]">
                    <span>
                      Stage: <strong>{opp.stage}</strong>
                    </span>
                    <span>Last: {opp.lastActivity}</span>
                  </div>
                  <p className="text-[11px] font-medium text-[#1c221a] leading-tight pt-0.5">
                    → Next: {opp.nextAction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PIPELINE BY STAGES */}
      <div className="space-y-4">
        <div>
          <h2 className="font-serif text-lg font-bold text-[#1c221a]">
            Pipeline by Stage
          </h2>
          <p className="text-xs text-[#6a7262]">
            Detailed stage breakdown of all active opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage) => {
            const stageOpps = opportunities.filter((o) => o.stage === stage);
            const stageValue = stageOpps.reduce(
              (sum, o) => sum + o.numericValue,
              0,
            );
            const style = getStageHeaderStyles(stage);

            return (
              <div key={stage} className="flex flex-col space-y-3">
                {/* Stage Header Card */}
                <div
                  className={`flex items-center justify-between rounded-lg border p-3.5 shadow-2xs ${style.bg} ${style.border}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-serif font-bold text-sm ${style.text}`}
                    >
                      {stage}
                    </span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${style.badge}`}
                    >
                      {stageOpps.length}
                    </span>
                  </div>
                  <span className="font-serif text-xs font-bold text-[#2d3427]">
                    USD {stageValue.toLocaleString()}
                  </span>
                </div>

                {/* Stage Opportunities List */}
                <div className="space-y-3">
                  {stageOpps.map((opp) => (
                    <Card
                      key={opp.id}
                      className="border-[#e2e6dc] bg-white shadow-2xs transition-all hover:border-[#4a5441] hover:shadow-xs"
                    >
                      <CardContent className="p-4 space-y-2.5">
                        {/* Client & Value */}
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif font-bold text-sm text-[#1c221a] leading-tight">
                            {opp.client}
                          </h4>
                          <span className="font-serif font-bold text-sm text-[#2d3427] shrink-0">
                            {opp.value}
                          </span>
                        </div>

                        {/* Destination & Travel Date */}
                        <div className="text-xs text-[#6a7262] space-y-1">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3 text-[#7a886c] shrink-0" />
                            <span className="truncate">{opp.destination}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3 text-[#7a886c] shrink-0" />
                            <span>Trip: {opp.tripDate}</span>
                          </div>
                        </div>

                        {/* Attention badge if any */}
                        {opp.attentionReason && (
                          <div className="pt-0.5">
                            <span
                              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] ${getAttentionBadgeClass(
                                opp.attentionReason,
                              )}`}
                            >
                              {opp.attentionReason}
                            </span>
                          </div>
                        )}

                        <Separator className="bg-[#f0f3eb]" />

                        {/* Last Activity & Next Action */}
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center justify-between text-[11px] text-[#868f7f]">
                            <span>Last activity:</span>
                            <span className="font-medium text-[#4a5242]">
                              {opp.lastActivity}
                            </span>
                          </div>
                          <div className="rounded-md bg-[#fafbf8] border border-[#edf1e8] p-2 text-[11px] text-[#3e4736] leading-snug">
                            <span className="font-semibold block text-[10px] uppercase tracking-wider text-[#79836e] mb-0.5">
                              Next Action
                            </span>
                            {opp.nextAction}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
