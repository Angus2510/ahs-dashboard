"use client";

import * as React from "react";
import {
  Search,
  MapPin,
  Calendar,
  ArrowRight,
  User,
  DollarSign,
  FileText,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { mockClients } from "@/lib/mock-data/clients";
import { Client, BookingStatus } from "@/types/client";

function getBookingStatusBadge(status: BookingStatus) {
  switch (status) {
    case "Confirmed":
    case "Deposit Received":
      return "border-[#cdddc8] bg-[#edf4e8] text-[#2e4028]";
    case "Decision Pending":
    case "Provisional Hold":
      return "border-[#e3ded2] bg-[#f7f5ee] text-[#5e5642]";
    case "Proposal Sent":
      return "border-[#d8e0ce] bg-[#f2f6ee] text-[#3d4734]";
    case "Discovery":
      return "border-[#e0e3dc] bg-[#f5f6f3] text-[#565f4f]";
    case "Completed":
      return "border-[#d0d8cc] bg-[#eef3eb] text-[#3c4a37]";
    case "Cancelled":
      return "border-[#f4d0cb] bg-[#faebe8] text-[#8e3226]";
    default:
      return "border-[#dce1d5] bg-[#f3f5ee] text-[#444e3b]";
  }
}

export default function ClientSearchPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedConsultant, setSelectedConsultant] = React.useState("All");
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(
    null,
  );

  const filteredClients = React.useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return mockClients.filter((client) => {
      const matchesSearch = !query || client.name.toLowerCase().includes(query);
      const matchesConsultant =
        selectedConsultant === "All" ||
        client.consultant === selectedConsultant;
      return matchesSearch && matchesConsultant;
    });
  }, [searchTerm, selectedConsultant]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1e231d] md:text-3xl">
          Client Search
        </h1>
        <p className="text-sm text-[#6c7365]">
          Look up client files, safari itineraries, destinations, and assigned
          consultant details.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <Card className="border-[#e2e5dc] bg-white shadow-2xs">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c9485]" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search clients by name (e.g. Sondus, Catherine, Emily)..."
                className="pl-9 pr-9 h-10 border-[#e2e5dc] bg-[#fbfbfa]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c9485] hover:text-[#1e231d]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#6c7365] mr-1">
                Consultant:
              </span>
              {["All", "Kayleigh", "Ashley"].map((filter) => (
                <Button
                  key={filter}
                  variant={
                    selectedConsultant === filter ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedConsultant(filter)}
                  className={
                    selectedConsultant === filter
                      ? "bg-[#4a5441] text-white"
                      : "border-[#e2e5dc] text-[#555d4e]"
                  }
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#6c7365] px-1">
        <span>
          Showing {filteredClients.length}{" "}
          {filteredClients.length === 1 ? "client" : "clients"}
        </span>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <Card
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className="border-[#e5e7e0] transition-all hover:border-[#6b775c] hover:shadow-xs cursor-pointer"
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-base font-semibold text-[#1e231d]">
                        {client.name}
                      </h3>
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getBookingStatusBadge(
                          client.bookingStatus,
                        )}`}
                      >
                        {client.bookingStatus}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#6c7365]">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-[#889472]" />
                        <span>{client.destination}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-[#889472]" />
                        <span>{client.tripDate}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-[#889472]" />
                        <span>Consultant: {client.consultant}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#f0f2eb] shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="block text-[10px] text-[#6c7365] uppercase tracking-wider">
                        Trip Value
                      </span>
                      <span className="font-serif text-base font-bold text-[#2d3427]">
                        {client.value}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-xs"
                    >
                      <span>View details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-[#e5e7e0] p-12 text-center bg-white">
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-[#f0f3eb] text-[#717b6a] mb-3">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1c221a]">
              No clients found
            </h3>
            <p className="text-xs text-[#6e7766] mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any clients matching &ldquo;{searchTerm}
              &rdquo;. Try searching with a different name or clear the filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedConsultant("All");
              }}
              className="mt-4 text-xs"
            >
              Reset Search
            </Button>
          </Card>
        )}
      </div>

      {/* Client Detail Dialog */}
      {selectedClient && (
        <Dialog
          open={!!selectedClient}
          onOpenChange={(open) => !open && setSelectedClient(null)}
        >
          <DialogContent className="max-w-2xl border-[#e2e6dc] shadow-2xl bg-white p-6">
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-[#7e8777] uppercase">
                    Client File
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#1c221a]">
                    {selectedClient.name}
                  </h2>
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold self-start ${getBookingStatusBadge(
                    selectedClient.bookingStatus,
                  )}`}
                >
                  {selectedClient.bookingStatus}
                </span>
              </div>

              <Separator className="bg-[#e8ece2]" />

              {/* Detail Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#6e7766]">
                    <MapPin className="h-3.5 w-3.5 text-[#738260]" />
                    <span className="font-medium">Destination</span>
                  </div>
                  <p className="text-sm font-semibold text-[#1c221a]">
                    {selectedClient.destination}
                  </p>
                </div>

                <div className="rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#6e7766]">
                    <User className="h-3.5 w-3.5 text-[#738260]" />
                    <span className="font-medium">Consultant</span>
                  </div>
                  <p className="text-sm font-semibold text-[#1c221a]">
                    {selectedClient.consultant}
                  </p>
                </div>

                <div className="rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#6e7766]">
                    <Calendar className="h-3.5 w-3.5 text-[#738260]" />
                    <span className="font-medium">Trip Date</span>
                  </div>
                  <p className="text-sm font-semibold text-[#1c221a]">
                    {selectedClient.tripDate}
                  </p>
                </div>

                <div className="rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#6e7766]">
                    <DollarSign className="h-3.5 w-3.5 text-[#738260]" />
                    <span className="font-medium">Value</span>
                  </div>
                  <p className="font-serif text-base font-bold text-[#2d3427]">
                    {selectedClient.value}
                  </p>
                </div>
              </div>

              {/* Notes */}
              <div className="rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-4 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-[#6e7766]">
                  <FileText className="h-3.5 w-3.5 text-[#738260]" />
                  <span className="font-medium">
                    Notes &amp; Itinerary Details
                  </span>
                </div>
                <p className="text-xs text-[#444c3c] leading-relaxed">
                  {selectedClient.notes}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => setSelectedClient(null)}
                  className="bg-[#4a5441] text-white hover:bg-[#3d4535] text-xs"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
