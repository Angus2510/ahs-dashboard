import Link from "next/link"
import { ArrowRight, Compass, ShieldAlert, Calendar, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ReservationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1e231d] md:text-3xl">
            Reservations Updates
          </h1>
          <p className="text-sm text-[#6c7365]">
            Lodge availability, provisional holds, confirmed bookings, and long-term safari reservations.
          </p>
        </div>
        <Button asChild className="bg-[#4a5441] text-white hover:bg-[#3d4535]">
          <Link href="/reservations/long-term">
            <span>Long-Term Calendar</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-[#e5e7e0] p-4">
          <span className="text-xs font-medium text-[#6c7365]">Confirmed Itineraries</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1">24 Trips</p>
          <span className="text-xs text-[#5b874b] font-medium">100% deposit received</span>
        </Card>

        <Card className="border-[#e5e7e0] p-4">
          <span className="text-xs font-medium text-[#6c7365]">Provisional Holds</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1">9 Holds</p>
          <span className="text-xs text-[#b8533e] font-medium">2 expiring in 48h</span>
        </Card>

        <Card className="border-[#e5e7e0] p-4">
          <span className="text-xs font-medium text-[#6c7365]">Partner Properties</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1">38 Lodges</p>
          <span className="text-xs text-[#6c7365]">Botswana, Kenya, SA, Rwanda</span>
        </Card>
      </div>

      {/* Recent Updates List */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border-[#e5e7e0] lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Recent Reservation Logs</CardTitle>
            <CardDescription>Live updates from property managers and concierge teams</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-[#e8ece3] bg-[#fbfbfa] p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-[#1e231d]">Bushwillow Lodge – Exclusive Villa Hold</span>
                <span className="text-xs text-[#8c9485]">6h ago</span>
              </div>
              <p className="text-xs text-[#6c7365]">
                Added by Charianne: Provisional hold placed for Catherine Family (Dec 2027 safari). Hold expires 24 Sept.
              </p>
            </div>

            <div className="rounded-lg border border-[#e8ece3] bg-[#fbfbfa] p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-[#1e231d]">Sosian Ranch – Kenya Airstrip Maintenance</span>
                <span className="text-xs text-[#8c9485]">Yesterday</span>
              </div>
              <p className="text-xs text-[#6c7365]">
                Airstrip resurfacing completed. Direct Cessna flights from Wilson airport running on normal schedule.
              </p>
            </div>

            <div className="rounded-lg border border-[#e8ece3] bg-[#fbfbfa] p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-[#1e231d]">Okavango Delta Water Levels</span>
                <span className="text-xs text-[#8c9485]">2 days ago</span>
              </div>
              <p className="text-xs text-[#6c7365]">
                Mokoro channels in prime condition for Q4 / Nov expeditions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border-[#e5e7e0]">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Lodge Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" size="sm" className="w-full justify-start text-xs">
              <Link href="/reservations/long-term">Open 2026/2027 Long-Term Calendar</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              Create New Property Note
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              Export Arrival Schedule (PDF)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
