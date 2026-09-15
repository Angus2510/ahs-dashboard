"use client"

import * as React from "react"
import { Search, Filter, MapPin, Calendar, ArrowRight, UserCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const clients = [
  {
    name: "Sondus",
    destination: "Okavango Delta, Botswana",
    type: "Luxury Safari",
    value: "$18,500",
    travelDate: "Nov 2026",
    status: "Decision pending",
    priority: "High",
    assignedTo: "Ashley",
  },
  {
    name: "Catherine Family",
    destination: "Kruger & Cape Town, South Africa",
    type: "Group of 6",
    value: "$12,400",
    travelDate: "Dec 2027",
    status: "Proposal sent",
    priority: "High",
    assignedTo: "Kayleigh",
  },
  {
    name: "Justin Family",
    destination: "Macatoo & Victoria Falls",
    type: "Family with teens",
    value: "$9,800",
    travelDate: "Mar 2027",
    status: "Planning",
    priority: "Medium",
    assignedTo: "Ashley",
  },
  {
    name: "Emily",
    destination: "Kenya (Sosian & Maasai Mara)",
    type: "Solo explorer",
    value: "$7,200",
    travelDate: "Apr 2027",
    status: "Follow up needed",
    priority: "Medium",
    assignedTo: "Kayleigh",
  },
]

export default function ClientSearchPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedFilter, setSelectedFilter] = React.useState("All")

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (selectedFilter === "All") return matchesSearch
    return matchesSearch && client.assignedTo === selectedFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1e231d] md:text-3xl">
          Client Search
        </h1>
        <p className="text-sm text-[#6c7365]">
          Look up client records, destination requests, historical trips, and active opportunities.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <Card className="border-[#e2e5dc] bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c9485]" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by client name, destination, trip details or status..."
                className="pl-9 h-10 border-[#e2e5dc] bg-[#fbfbfa]"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#6c7365] mr-1">Filter by:</span>
              {["All", "Kayleigh", "Ashley"].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={selectedFilter === filter ? "bg-[#4a5441] text-white" : ""}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results List */}
      <div className="space-y-3">
        {filteredClients.map((client) => (
          <Card
            key={client.name}
            className="border-[#e5e7e0] transition-shadow hover:shadow-md"
          >
            <CardContent className="p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base font-semibold text-[#1e231d]">{client.name}</h3>
                    <Badge variant={client.priority === "High" ? "secondary" : "outline"}>
                      {client.priority} Priority
                    </Badge>
                    <Badge variant="sage">{client.status}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#6c7365]">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#889472]" />
                      <span>{client.destination}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#889472]" />
                      <span>{client.travelDate}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <UserCheck className="h-3.5 w-3.5 text-[#889472]" />
                      <span>Assigned to {client.assignedTo}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#f0f2eb]">
                  <div className="text-right">
                    <span className="block text-xs text-[#6c7365]">Trip Value</span>
                    <span className="font-serif text-base font-bold text-[#2d3427]">
                      {client.value}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <span>View Hub</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
