import Link from "next/link"
import { ArrowRight, CalendarCheck2, Clock, CheckCircle2, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Weekly11sPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1e231d] md:text-3xl">
            Weekly 1:1s
          </h1>
          <p className="text-sm text-[#6c7365]">
            Team reviews, discussion agendas, deal coaching, and assigned action tracking.
          </p>
        </div>
        <Button asChild className="bg-[#4a5441] text-white hover:bg-[#3d4535]">
          <Link href="/weekly-1-1s/ashley">
            <span>Open Ashley 1:1 Hub</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-[#e5e7e0]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge variant="sage">Ashley</Badge>
              <span className="text-xs text-[#6c7365]">Weekly Recurring</span>
            </div>
            <CardTitle className="text-lg font-serif mt-2">Ashley Sales 1:1</CardTitle>
            <CardDescription>Pipeline review &amp; proposal coaching</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-[#f9faf7] border border-[#e8ece3] p-3 text-xs space-y-2">
              <div className="flex items-center justify-between text-[#555d4e]">
                <span className="font-medium">Upcoming Session:</span>
                <span>Thursday, 10:00 AM</span>
              </div>
              <div className="flex items-center justify-between text-[#555d4e]">
                <span className="font-medium">Active Opportunities:</span>
                <span className="font-semibold">7 active</span>
              </div>
              <div className="flex items-center justify-between text-[#555d4e]">
                <span className="font-medium">Pending Actions:</span>
                <span className="text-[#a4422e] font-semibold">3 due</span>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/weekly-1-1s/ashley">View Full Agenda &amp; Notes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7e0]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline">Reservations</Badge>
              <span className="text-xs text-[#6c7365]">Weekly Sync</span>
            </div>
            <CardTitle className="text-lg font-serif mt-2">Reservations &amp; Operations</CardTitle>
            <CardDescription>Lodge inventory, provisional holds, and client confirmations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-[#f9faf7] border border-[#e8ece3] p-3 text-xs space-y-2">
              <div className="flex items-center justify-between text-[#555d4e]">
                <span className="font-medium">Upcoming Session:</span>
                <span>Friday, 2:00 PM</span>
              </div>
              <div className="flex items-center justify-between text-[#555d4e]">
                <span className="font-medium">Pending Holds:</span>
                <span className="font-semibold">4 holds expiring</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full" disabled>
              Schedule Review
            </Button>
          </CardContent>
        </Card>

        <Card className="border-[#e5e7e0]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge variant="warm">Monthly</Badge>
              <span className="text-xs text-[#6c7365]">Strategy</span>
            </div>
            <CardTitle className="text-lg font-serif mt-2">Leadership &amp; Goals Review</CardTitle>
            <CardDescription>Monthly target alignment and quarterly forecast</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-[#f9faf7] border border-[#e8ece3] p-3 text-xs space-y-2">
              <div className="flex items-center justify-between text-[#555d4e]">
                <span className="font-medium">Status:</span>
                <span>On Track for Q3</span>
              </div>
              <div className="flex items-center justify-between text-[#555d4e]">
                <span className="font-medium">Revenue Target:</span>
                <span className="font-semibold">$450,000</span>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/goals">View Goals</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
