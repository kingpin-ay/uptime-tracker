import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, ExternalLink, Globe, MoreHorizontal, XCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface MonitorsListProps {
  type?: "website" | "cronjob"
}

export function MonitorsList({ type }: MonitorsListProps) {
  // Mock data - in a real app, this would come from an API call
  const monitors = [
    {
      id: "1",
      name: "Example.com",
      type: "website",
      url: "https://example.com",
      status: "up",
      lastChecked: "2 minutes ago",
      uptime: "99.9%",
    },
    {
      id: "2",
      name: "API Service",
      type: "website",
      url: "https://api.example.com/health",
      status: "up",
      lastChecked: "5 minutes ago",
      uptime: "100%",
    },
    {
      id: "3",
      name: "Daily Backup",
      type: "cronjob",
      url: "https://uptime.example.com/ping/abc123",
      status: "down",
      lastChecked: "2 hours ago",
      uptime: "95.8%",
    },
    {
      id: "4",
      name: "Weekly Report",
      type: "cronjob",
      url: "https://uptime.example.com/ping/def456",
      status: "up",
      lastChecked: "3 days ago",
      uptime: "100%",
    },
    {
      id: "5",
      name: "Marketing Site",
      type: "website",
      url: "https://marketing.example.com",
      status: "up",
      lastChecked: "10 minutes ago",
      uptime: "99.7%",
    },
  ]

  const filteredMonitors = type ? monitors.filter((monitor) => monitor.type === type) : monitors

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === "website" ? "Website/API Monitors" : type === "cronjob" ? "Cron Job Monitors" : "All Monitors"}
        </CardTitle>
        <CardDescription>
          {type === "website"
            ? "Monitor your websites and APIs with regular health checks."
            : type === "cronjob"
              ? "Verify your scheduled tasks are running on time."
              : "All your monitors in one place."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredMonitors.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No monitors found. Create your first monitor to get started.
            </div>
          ) : (
            filteredMonitors.map((monitor) => (
              <div
                key={monitor.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-1">
                    {monitor.type === "website" ? (
                      <Globe className={`h-5 w-5 ${monitor.status === "up" ? "text-green-500" : "text-red-500"}`} />
                    ) : (
                      <Clock className={`h-5 w-5 ${monitor.status === "up" ? "text-green-500" : "text-red-500"}`} />
                    )}
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {monitor.name}
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
                    <div className="text-sm text-muted-foreground mt-1">
                      {monitor.type === "website" ? (
                        <span>Last checked: {monitor.lastChecked}</span>
                      ) : (
                        <span>Last ping: {monitor.lastChecked}</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 break-all">{monitor.url}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/monitors/${monitor.id}`}>View</Link>
                  </Button>
                  {monitor.type === "website" && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={monitor.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/monitors/${monitor.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
