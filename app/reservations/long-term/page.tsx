import Link from "next/link"
import { ArrowLeft, Calendar, Filter, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const longTermReservations = [
  {
    client: "Catherine Family",
    destination: "South Africa (Kruger + Cape Town)",
    dates: "Dec 12 - Dec 28, 2027",
    pax: "6 guests",
    status: "Provisional Hold",
    lodge: "Bushwillow & Ellerman House",
    depositDue: "24 Sept 2026",
    value: "$12,400",
  },
  {
    client: "Justin Family",
    destination: "Macatoo & Victoria Falls",
    dates: "Mar 15 - Mar 25, 2027",
    pax: "4 guests",
    status: "Planning / Quotes",
    lodge: "Macatoo Horse Safaris",
    depositDue: "15 Nov 2026",
    value: "$9,800",
  },
  {
    client: "Emily",
    destination: "Kenya (Sosian & Mara)",
    dates: "Apr 04 - Apr 16, 2027",
    pax: "1 guest",
    status: "Hold Pending",
    lodge: "Sosian Lodge + Mara Explorer",
    depositDue: "01 Dec 2026",
    value: "$7,200",
  },
  {
    client: "Sondus",
    destination: "Okavango Delta, Botswana",
    dates: "Nov 02 - Nov 12, 2026",
    pax: "2 guests",
    status: "Provisional Hold",
    lodge: "Duba Plains & Mombo",
    depositDue: "30 Sept 2026",
    value: "$18,500",
  },
]

export default function LongTermReservationsPage() {
  return (
    <div className="space-y-6">
      {/* Header & Back Link */}
      <div className="flex flex-col gap-3">
        <Button asChild variant="ghost" size="sm" className="w-fit gap-1 text-[#6c7365] hover:text-[#1e231d] -ml-2">
          <Link href="/reservations">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Reservations Updates</span>
          </Link>
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1e231d] md:text-3xl">
              Long-Term Reservations
            </h1>
            <p className="text-sm text-[#6c7365]">
              Extended planning window, upcoming 2026–2027 safari bookings, lodge allocations, and hold cutoffs.
            </p>
          </div>
          <Button className="bg-[#4a5441] text-white hover:bg-[#3d4535]">
            Export Calendar
          </Button>
        </div>
      </div>

      {/* Grid of Long-Term Bookings */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {longTermReservations.map((res) => (
          <Card key={res.client} className="border-[#e5e7e0] shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant={res.status.includes("Provisional") ? "sage" : "outline"}>
                  {res.status}
                </Badge>
                <span className="font-serif font-bold text-sm text-[#2d3427]">{res.value}</span>
              </div>
              <CardTitle className="font-serif text-lg mt-2">{res.client}</CardTitle>
              <CardDescription>{res.destination}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="rounded-lg bg-[#f9faf7] border border-[#e8ece3] p-3 space-y-1.5 text-[#555d4e]">
                <div className="flex justify-between">
                  <span className="font-medium text-[#6c7365]">Dates:</span>
                  <span className="font-semibold text-[#1e231d]">{res.dates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#6c7365]">Party:</span>
                  <span>{res.pax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#6c7365]">Lodge / Camp:</span>
                  <span className="font-medium text-[#1e231d]">{res.lodge}</span>
                </div>
                <div className="flex justify-between border-t border-[#e5e9df] pt-1.5">
                  <span className="font-medium text-[#8f4738]">Deposit Due:</span>
                  <span className="font-bold text-[#8f4738]">{res.depositDue}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
