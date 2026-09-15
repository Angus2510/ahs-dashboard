import { BarChart3, Download, TrendingUp, Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const destinationStats = [
  { region: "Botswana (Okavango & Chobe)", bookings: 12, revenue: "$168,000", share: "49%" },
  { region: "South Africa (Kruger & Cape Town)", bookings: 7, revenue: "$84,500", share: "25%" },
  { region: "Kenya (Maasai Mara & Samburu)", bookings: 5, revenue: "$52,000", share: "15%" },
  { region: "Rwanda & Tanzania", bookings: 3, revenue: "$37,500", share: "11%" },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1e231d] md:text-3xl">
            Reports &amp; Analytics
          </h1>
          <p className="text-sm text-[#6c7365]">
            Sales velocity, destination breakdowns, conversion rates, and financial reports.
          </p>
        </div>
        <Button variant="outline" className="gap-2 border-[#e2e5dc]">
          <Download className="h-4 w-4 text-[#5f6b52]" />
          <span>Export Summary Report</span>
        </Button>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-[#e5e7e0] p-4">
          <span className="text-xs font-medium text-[#6c7365]">Total Booked YTD</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1">$342,000</p>
          <span className="text-xs text-[#5b874b] font-medium">↑ 18% vs prior year</span>
        </Card>

        <Card className="border-[#e5e7e0] p-4">
          <span className="text-xs font-medium text-[#6c7365]">Avg Itinerary Length</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1">9.4 Days</p>
          <span className="text-xs text-[#6c7365]">3.2 lodges / trip</span>
        </Card>

        <Card className="border-[#e5e7e0] p-4">
          <span className="text-xs font-medium text-[#6c7365]">Lead-to-Booking Time</span>
          <p className="font-serif text-2xl font-bold text-[#2d3427] mt-1">18 Days</p>
          <span className="text-xs text-[#5b874b] font-medium">↓ 4 days faster</span>
        </Card>
      </div>

      {/* Destination Breakdown Table */}
      <Card className="border-[#e5e7e0]">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Destination Performance</CardTitle>
          <CardDescription>Breakdown of revenue and booking counts by safari region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8f9f6] uppercase tracking-wider text-[#6c7365] border-b border-[#e5e7e0]">
                <tr>
                  <th className="py-2.5 px-3">Destination Region</th>
                  <th className="py-2.5 px-3">Bookings</th>
                  <th className="py-2.5 px-3">Total Value</th>
                  <th className="py-2.5 px-3">Revenue Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf0e8]">
                {destinationStats.map((dest) => (
                  <tr key={dest.region} className="hover:bg-[#fbfbfa]">
                    <td className="py-3 px-3 font-medium text-[#1e231d]">{dest.region}</td>
                    <td className="py-3 px-3 text-[#555d4e]">{dest.bookings}</td>
                    <td className="py-3 px-3 font-semibold text-[#1e231d]">{dest.revenue}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-[#e8ece3] overflow-hidden">
                          <div
                            className="h-full bg-[#5f6b52]"
                            style={{ width: dest.share }}
                          />
                        </div>
                        <span className="text-[11px] text-[#6c7365]">{dest.share}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
