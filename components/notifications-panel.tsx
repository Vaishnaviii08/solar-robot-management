"use client"

import { useState } from "react"
import { Bell, Check, Filter, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NotificationsPanel() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground">View and manage system notifications and alerts.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notifications..."
            className="w-full pl-8 sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>Recent notifications from your solar robot system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: 1,
                  title: "Maintenance Required",
                  message: "Robot Alpha needs brush replacement",
                  time: "2 hours ago",
                  type: "maintenance",
                  unread: true,
                },
                {
                  id: 2,
                  title: "Cleaning Complete",
                  message: "Robot Beta finished cleaning Section B",
                  time: "5 hours ago",
                  type: "cleaning",
                  unread: true,
                },
                {
                  id: 3,
                  title: "Low Battery",
                  message: "Robot Alpha battery below 20%",
                  time: "1 day ago",
                  type: "system",
                  unread: false,
                },
                {
                  id: 4,
                  title: "System Update Available",
                  message: "New firmware version 2.3.1 is available",
                  time: "2 days ago",
                  type: "system",
                  unread: false,
                },
                {
                  id: 5,
                  title: "Cleaning Schedule Updated",
                  message: "Weekly cleaning schedule has been updated",
                  time: "3 days ago",
                  type: "cleaning",
                  unread: false,
                },
              ].map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start justify-between rounded-lg border p-4 ${
                    notification.unread ? "bg-primary/5 border-primary/20" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`rounded-full p-2 ${
                        notification.type === "maintenance"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200"
                          : notification.type === "cleaning"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200"
                      }`}
                    >
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{notification.title}</p>
                        {notification.unread && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Mark All as Read</Button>
              <Button variant="outline">Clear All</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Notifications</CardTitle>
              <CardDescription>Notifications related to robot maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: 1,
                  title: "Maintenance Required",
                  message: "Robot Alpha needs brush replacement",
                  time: "2 hours ago",
                  unread: true,
                },
                {
                  id: 6,
                  title: "Maintenance Scheduled",
                  message: "Routine maintenance scheduled for Robot Beta",
                  time: "1 week ago",
                  unread: false,
                },
              ].map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start justify-between rounded-lg border p-4 ${
                    notification.unread ? "bg-primary/5 border-primary/20" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-2 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{notification.title}</p>
                        {notification.unread && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cleaning" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cleaning Notifications</CardTitle>
              <CardDescription>Notifications related to cleaning operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: 2,
                  title: "Cleaning Complete",
                  message: "Robot Beta finished cleaning Section B",
                  time: "5 hours ago",
                  unread: true,
                },
                {
                  id: 5,
                  title: "Cleaning Schedule Updated",
                  message: "Weekly cleaning schedule has been updated",
                  time: "3 days ago",
                  unread: false,
                },
              ].map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start justify-between rounded-lg border p-4 ${
                    notification.unread ? "bg-primary/5 border-primary/20" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{notification.title}</p>
                        {notification.unread && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
              <CardDescription>Notifications related to system operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: 3,
                  title: "Low Battery",
                  message: "Robot Alpha battery below 20%",
                  time: "1 day ago",
                  unread: false,
                },
                {
                  id: 4,
                  title: "System Update Available",
                  message: "New firmware version 2.3.1 is available",
                  time: "2 days ago",
                  unread: false,
                },
              ].map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start justify-between rounded-lg border p-4 ${
                    notification.unread ? "bg-primary/5 border-primary/20" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{notification.title}</p>
                        {notification.unread && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
