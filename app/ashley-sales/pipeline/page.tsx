import Link from "next/link"
import { ArrowLeft, Plus, DollarSign, Calendar, MapPin, UserCheck, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const pipelineStages = [
  {
    title: "Discovery",
    count: 6,
    total: "$78,000",
    deals: [
      { name: "Justin Family", destination: "Macatoo & Victoria Falls", value: "$9,800", date: "Mar 2027", tag: "Family with teens" },
      { name: "Emily - Kenya", destination: "Sosian & Mara", value: "$7,200", date: "Apr 2027", tag: "Exploring options" },
      { name: "Dr. Alistair Ross", destination: "Serengeti Migration", value: "$14,500", date: "Jul 2027", tag: "Photography safari" },
    ],
  },
  {
    title: "Proposal Sent",
    count: 5,
    total: "$96,000",
    deals: [
      { name: "Catherine Family", destination: "South Africa & Kruger", value: "$12,400", date: "Dec 2027", tag: "Group of 6" },
      { name: "Marcus & Sarah", destination: "Rwanda Gorillas", value: "$22,000", date: "Oct 2026", tag: "Honeymoon" },
    ],
  },
  {
    title: "Invoice / Decision",
    count: 4,
    total: "$72,000",
    deals: [
      { name: "Sondus", destination: "Okavango Delta", value: "$18,500", date: "Nov 2026", tag: "Decision pending" },
      { name: "Vanderbilt Group", destination: "Botswana & Zambia", value: "$34,000", date: "Jan 2027", tag: "Private charter" },
    ],
  },
  {
    title: "Booking Confirmed",
    count: 3,
    total: "$96,000",
    deals: [
      { name: "Elena Rostova", destination: "Namibia Dunes & Coast", value: "$16,500", date: "Sep 2026", tag: "Deposit paid" },
      { name: "Holt Family Safari", destination: "Tanzania Luxury Camps", value: "$41,000", date: "Dec 2026", tag: "Voucher issued" },
    ],
  },
]

export default function AshleyPipelinePage() {
  return (
    <div className="space-y-6">
      {/* Header & Navigation */}
      <div className="flex flex-col gap-3">
        <Button asChild variant="ghost" size="sm" className="w-fit gap-1 text-[#6c7365] hover:text-[#1e231d] -ml-2">
          <Link href="/ashley-sales">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Ashley Sales</span>
          </Link>
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1e231d] md:text-3xl">
              Sales Pipeline Board
            </h1>
            <p className="text-sm text-[#6c7365]">
              Active deals categorized by stage with live value aggregations and status updates.
            </p>
          </div>
          <Button className="bg-[#4a5441] text-white hover:bg-[#3d4535] gap-2">
            <Plus className="h-4 w-4" />
            <span>New Opportunity</span>
          </Button>
        </div>
      </div>

      {/* Kanban-style Columns */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {pipelineStages.map((stage) => (
          <div key={stage.title} className="flex flex-col space-y-3">
            {/* Stage Column Header */}
            <div className="flex items-center justify-between rounded-lg bg-[#eef1ea] px-3.5 py-2.5 border border-[#dce1d5]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-[#242b1f]">{stage.title}</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3d4535] text-[11px] font-bold text-white">
                  {stage.count}
                </span>
              </div>
              <span className="text-xs font-semibold text-[#525d48]">{stage.total}</span>
            </div>

            {/* Deal Cards */}
            <div className="space-y-3">
              {stage.deals.map((deal) => (
                <Card key={deal.name} className="border-[#e2e6dc] shadow-xs hover:border-[#6a775b] transition-all">
                  <CardContent className="p-4 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif font-bold text-sm text-[#1e231d]">{deal.name}</h4>
                      <Badge variant="outline" className="text-[10px] shrink-0 font-normal">
                        {deal.tag}
                      </Badge>
                    </div>

                    <div className="text-xs text-[#6c7365] space-y-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-[#879373]" />
                        <span className="truncate">{deal.destination}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-[#879373]" />
                        <span>Travel: {deal.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#f0f2eb] pt-2 text-xs">
                      <span className="font-serif font-bold text-[#2d3427]">{deal.value}</span>
                      <span className="text-[11px] text-[#6c7365] hover:text-[#1e231d] cursor-pointer">
                        View details →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
