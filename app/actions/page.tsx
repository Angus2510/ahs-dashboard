"use client"

import * as React from "react"
import { Check, CheckCircle2, Clock, Filter, Plus, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface TaskItem {
  id: string
  task: string
  client: string
  dueDate: string
  priority: "High" | "Medium" | "Low"
  status: "In progress" | "Not started" | "Completed"
  assignedTo: "Kayleigh" | "Ashley" | "Charianne"
  completed: boolean
}

const initialTasks: TaskItem[] = [
  {
    id: "1",
    task: "Follow up with Emily (Kenya)",
    client: "Emily",
    dueDate: "Today",
    priority: "High",
    status: "In progress",
    assignedTo: "Kayleigh",
    completed: true,
  },
  {
    id: "2",
    task: "Send proposal to Catherine",
    client: "Catherine Family",
    dueDate: "Today",
    priority: "High",
    status: "Not started",
    assignedTo: "Kayleigh",
    completed: false,
  },
  {
    id: "3",
    task: "Confirm invoice for Sondus",
    client: "Sondus",
    dueDate: "Tomorrow",
    priority: "Medium",
    status: "Not started",
    assignedTo: "Kayleigh",
    completed: false,
  },
  {
    id: "4",
    task: "Check in with Ashley",
    client: "Ashley",
    dueDate: "Tomorrow",
    priority: "Medium",
    status: "In progress",
    assignedTo: "Kayleigh",
    completed: false,
  },
  {
    id: "5",
    task: "Update reservations notes",
    client: "Bushwillow",
    dueDate: "Wed 18 Sep",
    priority: "Low",
    status: "Not started",
    assignedTo: "Charianne",
    completed: false,
  },
  {
    id: "6",
    task: "Send client itinerary",
    client: "Justin Family",
    dueDate: "Wed 18 Sep",
    priority: "Medium",
    status: "Not started",
    assignedTo: "Ashley",
    completed: false,
  },
  {
    id: "7",
    task: "Confirm flights",
    client: "Macatoo",
    dueDate: "Thu 19 Sep",
    priority: "Low",
    status: "Not started",
    assignedTo: "Kayleigh",
    completed: false,
  },
  {
    id: "8",
    task: "Reply to RFP",
    client: "New Enquiry",
    dueDate: "Fri 20 Sep",
    priority: "High",
    status: "Not started",
    assignedTo: "Ashley",
    completed: false,
  },
]

export default function ActionsPage() {
  const [tasks, setTasks] = React.useState<TaskItem[]>(initialTasks)
  const [activeFilter, setActiveFilter] = React.useState<string>("All")

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    )
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = 12
  const percentage = Math.round(((completedCount + 7) / totalCount) * 100)

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "All") return true
    if (activeFilter === "My Tasks") return task.assignedTo === "Kayleigh"
    if (activeFilter === "Ashley") return task.assignedTo === "Ashley"
    if (activeFilter === "Charianne") return task.assignedTo === "Charianne"
    if (activeFilter === "Priority") return task.priority === "High"
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1e231d] md:text-3xl">
              Action List
            </h1>
            <Badge variant="sage" className="h-6 px-2 font-bold">
              {tasks.filter((t) => !t.completed).length}
            </Badge>
          </div>
          <p className="text-sm text-[#6c7365]">
            Your tasks, all in one place.
          </p>
        </div>
        <Button className="bg-[#4a5441] text-white hover:bg-[#3d4535] gap-2">
          <Plus className="h-4 w-4" />
          <span>New Action</span>
        </Button>
      </div>

      {/* Progress & Filters Card */}
      <Card className="border-[#e5e7e0]">
        <CardContent className="p-5">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Progress Bar & Stat */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#5f6b52] bg-[#f2f5ee] text-xs font-bold text-[#2d3427]">
                {completedCount + 7}/{totalCount}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#1e231d]">Tasks completed</span>
                  <span className="text-xs text-[#6c7365] font-medium">{percentage}%</span>
                </div>
                <div className="h-2 w-48 rounded-full bg-[#e8ede3] overflow-hidden">
                  <div
                    className="h-full bg-[#5f6b52] rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {["All", "My Tasks", "Ashley", "Charianne", "Priority"].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className={activeFilter === filter ? "bg-[#4a5441] text-white font-medium" : "text-xs"}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List Table */}
      <Card className="border-[#e5e7e0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#1e231d]">
            <thead className="bg-[#f8f9f6] text-xs uppercase tracking-wider text-[#6c7365] border-b border-[#e5e7e0]">
              <tr>
                <th className="py-3.5 pl-5 pr-3 font-medium">Task</th>
                <th className="px-3 py-3.5 font-medium">Client / Reference</th>
                <th className="px-3 py-3.5 font-medium">Due Date</th>
                <th className="px-3 py-3.5 font-medium">Priority</th>
                <th className="px-3 py-3.5 font-medium">Status</th>
                <th className="py-3.5 pl-3 pr-5 font-medium">Assigned To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf0e8]">
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-[#fbfbfa] transition-colors cursor-pointer"
                  onClick={() => toggleTask(task.id)}
                >
                  {/* Task Checkbox & Title */}
                  <td className="py-3.5 pl-5 pr-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="h-4 w-4 rounded border-[#ccd3c4] text-[#4a5441] focus:ring-[#626e53] cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span
                        className={
                          task.completed
                            ? "line-through text-[#8c9485]"
                            : "font-medium text-[#1e231d]"
                        }
                      >
                        {task.task}
                      </span>
                    </div>
                  </td>

                  {/* Client / Reference */}
                  <td className="px-3 py-3.5 text-[#52594a] font-medium">
                    {task.client}
                  </td>

                  {/* Due Date */}
                  <td className="px-3 py-3.5 text-xs text-[#6c7365]">
                    {task.dueDate}
                  </td>

                  {/* Priority Badge */}
                  <td className="px-3 py-3.5">
                    <Badge
                      variant={
                        task.priority === "High"
                          ? "destructive"
                          : task.priority === "Medium"
                          ? "warm"
                          : "outline"
                      }
                      className="text-[11px]"
                    >
                      {task.priority}
                    </Badge>
                  </td>

                  {/* Status Badge */}
                  <td className="px-3 py-3.5">
                    <Badge variant={task.status === "In progress" ? "sage" : "secondary"}>
                      {task.status}
                    </Badge>
                  </td>

                  {/* Assigned To */}
                  <td className="py-3.5 pl-3 pr-5">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px] bg-[#dbe2d5] text-[#2e3526]">
                          {task.assignedTo.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-[#2d3427]">{task.assignedTo}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
