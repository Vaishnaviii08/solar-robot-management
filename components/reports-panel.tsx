"use client"

import { useState } from "react"
import { Calendar, Download, FileText, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ReportsPanel() {
  const [dateRange, setDateRange] = useState("last-7-days")
  const [robotFilter, setRobotFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reports & Logs</h2>
        <p className="text-sm text-muted-foreground">View and export system reports and activity logs.</p>
      </div>

      <Tabs defaultValue="cleaning-logs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="cleaning-logs">Cleaning Logs</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="system-logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="cleaning-logs" className="space-y-4 pt-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="grid w-full gap-2 md:max-w-sm">
              <Label htmlFor="date-range">Date Range</Label>
              <Select defaultValue={dateRange} onValueChange={setDateRange}>
                <SelectTrigger id="date-range">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full gap-2 md:max-w-sm">
              <Label htmlFor="robot-filter">Robot</Label>
              <Select defaultValue={robotFilter} onValueChange={setRobotFilter}>
                <SelectTrigger id="robot-filter">
                  <SelectValue placeholder="Select robot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Robots</SelectItem>
                  <SelectItem value="RBT-001">Alpha (RBT-001)</SelectItem>
                  <SelectItem value="RBT-002">Beta (RBT-002)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Cleaning Activity Logs</CardTitle>
                  <CardDescription>Records of all cleaning operations</CardDescription>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search logs..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Robot</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <TableRow key={i}>
                        <TableCell>2023-06-{10 + i} 09:30</TableCell>
                        <TableCell>Alpha (RBT-001)</TableCell>
                        <TableCell>Completed</TableCell>
                        <TableCell className="hidden md:table-cell">45 min</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between border-t p-4">
              <div className="text-sm text-muted-foreground mb-2 sm:mb-0">Showing 5 of 25 logs</div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" disabled className="flex-1 sm:flex-none">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Records</CardTitle>
              <CardDescription>History of all maintenance activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium">Scheduled Maintenance</h4>
                  <div className="mt-2 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">Brush Replacement</p>
                        <p className="text-sm text-muted-foreground">Robot RBT-001 (Alpha)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>2023-06-25</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">Battery Inspection</p>
                        <p className="text-sm text-muted-foreground">Robot RBT-002 (Beta)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>2023-07-10</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Completed Maintenance</h4>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2"
                    >
                      <div>
                        <p className="font-medium">
                          {i === 1 ? "Brush Replacement" : i === 2 ? "Battery Inspection" : "Full System Check"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {i === 1 ? "Robot RBT-001 (Alpha)" : i === 2 ? "Robot RBT-002 (Beta)" : "All Robots"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{i === 1 ? "2023-05-15" : i === 2 ? "2023-04-20" : "2023-03-05"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Schedule New Maintenance</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="system-logs" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>System Logs</CardTitle>
                  <CardDescription>Technical logs and system events</CardDescription>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search logs..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Event Type</TableHead>
                      <TableHead className="hidden md:table-cell">Source</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="hidden lg:table-cell">Severity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <TableRow key={i}>
                        <TableCell>
                          2023-06-{10 + i} {i % 2 === 0 ? "10:" : "14:"}30:{i * 10}
                        </TableCell>
                        <TableCell>{i % 3 === 0 ? "Error" : i % 2 === 0 ? "Warning" : "Info"}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {i % 2 === 0 ? "System" : "Robot RBT-00" + ((i % 2) + 1)}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {i % 3 === 0
                            ? "Connection failed"
                            : i % 2 === 0
                              ? "Low battery warning"
                              : "Operation completed successfully"}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              i % 3 === 0
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                                : i % 2 === 0
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                            }`}
                          >
                            {i % 3 === 0 ? "High" : i % 2 === 0 ? "Medium" : "Low"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">Details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between border-t p-4">
              <div className="text-sm text-muted-foreground mb-2 sm:mb-0">Showing 5 of 120 logs</div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" disabled className="flex-1 sm:flex-none">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
