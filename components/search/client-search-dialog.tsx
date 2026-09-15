"use client";

import * as React from "react";
import {
  Search,
  MapPin,
  Calendar,
  User,
  DollarSign,
  FileText,
  ArrowLeft,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mockClients } from "@/lib/mock-data/clients";
import { Client, BookingStatus } from "@/types/client";

interface ClientSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function ClientSearchDialog({
  open,
  onOpenChange,
}: ClientSearchDialogProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(
    null,
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus input when dialog opens
  React.useEffect(() => {
    if (open) {
      setSelectedClient(null);
      setSearchQuery("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [open]);

  // Filter clients by name (case-insensitive)
  const filteredClients = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return mockClients;
    return mockClients.filter((client) =>
      client.name.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
  };

  const handleBackToList = () => {
    setSelectedClient(null);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideCloseButton
        className="max-w-2xl overflow-hidden p-0 border-[#e2e6dc] shadow-2xl bg-white"
      >
        {/* If detail view is open */}
        {selectedClient ? (
          <div className="flex flex-col">
            {/* Detail View Header */}
            <div className="flex items-center justify-between border-b border-[#e6eae0] bg-[#fafbf8] px-5 py-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToList}
                  className="h-8 gap-1 px-2 text-xs text-[#59624f] hover:bg-[#edf1e8] hover:text-[#1c221a]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to results</span>
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-7 w-7 text-[#737c6c] hover:bg-[#edf1e8] hover:text-[#1c221a]"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            {/* Detail View Content */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Client Title and Status */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-[#7e8777] uppercase">
                    Client File
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#1c221a]">
                    {selectedClient.name}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getBookingStatusBadge(
                      selectedClient.bookingStatus,
                    )}`}
                  >
                    {selectedClient.bookingStatus}
                  </span>
                </div>
              </div>

              <Separator className="bg-[#e8ece2]" />

              {/* Key Attributes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Destination */}
                <div className="rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#6e7766]">
                    <MapPin className="h-3.5 w-3.5 text-[#738260]" />
                    <span className="font-medium">Destination</span>
                  </div>
                  <p className="text-sm font-semibold text-[#1c221a]">
                    {selectedClient.destination}
                  </p>
                </div>

                {/* Consultant */}
                <div className="rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#6e7766]">
                    <User className="h-3.5 w-3.5 text-[#738260]" />
                    <span className="font-medium">Consultant</span>
                  </div>
                  <p className="text-sm font-semibold text-[#1c221a]">
                    {selectedClient.consultant}
                  </p>
                </div>

                {/* Trip Date */}
                <div className="rounded-lg border border-[#e8ece2] bg-[#fafbf8] p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#6e7766]">
                    <Calendar className="h-3.5 w-3.5 text-[#738260]" />
                    <span className="font-medium">Trip Date</span>
                  </div>
                  <p className="text-sm font-semibold text-[#1c221a]">
                    {selectedClient.tripDate}
                  </p>
                </div>

                {/* Value */}
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
                    Notes &amp; Itinerary Context
                  </span>
                </div>
                <p className="text-xs text-[#444c3c] leading-relaxed">
                  {selectedClient.notes}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToList}
                  className="text-xs"
                >
                  Back to List
                </Button>
                <Button
                  size="sm"
                  onClick={() => onOpenChange(false)}
                  className="bg-[#4a5441] text-white hover:bg-[#3d4535] text-xs"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Search Input & List View */
          <div className="flex flex-col">
            {/* Search Header Bar */}
            <div className="flex items-center border-b border-[#e6eae0] px-4 py-3 bg-[#fafbf8]">
              <Search className="h-4 w-4 text-[#757e6e] shrink-0 mr-3" />
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients by name (e.g. Sondus, Catherine, Emily)..."
                className="w-full bg-transparent text-sm text-[#1c221a] placeholder:text-[#8a9284] focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[#8a9284] hover:text-[#1c221a] p-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-7 w-7 text-[#737c6c] hover:bg-[#edf1e8] hover:text-[#1c221a] ml-1"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            {/* Results Count & Instructions */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#f4f6f1] text-[11px] text-[#6e7766] border-b border-[#e8ece2]">
              <span>
                {filteredClients.length}{" "}
                {filteredClients.length === 1 ? "client" : "clients"} found
              </span>
              <span>Click a client to view details</span>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-1">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => handleSelectClient(client)}
                    className="group flex items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-[#f2f5ee] cursor-pointer border border-transparent hover:border-[#e2e7dc]"
                  >
                    <div className="space-y-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#1c221a] group-hover:text-[#323a2b] truncate">
                          {client.name}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium shrink-0 ${getBookingStatusBadge(
                            client.bookingStatus,
                          )}`}
                        >
                          {client.bookingStatus}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[#6e7766]">
                        <div className="flex items-center gap-1 truncate">
                          <MapPin className="h-3 w-3 text-[#7f8e6e]" />
                          <span className="truncate">{client.destination}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <Calendar className="h-3 w-3 text-[#7f8e6e]" />
                          <span>{client.tripDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <ChevronRight className="h-4 w-4 text-[#9ea797] group-hover:text-[#4a5441] transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                ))
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f3eb] text-[#717b6a] mb-3">
                    <Search className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#1c221a]">
                    No clients found
                  </h3>
                  <p className="text-xs text-[#6e7766] mt-1 max-w-xs">
                    We couldn&apos;t find any client matching &ldquo;
                    {searchQuery}&rdquo;. Try searching by first or last name.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="mt-4 text-xs"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
