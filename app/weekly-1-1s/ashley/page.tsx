import Link from "next/link"
import { ArrowLeft, Calendar, CheckCircle2, Clock, FileText, Plus, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Ashley11Page() {
  return (
    <div className="space-y-6">
      {/* Back button and header */}
      <div className="flex flex-col gap-3">
        <Button asChild variant="ghost" size="sm" className="w-fit gap-1 text-[#6c7365] hover:text-[#1e231d] -ml-2">
          <Link href="/weekly-1-1s">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Weekly 1:1s</span>
          </Link>
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1e231d] md:text-3xl">
                Weekly 1:1 with Ashley
              </h1>
              <Badge variant="sage">Active</Badge>
            </div>
            <p className="text-sm text-[#6c7365]">
              Discussion agendas, deal progression reviews, pipeline health, and agreed action items.
            </p>
          </div>
          <Button className="bg-[#4a5441] text-white hover:bg-[#3d4535] gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Agenda Item</span>
          </Button>
        </div>
      </div>

      {/* Snapshot Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="border-[#e5e7e0] p-4">
          <span className="text-xs font-medium text-[#6c7365]">Active Opps</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1">7</p>
          <span className="text-[11px] text-[#5b874b] font-medium">↑ 2 from last 1:1</span>
        </Card>
        <Card className="border-[#e5e7e0] p-4">
          <span className="text-xs font-medium text-[#6c7365]">Proposals Out</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1">2</p>
          <span className="text-[11px] text-[#6c7365]">Awaiting feedback</span>
        </Card>
        <Card className="border-[#e5e7e0] p-4">
          <span className="text-xs font-medium text-[#6c7365]">Invoices Pending</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1">1</p>
          <span className="text-[11px] text-[#6c7365]">Sondus ($18.5k)</span>
        </Card>
        <Card className="border-[#e5e7e0] p-4">
          <span className="text-xs font-medium text-[#6c7365]">Actions Due</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1">3</p>
          <span className="text-[11px] text-[#a4422e] font-medium">1 overdue</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Agenda & Notes */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-[#e5e7e0]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-serif">Current Session Agenda</CardTitle>
              <CardDescription>Topics for Thursday 10:00 AM check-in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border border-[#e8ece3] bg-[#fbfbfa] p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-[#1e231d]">1. Sondus Okavango Delta Proposal Review</span>
                  <Badge variant="outline">Priority</Badge>
                </div>
                <p className="text-xs text-[#6c7365]">
                  Client inquired about private game drive vehicle options and extended helicopter transfer between camps.
                </p>
              </div>

              <div className="rounded-lg border border-[#e8ece3] bg-[#fbfbfa] p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-[#1e231d]">2. Catherine Family Itinerary Adjustments</span>
                  <Badge variant="outline">Discussion</Badge>
                </div>
                <p className="text-xs text-[#6c7365]">
                  Cape Town lodging availability confirmed; waiting on final dates from family coordinator.
                </p>
              </div>

              <div className="rounded-lg border border-[#e8ece3] bg-[#fbfbfa] p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-[#1e231d]">3. Q4 Destination Focus &amp; Supplier Updates</span>
                  <Badge variant="outline">Strategy</Badge>
                </div>
                <p className="text-xs text-[#6c7365]">
                  Review updated green season rates for Botswana and Kenya partner lodges.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Previous Notes & Action items */}
        <div className="space-y-6">
          <Card className="border-[#e5e7e0]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-serif">Last Week Notes</CardTitle>
              <CardDescription>From 1:1 on 09 September 2026</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-[#52594a] space-y-2">
              <p>• Discussed Okavango options for Sondus; Ashley followed up with camp manager.</p>
              <p>• Reviewed new enquiry from Kenya (Emily - Sosian).</p>
              <p>• Next steps: follow up with Catherine family regarding Cape Town villa reservation.</p>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7e0]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-serif">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild variant="outline" size="sm" className="w-full justify-start text-xs">
                <Link href="/ashley-sales/pipeline">Open Ashley Pipeline View</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full justify-start text-xs">
                <Link href="/actions">View Assigned Action Items</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
