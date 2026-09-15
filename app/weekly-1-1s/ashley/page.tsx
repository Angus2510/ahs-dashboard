import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Plus,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Ashley11Page() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Back button and header */}
      <div className="flex flex-col gap-3">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="w-fit gap-1 text-[#6c7365] hover:text-[#1e231d] -ml-2"
        >
          <Link href="/weekly-1-1s">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Weekly 1:1s</span>
          </Link>
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1c221a] md:text-3xl">
                Weekly 1:1 with Ashley
              </h1>
              <Badge variant="sage">Active</Badge>
            </div>
            <p className="text-sm text-[#6c7465]">
              Discussion agendas, deal progression reviews, pipeline health, and
              agreed action items.
            </p>
          </div>
          <Button className="bg-[#4a5441] text-white hover:bg-[#3d4535] gap-2 shadow-xs text-xs">
            <Plus className="h-4 w-4" />
            <span>Add Agenda Item</span>
          </Button>
        </div>
      </div>

      {/* Snapshot Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="border-[#e2e6dc] bg-white p-4 shadow-2xs">
          <span className="text-xs font-medium text-[#6c7465]">
            Active Opps
          </span>
          <p className="font-serif text-2xl font-bold text-[#1c221a] mt-1">7</p>
          <span className="text-[11px] text-[#548045] font-medium">
            ↑ 2 from last 1:1
          </span>
        </Card>
        <Card className="border-[#e2e6dc] bg-white p-4 shadow-2xs">
          <span className="text-xs font-medium text-[#6c7465]">
            Proposals Out
          </span>
          <p className="font-serif text-2xl font-bold text-[#1c221a] mt-1">2</p>
          <span className="text-[11px] text-[#6c7465]">Awaiting feedback</span>
        </Card>
        <Card className="border-[#e2e6dc] bg-white p-4 shadow-2xs">
          <span className="text-xs font-medium text-[#6c7465]">
            Invoices Pending
          </span>
          <p className="font-serif text-2xl font-bold text-[#1c221a] mt-1">1</p>
          <span className="text-[11px] text-[#6c7465]">Sondus ($18.5k)</span>
        </Card>
        <Card className="border-[#e2e6dc] bg-white p-4 shadow-2xs">
          <span className="text-xs font-medium text-[#6c7465]">
            Actions Due
          </span>
          <p className="font-serif text-2xl font-bold text-[#1c221a] mt-1">3</p>
          <span className="text-[11px] text-[#a43b2d] font-medium">
            1 overdue
          </span>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Agenda & Notes */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-[#e2e6dc] bg-white shadow-2xs">
            <CardHeader className="pb-3 border-b border-[#e8ece2] bg-[#fafbf8]">
              <CardTitle className="text-base font-serif font-bold text-[#1c221a]">
                Current Session Agenda
              </CardTitle>
              <CardDescription className="text-xs text-[#6c7465]">
                Topics for Thursday 10:00 AM check-in
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-[#1c221a]">
                    1. Sondus Okavango Delta Proposal Review
                  </span>
                  <Badge
                    variant="outline"
                    className="border-[#dce2d6] text-[#444e3a] text-[10px]"
                  >
                    Priority
                  </Badge>
                </div>
                <p className="text-xs text-[#6c7465] leading-relaxed">
                  Client inquired about private game drive vehicle options and
                  extended helicopter transfer between camps.
                </p>
              </div>

              <div className="rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-[#1c221a]">
                    2. Catherine Family Itinerary Adjustments
                  </span>
                  <Badge
                    variant="outline"
                    className="border-[#dce2d6] text-[#444e3a] text-[10px]"
                  >
                    Discussion
                  </Badge>
                </div>
                <p className="text-xs text-[#6c7465] leading-relaxed">
                  Cape Town lodging availability confirmed; waiting on final
                  dates from family coordinator.
                </p>
              </div>

              <div className="rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-[#1c221a]">
                    3. Q4 Destination Focus &amp; Supplier Updates
                  </span>
                  <Badge
                    variant="outline"
                    className="border-[#dce2d6] text-[#444e3a] text-[10px]"
                  >
                    Strategy
                  </Badge>
                </div>
                <p className="text-xs text-[#6c7465] leading-relaxed">
                  Review updated green season rates for Botswana and Kenya
                  partner lodges.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Previous Notes & Action items */}
        <div className="space-y-6">
          <Card className="border-[#e2e6dc] bg-white shadow-2xs">
            <CardHeader className="pb-3 border-b border-[#e8ece2] bg-[#fafbf8]">
              <CardTitle className="text-base font-serif font-bold text-[#1c221a]">
                Last Week Notes
              </CardTitle>
              <CardDescription className="text-xs text-[#6c7465]">
                From 1:1 on 09 September 2026
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 text-xs text-[#4a5441] space-y-2">
              <p>
                • Discussed Okavango options for Sondus; Ashley followed up with
                camp manager.
              </p>
              <p>• Reviewed new enquiry from Kenya (Emily - Sosian).</p>
              <p>
                • Next steps: follow up with Catherine family regarding Cape
                Town villa reservation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#e2e6dc] bg-white shadow-2xs">
            <CardHeader className="pb-3 border-b border-[#e8ece2] bg-[#fafbf8]">
              <CardTitle className="text-base font-serif font-bold text-[#1c221a]">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs border-[#e2e6dc]"
              >
                <Link href="/ashley-sales">Open Ashley Sales Pipeline</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs border-[#e2e6dc]"
              >
                <Link href="/actions">View Assigned Action Items</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
