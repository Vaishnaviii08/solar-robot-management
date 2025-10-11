"use client"
import { useRouter } from "next/navigation"
import type React from "react"

import { Plus, TrendingUp, Calendar, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RobotStatusCard } from "@/components/robot-status-card"
import { WeatherCard } from "@/components/weather-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export function DashboardPage() {
  const router = useRouter()
  const [isAddRobotOpen, setIsAddRobotOpen] = useState(false)
  const [apiKey, setApiKey] = useState("")

  const handleAddRobot = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddRobotOpen(false)
    toast({
      title: "Robot added",
      description: "The new robot has been added successfully.",
    })
    setApiKey("")
  }

  const handleControlClick = (robotId: string) => {
    router.push(`/dashboard/control?robot=${robotId}`)
  }

  // Sample robots data
  const robots = [
    {
      id: "RBT-001",
      name: "Alpha",
      status: "Cleaning" as const,
      batteryLevel: 78,
      location: "Section A",
      lastMaintenance: "2023-04-01",
    },
    {
      id: "RBT-002",
      name: "Beta",
      status: "Charging" as const,
      batteryLevel: 32,
      location: "Charging Station",
      lastMaintenance: "2023-03-15",
    },
  ]

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Monitor your solar panel cleaning robots and system performance.
          </p>
        </div>
        <Dialog open={isAddRobotOpen} onOpenChange={setIsAddRobotOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Robot
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddRobot}>
              <DialogHeader>
                <DialogTitle>Add New Robot</DialogTitle>
                <DialogDescription>
                  Enter the API key provided with your robot to add it to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="api-key" className="text-right">
                    API Key
                  </Label>
                  <Input
                    id="api-key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Robot</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Three simple boxes instead of tabs */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Total Energy Saved</CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245 kWh</div>
            <p className="text-sm text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Cleaning Cycles</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">277</div>
            <p className="text-sm text-muted-foreground">All robots combined</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Efficiency Gain</CardTitle>
            <BarChart3 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21.5%</div>
            <p className="text-sm text-muted-foreground">Average after cleaning</p>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-lg font-medium mt-6 mb-2">Robot Status</h3>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {robots.map((robot) => (
          <RobotStatusCard
            key={robot.id}
            id={robot.id}
            name={robot.name}
            status={robot.status}
            batteryLevel={robot.batteryLevel}
            location={robot.location}
            lastMaintenance={robot.lastMaintenance}
            onControlClick={() => handleControlClick(robot.id)}
          />
        ))}
        <Card className="flex flex-col items-center justify-center border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="flex flex-col items-center justify-center h-full py-6">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium">Add New Robot</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">Connect a new robot to your system</p>
            <Button variant="outline" className="mt-4" onClick={() => setIsAddRobotOpen(true)}>
              Add Robot
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Weather Conditions</CardTitle>
          <CardDescription>Current conditions affecting cleaning operations</CardDescription>
        </CardHeader>
        <CardContent>
          <WeatherCard />
        </CardContent>
      </Card>
    </div>
  )
}
