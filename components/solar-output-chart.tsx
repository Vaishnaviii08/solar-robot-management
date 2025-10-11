"use client"

import { ChartContainer } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Mon",
    beforeCleaning: 42,
    afterCleaning: 52,
  },
  {
    name: "Tue",
    beforeCleaning: 40,
    afterCleaning: 49,
  },
  {
    name: "Wed",
    beforeCleaning: 45,
    afterCleaning: 54,
  },
  {
    name: "Thu",
    beforeCleaning: 39,
    afterCleaning: 48,
  },
  {
    name: "Fri",
    beforeCleaning: 43,
    afterCleaning: 51,
  },
  {
    name: "Sat",
    beforeCleaning: 41,
    afterCleaning: 50,
  },
  {
    name: "Sun",
    beforeCleaning: 44,
    afterCleaning: 53,
  },
]

export function SolarOutputChart() {
  return (
    <ChartContainer
      config={{
        beforeCleaning: {
          label: "Before Cleaning",
          color: "hsl(var(--chart-1))",
        },
        afterCleaning: {
          label: "After Cleaning",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="aspect-[4/3] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="beforeCleaning" fill="var(--color-beforeCleaning)" />
          <Bar dataKey="afterCleaning" fill="var(--color-afterCleaning)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
