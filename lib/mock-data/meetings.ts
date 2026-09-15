import { WeeklyMeeting } from "@/types/meeting";

export const mockWeeklyMeetings: WeeklyMeeting[] = [
  {
    id: "meet-2026-09-15",
    date: "15 September 2026",
    title: "Weekly 1:1 • Q3 Pipeline & High-Value Closes",
    previousDiscussion:
      "Reviewed Sondus Botswana itinerary options and confirmed private vehicle availability at Mombo. Agreed to follow up on Catherine Family villa hold with Bushwillow before the 24th cutoff.",
    currentOpportunities:
      "• Sondus (Okavango Delta): $18,500 - Decision pending. Client loved the scenic helicopter transfer addition.\n• Vanderbilt Group (Zambia): $34,000 - Discovery stage. Private charter group evaluating bush camps.\n• Dr. Alistair Ross (Serengeti): $14,500 - Photographic safari enquiry. Customized vehicle specs shared.",
    waitingOn:
      "• Client sign-off from Sondus on final flight timetable.\n• Group coordinator response from Catherine Family regarding South Africa travel party size (confirming 6 vs 8 pax).",
    nextSteps:
      "• Issue finalized pro-forma invoice for Sondus once sign-off arrives.\n• Send adjusted quote for Macatoo horse safaris (Justin Family).\n• Sync with Charianne on Q4 hold releases.",
    coachingNotes:
      "Focus on consultative objection handling around green season rates vs peak dry season wildlife concentrations. Encourage earlier proposal turnaround for multi-camp requests to build momentum.",
    wins: "• Successfully locked in exclusive lodge buyout for Holt Family Safari ($41,000 confirmed).\n• Elena Rostova deposit cleared and voucher package issued seamlessly.",
    risks:
      "• Emily Thornton inquiry is stalling — 48 hours without email open. Needs gentle WhatsApp check-in.\n• Bushwillow provisional hold on the private villa expires in 9 days.",
    actionItems: [
      {
        id: "mact-1",
        task: "Send updated pro-forma invoice & deposit instructions for Sondus",
        owner: "Me",
        priority: "High",
        dueDate: "Today",
        completed: false,
      },
      {
        id: "mact-2",
        task: "Follow up with Justin Family regarding equestrian experience questionnaire",
        owner: "Ashley",
        priority: "Medium",
        dueDate: "Tomorrow",
        completed: false,
      },
      {
        id: "mact-3",
        task: "Review revised green season rate sheets from Botswana partners",
        owner: "Ashley",
        priority: "Low",
        dueDate: "Fri 19 Sep",
        completed: true,
      },
    ],
  },
  {
    id: "meet-2026-09-08",
    date: "8 September 2026",
    title: "Weekly 1:1 • Safari Itinerary Finalizations",
    previousDiscussion:
      "Discussed luxury family dynamics for Justin Family and reviewed Holt Family safari logistics in Southern Tanzania.",
    currentOpportunities:
      "• Holt Family ($41k): In contract review; legal details on charter.\n• Elena Rostova ($16.5k): Final payment milestone pending.\n• Catherine Family ($12.4k): Cape Town + Kruger custom routing.",
    waitingOn:
      "• Payment gateway confirmation for Elena Rostova international wire.\n• Camp manager approval on private vehicle configuration for Alistair Ross.",
    nextSteps:
      "• Connect with Wilderness Safaris rep for Sondus helicopter landing permission.\n• Prepare high-touch itinerary deck for Catherine Family.",
    coachingNotes:
      "Emphasize the uniqueness of AHS private guiding in proposals to justify premium price points. Good progress on time management during high enquiry spikes.",
    wins: "• 100% on-time response rate for all new inbound safari leads this week.\n• Received glowing testimonial from the Miller safari return.",
    risks:
      "• Overlapping dates for high season Botswana camps between two VIP requests.",
    actionItems: [
      {
        id: "mact-4",
        task: "Clarify helicopter flight duration with Okavango charter team",
        owner: "Ashley",
        priority: "Medium",
        dueDate: "10 Sep 2026",
        completed: true,
      },
      {
        id: "mact-5",
        task: "Email Catherine Family coordinator with revised Cape Town villa quote",
        owner: "Me",
        priority: "High",
        dueDate: "09 Sep 2026",
        completed: true,
      },
    ],
  },
  {
    id: "meet-2026-09-01",
    date: "1 September 2026",
    title: "Weekly 1:1 • Month-End Review & Target Alignment",
    previousDiscussion:
      "August revenue reconciliation and pipeline health check. Evaluated average conversion speed across lead sources.",
    currentOpportunities:
      "• Active pipeline at $310,000 across 15 qualified leads.\n• Focus on closing Holt Family and Elena Rostova before mid-September.",
    waitingOn:
      "• Final lodge allocations from Tanzania ground operators for December dates.",
    nextSteps:
      "• Create reusable template for multi-generational safari itineraries.\n• Set up pipeline review checkpoint with Charianne on reservations.",
    coachingNotes:
      "Great discovery call technique with high-net-worth clients. Make sure to capture specific special interests (e.g., birding, wine tasting, photography) directly in client notes early on.",
    wins: "• Closed Sterling Family Trust safari ($29,500) with 50% upfront deposit.\n• Exceeded August target by 14%.",
    risks: "• Flight availability between Maun and Kasane tightening for Q4.",
    actionItems: [
      {
        id: "mact-6",
        task: "Set up shared tracking sheet for Q4 internal charter seats",
        owner: "Ashley",
        priority: "Medium",
        dueDate: "03 Sep 2026",
        completed: true,
      },
      {
        id: "mact-7",
        task: "Complete 1:1 notes sync and review revenue attribution",
        owner: "Me",
        priority: "Low",
        dueDate: "02 Sep 2026",
        completed: true,
      },
    ],
  },
  {
    id: "meet-2026-08-25",
    date: "25 August 2026",
    title: "Weekly 1:1 • Partner Lodges & Conversion Strategy",
    previousDiscussion:
      "Review of partner property relationships in Kenya (Sosian) and Rwanda (Volcanoes NP).",
    currentOpportunities:
      "• Marcus & Sarah ($22k): Rwanda honeymoon request with gorilla permits.\n• Harrison & Associates ($26k): South Africa corporate executive retreat.",
    waitingOn:
      "• Rwanda Development Board permit confirmation on preferred tracking dates.",
    nextSteps:
      "• Follow up with RDB representative for gorilla permit release.\n• Draft customized retreat schedule for Harrison group.",
    coachingNotes:
      "Encourage clear communication of permit non-refundability policies upfront so clients are prepared for immediate deposit requests.",
    wins: "• Secured prime villa dates at Kisawa Sanctuary for Sophia Martinez.",
    risks: "• Limited gorilla permit availability during peak October dates.",
    actionItems: [
      {
        id: "mact-8",
        task: "Contact ground concierge in Kigali regarding permit hold extension",
        owner: "Me",
        priority: "High",
        dueDate: "26 Aug 2026",
        completed: true,
      },
    ],
  },
];
