"use client"

import { Battery, BatteryCharging, BatteryWarning, MapPin, Wrench } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface RobotStatusCardProps {
  id: string
  name: string
  status: "Cleaning" | "Charging" | "Standby" | "Maintenance" | "Error"
  batteryLevel: number
  location: string
  lastMaintenance: string
  alert?: boolean
  onControlClick?: () => void
}

export function RobotStatusCard({
  id,
  name,
  status,
  batteryLevel,
  location,
  lastMaintenance,
  alert = false,
  onControlClick,
}: RobotStatusCardProps) {
  const getBatteryColor = (level: number) => {
    if (level < 20) return "text-red-500"
    if (level < 50) return "text-yellow-500"
    return "text-primary"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Cleaning":
        return <Badge className="bg-primary">Cleaning</Badge>
      case "Charging":
        return <Badge className="bg-blue-500">Charging</Badge>
      case "Standby":
        return <Badge variant="outline">Standby</Badge>
      case "Maintenance":
        return <Badge variant="destructive">Maintenance</Badge>
      case "Error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getBatteryIcon = () => {
    if (status === "Charging") return <BatteryCharging className={`h-5 w-5 text-blue-500`} />
    if (batteryLevel < 20) return <BatteryWarning className="h-5 w-5 text-red-500" />
    return <Battery className={`h-5 w-5 ${getBatteryColor(batteryLevel)}`} />
  }

  return (
    <Card className={alert ? "border-red-500" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <p className="text-sm text-muted-foreground">ID: {id}</p>
        </div>
        {getStatusBadge(status)}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getBatteryIcon()}
            <span className="font-medium">Battery</span>
          </div>
          <span className={`font-bold ${getBatteryColor(batteryLevel)}`}>{batteryLevel}%</span>
        </div>
        <Progress value={batteryLevel} className="h-2" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Location</span>
            </div>
            <p className="text-sm">{location}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Last Maintenance</span>
            </div>
            <p className="text-sm">{lastMaintenance}</p>
          </div>
        </div>

        {alert && (
          <div className="mt-2 rounded-md bg-red-50 p-2 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200">
            <span className="font-medium">Alert:</span> Maintenance required - Brush malfunction
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm" onClick={onControlClick} className="px-4">
          Control
        </Button>
      </CardFooter>
    </Card>
  )
}
