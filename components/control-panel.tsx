"use client"

import { Progress } from "@/components/ui/progress"

import { useState } from "react"
import { Calendar, Check, Clock, Play, Save, Shield, CircleStopIcon as Stop } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ControlPanel() {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedRobot, setSelectedRobot] = useState("RBT-001")
  const [batteryLevel, setBatteryLevel] = useState(78)
  const [scheduleEnabled, setScheduleEnabled] = useState(true)
  const [verificationOpen, setVerificationOpen] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [pendingAction, setPendingAction] = useState<"start" | "stop" | null>(null)

  const handleStartStopRequest = (action: "start" | "stop") => {
    setPendingAction(action)
    setVerificationOpen(true)
  }

  const handleVerification = () => {
    if (verificationCode === "123456") {
      // In a real app, this would be a proper verification
      setVerificationOpen(false)
      setVerificationCode("")

      if (pendingAction === "start") {
        setIsRunning(true)
        toast({
          title: "Starting cleaning operation",
          description: `Robot ${selectedRobot} is starting its cleaning cycle.`,
        })
      } else if (pendingAction === "stop") {
        setIsRunning(false)
        toast({
          title: "Stopping cleaning operation",
          description: `Robot ${selectedRobot} is stopping its cleaning cycle.`,
        })
      }

      setPendingAction(null)
    } else {
      toast({
        title: "Verification failed",
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your robot cleaning settings have been updated.",
    })
  }

  const handleScheduleSave = () => {
    toast({
      title: "Schedule updated",
      description: "Your cleaning schedule has been updated.",
    })
  }

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Robot Control Panel</h2>
        <p className="text-sm text-muted-foreground">Manage and control your solar panel cleaning robots.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Automatic Schedule</CardTitle>
                <CardDescription>Set up recurring cleaning schedules</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="schedule-mode" checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
                <Label htmlFor="schedule-mode">Enabled</Label>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="daily">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="daily-time">Cleaning Time</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input type="time" id="daily-time" defaultValue="06:00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="daily-robot">Select Robot</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="daily-robot">
                      <SelectValue placeholder="Select robots" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Robots</SelectItem>
                      <SelectItem value="RBT-001">Alpha (RBT-001)</SelectItem>
                      <SelectItem value="RBT-002">Beta (RBT-002)</SelectItem>
                      <SelectItem value="RBT-003">Gamma (RBT-003)</SelectItem>
                      <SelectItem value="RBT-004">Delta (RBT-004)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="weekly" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Days of Week</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <Button key={day} variant="outline" size="sm" className="h-8 w-12">
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weekly-time">Cleaning Time</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input type="time" id="weekly-time" defaultValue="08:00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weekly-robot">Select Robot</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="weekly-robot">
                      <SelectValue placeholder="Select robots" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Robots</SelectItem>
                      <SelectItem value="RBT-001">Alpha (RBT-001)</SelectItem>
                      <SelectItem value="RBT-002">Beta (RBT-002)</SelectItem>
                      <SelectItem value="RBT-003">Gamma (RBT-003)</SelectItem>
                      <SelectItem value="RBT-004">Delta (RBT-004)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-date">Start Date</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Input type="date" id="custom-date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-interval">Repeat Every</Label>
                  <div className="flex items-center gap-2">
                    <Input type="number" id="custom-interval" defaultValue="14" min="1" max="90" />
                    <Select defaultValue="days">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="weeks">Weeks</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-time">Cleaning Time</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input type="time" id="custom-time" defaultValue="10:00" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleScheduleSave} disabled={!scheduleEnabled}>
              <Check className="mr-2 h-4 w-4" /> Save Schedule
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manual Control</CardTitle>
            <CardDescription>Start, stop, and adjust robot operations in real-time (Admin only)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">This section requires admin verification</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="robot-select">Select Robot</Label>
              <Select defaultValue={selectedRobot} onValueChange={setSelectedRobot}>
                <SelectTrigger id="robot-select">
                  <SelectValue placeholder="Select a robot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RBT-001">Alpha (RBT-001)</SelectItem>
                  <SelectItem value="RBT-002">Beta (RBT-002)</SelectItem>
                  <SelectItem value="RBT-003">Gamma (RBT-003)</SelectItem>
                  <SelectItem value="RBT-004">Delta (RBT-004)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${isRunning ? "bg-primary" : "bg-red-500"}`}></div>
                  <span className="font-medium">{isRunning ? "Running" : "Stopped"}</span>
                </div>
                <Button
                  variant={isRunning ? "destructive" : "default"}
                  size="sm"
                  onClick={() => handleStartStopRequest(isRunning ? "stop" : "start")}
                >
                  {isRunning ? (
                    <>
                      <Stop className="mr-2 h-4 w-4" /> Stop
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" /> Start
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="battery-level">Battery Level</Label>
                  <span className="text-sm text-muted-foreground">{batteryLevel}%</span>
                </div>
                <Progress value={batteryLevel} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSaveSettings}>
              <Save className="mr-2 h-4 w-4" /> Save Settings
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={verificationOpen} onOpenChange={setVerificationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Verification Required</DialogTitle>
            <DialogDescription>
              Please enter your verification code to {pendingAction === "start" ? "start" : "stop"} the robot.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input
                id="verification-code"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">For demo purposes, use code: 123456</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVerificationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleVerification}>Verify</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
