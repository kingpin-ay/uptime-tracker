"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, ExternalLink, Globe, MoreHorizontal, XCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { UptimeChart } from "@/components/uptime-chart"
import { MonitorHistoryTable } from "@/components/monitor-history-table"

export default function MonitorDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - in a real app, this would come from an API call
  const monitor = {
    id: params.id,
    name: "Example.com",
    type: "website",
    url: "https://example.com",
    status: "up",
    lastChecked: "2 minutes ago",
    uptime: {
      "24h": "99.9%",
      "7d": "99.8%",
    },
    responseTime: "187ms",
    checkInterval: "15 minutes",
    method: "GET",
  }

  const handleDelete = () => {
    setIsLoading(true)

    // Simulate deletion
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Monitor deleted",
        description: "The monitor has been deleted successfully.",
      })
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight">{monitor.name}</h2>
          <Badge variant={monitor.status === "up" ? "outline" : "destructive"} className="ml-2">
            {monitor.status === "up" ? (
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> UP
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <XCircle className="h-3 w-3" /> DOWN
              </span>
            )}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={monitor.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" /> Visit
            </a>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/dashboard/monitors/${params.id}/edit`)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-500" disabled={isLoading}>
                {isLoading ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="p-4">
            <CardDescription>Status</CardDescription>
            <CardTitle className="text-xl flex items-center gap-2">
              {monitor.status === "up" ? (
                <span className="flex items-center gap-1 text-green-500">
                  <CheckCircle className="h-4 w-4" /> Online
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500">
                  <XCircle className="h-4 w-4" /> Offline
                </span>
              )}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardDescription>Last Checked</CardDescription>
            <CardTitle className="text-xl">{monitor.lastChecked}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardDescription>Uptime (24h)</CardDescription>
            <CardTitle className="text-xl">{monitor.uptime["24h"]}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardDescription>Response Time</CardDescription>
            <CardTitle className="text-xl">{monitor.responseTime}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monitor Details</CardTitle>
          <CardDescription>Configuration and status information for this monitor.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">Type</p>
              <p className="flex items-center gap-1 text-sm">
                {monitor.type === "website" ? (
                  <Globe className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Clock className="h-4 w-4 text-muted-foreground" />
                )}
                {monitor.type === "website" ? "Website/API" : "Cron Job"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">URL</p>
              <p className="text-sm break-all">{monitor.url}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Check Interval</p>
              <p className="text-sm">{monitor.checkInterval}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">HTTP Method</p>
              <p className="text-sm">{monitor.method}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="uptime" className="space-y-4">
        <TabsList>
          <TabsTrigger value="uptime">Uptime</TabsTrigger>
          <TabsTrigger value="history">Check History</TabsTrigger>
          <TabsTrigger value="alerts">Alert History</TabsTrigger>
        </TabsList>
        <TabsContent value="uptime">
          <Card>
            <CardHeader>
              <CardTitle>Uptime History</CardTitle>
              <CardDescription>Uptime performance over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <UptimeChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Check History</CardTitle>
              <CardDescription>Recent check results for this monitor.</CardDescription>
            </CardHeader>
            <CardContent>
              <MonitorHistoryTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
              <CardDescription>Recent alerts for this monitor.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">No alerts in the last 7 days.</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
