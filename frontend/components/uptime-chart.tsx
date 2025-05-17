"use client"

import { useEffect, useState } from "react"

export function UptimeChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[300px] w-full bg-muted/20 animate-pulse rounded-md" />
  }

  // Mock data for the uptime chart
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const uptimeData = [100, 100, 99.7, 100, 100, 98.5, 100]

  return (
    <div className="w-full h-[300px] relative">
      <div className="flex justify-between mb-2">
        {days.map((day, i) => (
          <div key={i} className="text-xs text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="flex h-[240px] items-end gap-2">
        {uptimeData.map((value, i) => (
          <div
            key={i}
            className="flex-1 bg-primary/20 rounded-t-md relative group"
            style={{ height: `${(value / 100) * 240}px` }}
          >
            <div
              className="absolute inset-x-0 bottom-0 bg-primary rounded-t-md"
              style={{ height: `${(value / 100) * 240}px` }}
            ></div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
              {value}% uptime
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between">
        {days.map((day, i) => (
          <div key={i} className="text-xs font-medium">
            {uptimeData[i]}%
          </div>
        ))}
      </div>
    </div>
  )
}
