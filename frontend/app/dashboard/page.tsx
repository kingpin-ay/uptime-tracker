import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlertCircle, Clock, Globe, Plus, Server } from "lucide-react"
import Link from "next/link"
import { MonitorStatusCard } from "@/components/monitor-status-card"
import { MonitorsList } from "@/components/monitors-list"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Monitor your websites, APIs, and cron jobs in one place.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/monitors/new">
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Add Monitor
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MonitorStatusCard
          title="Total Monitors"
          value="5"
          icon={<Server className="h-4 w-4 text-muted-foreground" />}
        />
        <MonitorStatusCard title="Websites/APIs" value="3" icon={<Globe className="h-4 w-4 text-muted-foreground" />} />
        <MonitorStatusCard title="Cron Jobs" value="2" icon={<Clock className="h-4 w-4 text-muted-foreground" />} />
        <MonitorStatusCard
          title="Alerts"
          value="1"
          icon={<AlertCircle className="h-4 w-4 text-red-500" />}
          variant="destructive"
        />
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Monitors</TabsTrigger>
          <TabsTrigger value="websites">Websites/APIs</TabsTrigger>
          <TabsTrigger value="cronjobs">Cron Jobs</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <MonitorsList />
        </TabsContent>
        <TabsContent value="websites" className="space-y-4">
          <MonitorsList type="website" />
        </TabsContent>
        <TabsContent value="cronjobs" className="space-y-4">
          <MonitorsList type="cronjob" />
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
              <CardDescription>Monitors that are currently experiencing issues.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-red-500" />
                      <div>
                        <div className="font-medium">Daily Backup</div>
                        <div className="text-sm text-muted-foreground">Cron Job</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-red-500">MISSED</div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Last ping: 2 hours ago (Expected: 30 minutes)
                  </div>
                  <div className="mt-4 flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Acknowledge
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
