"use client"

import { useState } from "react"
import { Battery, Wrench } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DiagnosticsPanel() {
  const [selectedRobot, setSelectedRobot] = useState("RBT-001")

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">System Diagnostics</h2>
        <p className="text-sm text-muted-foreground">Monitor system health and perform maintenance checks.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Select defaultValue={selectedRobot} onValueChange={setSelectedRobot}>
          <SelectTrigger className="w-full sm:w-[200px]">
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

      <Tabs defaultValue="components" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Battery System</CardTitle>
                <CardDescription>Power management and charging</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Battery className="h-5 w-5 text-primary" />
                      <span>Current Battery Level</span>
                    </div>
                    <Badge className="bg-primary">78%</Badge>
                  </div>
                  <Progress value={78} className="h-2" />

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Charging Efficiency</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
              <CardDescription>Upcoming and past maintenance activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium">Upcoming Maintenance</h4>
                  <div className="mt-2 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">Brush Replacement</p>
                        <p className="text-sm text-muted-foreground">Robot RBT-001 (Alpha)</p>
                      </div>
                      <Badge>In 5 days</Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">Battery Inspection</p>
                        <p className="text-sm text-muted-foreground">Robot RBT-002 (Beta)</p>
                      </div>
                      <Badge>In 3 weeks</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Maintenance History</h4>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2">
                      <div>
                        <p className="font-medium">Brush Replacement</p>
                        <p className="text-sm text-muted-foreground">Robot RBT-004 (Delta) - 2 weeks ago</p>
                      </div>
                      <Wrench className="h-4 w-4 text-muted-foreground hidden sm:block" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2">
                      <div>
                        <p className="font-medium">Battery Inspection</p>
                        <p className="text-sm text-muted-foreground">Robot RBT-003 (Gamma) - 1 month ago</p>
                      </div>
                      <Wrench className="h-4 w-4 text-muted-foreground hidden sm:block" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">Full System Check</p>
                        <p className="text-sm text-muted-foreground">All Robots - 2 months ago</p>
                      </div>
                      <Wrench className="h-4 w-4 text-muted-foreground hidden sm:block" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Schedule New Maintenance</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
