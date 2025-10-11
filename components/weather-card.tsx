import { Cloud, Sun, Wind } from "lucide-react"

export function WeatherCard() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Sun className="h-10 w-10 text-yellow-500" />
        <div>
          <h3 className="text-2xl font-bold">28°C</h3>
          <p className="text-muted-foreground">Sunny</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <Wind className="h-5 w-5 text-blue-500" />
          <span className="text-xs font-medium">8 km/h</span>
        </div>
        <div className="flex flex-col items-center">
          <Cloud className="h-5 w-5 text-blue-500" />
          <span className="text-xs font-medium">10%</span>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">San Jose, CA</p>
          <p className="text-xs text-muted-foreground">Optimal conditions</p>
        </div>
      </div>
    </div>
  )
}
