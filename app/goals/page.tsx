import { Target, TrendingUp, Award, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const goals = [
  {
    title: "Q3 Revenue Target",
    current: "$342,000",
    target: "$450,000",
    progress: 76,
    status: "On Track",
    period: "Jul - Sep 2026",
  },
  {
    title: "Confirmed Safari Itineraries",
    current: "24",
    target: "30",
    progress: 80,
    status: "On Track",
    period: "Q3 2026",
  },
  {
    title: "Average Deal Margin",
    current: "28.4%",
    target: "25.0%",
    progress: 100,
    status: "Exceeded",
    period: "2026 YTD",
  },
  {
    title: "Guest NPS & Feedback",
    current: "94",
    target: "90",
    progress: 100,
    status: "Exceeded",
    period: "Rolling 12 Months",
  },
]

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1e231d] md:text-3xl">
          Goals &amp; Performance
        </h1>
        <p className="text-sm text-[#6c7365]">
          Quarterly sales milestones, booking volume benchmarks, margin goals, and guest satisfaction targets.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {goals.map((goal) => (
          <Card key={goal.title} className="border-[#e5e7e0] shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant={goal.status === "Exceeded" ? "sage" : "secondary"}>
                  {goal.status}
                </Badge>
                <span className="text-xs text-[#6c7365]">{goal.period}</span>
              </div>
              <CardTitle className="font-serif text-lg mt-2">{goal.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#6c7365]">Current Progress</span>
                  <p className="font-serif text-2xl font-bold text-[#2d3427]">{goal.current}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#6c7365]">Target</span>
                  <p className="text-sm font-semibold text-[#6c7365]">{goal.target}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="h-2 w-full rounded-full bg-[#eef1ea] overflow-hidden">
                  <div
                    className="h-full bg-[#4a5441] rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(goal.progress, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#6c7365]">
                  <span>{goal.progress}% completed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
