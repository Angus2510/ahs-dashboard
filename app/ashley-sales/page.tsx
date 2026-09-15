import Link from "next/link"
import { ArrowRight, TrendingUp, DollarSign, Filter, Layers } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AshleySalesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1e231d] md:text-3xl">
            Ashley Sales
          </h1>
          <p className="text-sm text-[#6c7365]">
            Individual sales pipeline overview, deal stages, proposals, and conversion metrics.
          </p>
        </div>
        <Button asChild className="bg-[#4a5441] text-white hover:bg-[#3d4535]">
          <Link href="/ashley-sales/pipeline">
            <span>View Full Pipeline</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-[#e5e7e0] p-5">
          <span className="text-xs font-medium text-[#6c7365]">Total Pipeline Value</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1.5">USD 342,000</p>
          <span className="text-xs text-[#5b874b] font-medium">↑ 12% from last week</span>
        </Card>

        <Card className="border-[#e5e7e0] p-5">
          <span className="text-xs font-medium text-[#6c7365]">Active Opportunities</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1.5">18 Deals</p>
          <span className="text-xs text-[#5b874b] font-medium">↑ 4 from last week</span>
        </Card>

        <Card className="border-[#e5e7e0] p-5">
          <span className="text-xs font-medium text-[#6c7365]">Average Deal Size</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1.5">$19,000</p>
          <span className="text-xs text-[#6c7365]">Luxury safari packages</span>
        </Card>

        <Card className="border-[#e5e7e0] p-5">
          <span className="text-xs font-medium text-[#6c7365]">Conversion Rate</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1.5">23%</p>
          <span className="text-xs text-[#5b874b] font-medium">↑ 5% this month</span>
        </Card>
      </div>

      {/* Pipeline Summary Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border-[#e5e7e0] lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-serif text-lg">Sales Pipeline Stages</CardTitle>
                <CardDescription>Current distribution of opportunities across stages</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/ashley-sales/pipeline">Detailed View</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-[#e8ece3] bg-[#fbfbfa] p-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8c9485]" />
                  <span className="font-medium text-[#2d3427]">Discovery</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-[#6c7365]">6 opportunities</span>
                  <span className="font-semibold text-[#1e231d]">USD 78,000</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[#e8ece3] bg-[#fbfbfa] p-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#7a8c66]" />
                  <span className="font-medium text-[#2d3427]">Proposal Sent</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-[#6c7365]">5 opportunities</span>
                  <span className="font-semibold text-[#1e231d]">USD 96,000</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[#e8ece3] bg-[#fbfbfa] p-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#4a5441]" />
                  <span className="font-medium text-[#2d3427]">Invoice / Proposal</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-[#6c7365]">4 opportunities</span>
                  <span className="font-semibold text-[#1e231d]">USD 72,000</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[#e8ece3] bg-[#fbfbfa] p-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2d3427]" />
                  <span className="font-medium text-[#2d3427]">Booking Confirmed</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-[#6c7365]">3 opportunities</span>
                  <span className="font-semibold text-[#1e231d]">USD 96,000</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Highlighted Deals */}
        <Card className="border-[#e5e7e0]">
          <CardHeader>
            <CardTitle className="font-serif text-lg">One to Watch</CardTitle>
            <CardDescription>Top priority deal closing this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-[#dfe5d8] bg-[#f7f9f4] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#1e231d]">Sondus – Okavango Delta</span>
                <Badge variant="sage">Decision Pending</Badge>
              </div>
              <p className="text-xs text-[#6c7365]">
                High-value bespoke itinerary spanning 3 luxury mobile camps in Botswana.
              </p>
              <div className="flex items-center justify-between border-t border-[#e2e7dc] pt-2 text-xs">
                <span className="text-[#6c7365]">Target Travel: Nov 2026</span>
                <span className="font-serif font-bold text-sm text-[#2d3427]">USD 18,500</span>
              </div>
            </div>

            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/weekly-1-1s/ashley">Discuss in Next 1:1</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
