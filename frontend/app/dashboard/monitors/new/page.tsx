"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewMonitorPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const [monitorType, setMonitorType] = useState("website")
  const [pingUrl, setPingUrl] = useState("https://uptime.example.com/ping/abc123xyz789")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate monitor creation
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Monitor created",
        description: "Your new monitor has been created successfully.",
      })
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Add New Monitor</h2>
        <p className="text-muted-foreground">Create a new monitor to track your website, API, or cron job.</p>
      </div>

      <Tabs defaultValue="website" className="space-y-4" onValueChange={setMonitorType}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="website" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> Website/API
          </TabsTrigger>
          <TabsTrigger value="cronjob" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Cron Job
          </TabsTrigger>
        </TabsList>
        <TabsContent value="website">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Website/API Monitor</CardTitle>
                <CardDescription>Monitor a website or API endpoint by sending regular HTTP requests.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Monitor Name</Label>
                  <Input id="name" placeholder="My Website" required disabled={isLoading} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input id="url" type="url" placeholder="https://example.com" required disabled={isLoading} />
                </div>
                <div className="space-y-2">
                  <Label>HTTP Method</Label>
                  <RadioGroup defaultValue="GET" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="GET" id="get" disabled={isLoading} />
                      <Label htmlFor="get">GET</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="POST" id="post" disabled={isLoading} />
                      <Label htmlFor="post">POST</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interval">Check Interval</Label>
                  <Select defaultValue="15" disabled={isLoading}>
                    <SelectTrigger id="interval">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Every 5 minutes</SelectItem>
                      <SelectItem value="15">Every 15 minutes</SelectItem>
                      <SelectItem value="30">Every 30 minutes</SelectItem>
                      <SelectItem value="60">Every hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.back()} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Monitor"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="cronjob">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Cron Job Monitor</CardTitle>
                <CardDescription>
                  Monitor scheduled tasks by having them ping a unique URL after execution.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cron-name">Monitor Name</Label>
                  <Input id="cron-name" placeholder="Daily Backup" required disabled={isLoading} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expected-interval">Expected Interval</Label>
                  <Select defaultValue="30" disabled={isLoading}>
                    <SelectTrigger id="expected-interval">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">Every 15 minutes</SelectItem>
                      <SelectItem value="30">Every 30 minutes</SelectItem>
                      <SelectItem value="60">Every hour</SelectItem>
                      <SelectItem value="360">Every 6 hours</SelectItem>
                      <SelectItem value="720">Every 12 hours</SelectItem>
                      <SelectItem value="1440">Every day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ping URL</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={pingUrl} readOnly className="font-mono text-sm" />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(pingUrl)
                        toast({
                          title: "Copied to clipboard",
                          description: "Ping URL has been copied to clipboard.",
                        })
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Add this URL to your cron job to ping after successful execution.
                  </p>
                </div>
                <div className="rounded-lg border p-4 bg-muted/50">
                  <h4 className="font-medium mb-2">Example Usage</h4>
                  <div className="font-mono text-xs bg-background p-2 rounded">
                    <p># Linux crontab example</p>
                    <p>0 0 * * * /path/to/backup.sh && curl -s {pingUrl}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.back()} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Monitor"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
