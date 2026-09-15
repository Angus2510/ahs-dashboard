import { ReservationUpdate } from "@/types/reservation";

export const initialReservationUpdates: ReservationUpdate[] = [
  {
    id: "res-1",
    update:
      "Bushwillow Lodge private villa hold confirmed for Catherine Family. Cutoff for release is 24 September. Needs final guest count from Ashley.",
    author: "Charianne",
    createdAt: "Today, 08:45 AM",
    priority: "URGENT",
    resolved: false,
    category: "Provisional Hold",
  },
  {
    id: "res-2",
    update:
      "Sosian Ranch airstrip maintenance completed ahead of schedule. All Cessna charter connections from Nairobi Wilson now operating on standard timetable.",
    author: "Kayleigh",
    createdAt: "Yesterday, 03:20 PM",
    priority: "IMPORTANT",
    resolved: false,
    category: "Lodge & Logistics",
  },
  {
    id: "res-3",
    update:
      "Sondus helicopter transfer between Mombo Camp and Duba Plains approved by Wilderness ground flight coordinator.",
    author: "Charianne",
    createdAt: "14 Sep 2026, 11:15 AM",
    priority: "NORMAL",
    resolved: false,
    category: "Aviation & Transfer",
  },
  {
    id: "res-4",
    update:
      "Elena Rostova deposit cleared with Standard Bank. Final accommodation vouchers and gate pass issued to client portal.",
    author: "Kayleigh",
    createdAt: "13 Sep 2026, 04:50 PM",
    priority: "NORMAL",
    resolved: true,
    category: "Documentation",
  },
  {
    id: "res-5",
    update:
      "Rwanda Development Board gorilla trekking permit system maintenance scheduled for Thursday evening. No new permit bookings can be logged between 18:00 and 23:00.",
    author: "Charianne",
    createdAt: "12 Sep 2026, 02:10 PM",
    priority: "IMPORTANT",
    resolved: false,
    category: "Permits & Wildlife",
  },
  {
    id: "res-6",
    update:
      "Direct contract renegotiation with Singita & Wilderness Safaris group for 2027/2028 high season allocation blocks.",
    author: "Kayleigh",
    createdAt: "10 Sep 2026",
    priority: "LONG-TERM",
    resolved: false,
    category: "Supplier Project",
  },
  {
    id: "res-7",
    update:
      "Standardizing automated pre-departure safari checklist and digital health declaration forms across all Kenya and Botswana lodges.",
    author: "Charianne",
    createdAt: "05 Sep 2026",
    priority: "LONG-TERM",
    resolved: false,
    category: "Process Improvement",
  },
  {
    id: "res-8",
    update:
      "Okavango Delta regional water levels monitoring protocol for 2027 flood cycle planning and mokoro route viability.",
    author: "Kayleigh",
    createdAt: "28 Aug 2026",
    priority: "LONG-TERM",
    resolved: false,
    category: "Future Reservation Issue",
  },
  {
    id: "res-9",
    update:
      "Consolidated emergency satellite phone & air ambulance insurance protocol integration for remote mobile camps.",
    author: "Charianne",
    createdAt: "20 Aug 2026",
    priority: "LONG-TERM",
    resolved: false,
    category: "Operational Project",
  },
];
