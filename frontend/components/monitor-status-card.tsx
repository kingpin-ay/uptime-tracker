import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MonitorStatusCardProps {
  title: string
  value: string
  icon: React.ReactNode
  variant?: "default" | "destructive"
}

export function MonitorStatusCard({ title, value, icon, variant = "default" }: MonitorStatusCardProps) {
  return (
    <Card className={cn(variant === "destructive" && "border-red-500/20")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", variant === "destructive" && "text-red-500")}>{value}</div>
      </CardContent>
    </Card>
  )
}
