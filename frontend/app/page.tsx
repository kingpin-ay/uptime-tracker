import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Clock, Globe, Server } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <CheckCircle className="h-6 w-6 text-primary" />
            <span>UptimeMonitor</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium">
              Login
            </Link>
            <Link href="/register">
              <Button>Sign Up Free</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Monitor Your Digital Pulse
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Keep track of your websites, APIs, and cron jobs with our reliable monitoring system. Get instant
                    alerts when something goes wrong.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1.5">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-md rounded-lg border bg-background p-4 shadow-lg">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Monitor Status</h3>
                          <span className="text-xs text-muted-foreground">Last updated: 2 mins ago</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between rounded-lg border p-2">
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-green-500" />
                              <span className="font-medium">example.com</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-medium text-green-500">UP</span>
                              <span className="text-xs text-muted-foreground">99.9%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-2">
                            <div className="flex items-center gap-2">
                              <Server className="h-4 w-4 text-green-500" />
                              <span className="font-medium">api.example.com</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-medium text-green-500">UP</span>
                              <span className="text-xs text-muted-foreground">100%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-2">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-red-500" />
                              <span className="font-medium">Daily Backup</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-medium text-red-500">MISSED</span>
                              <span className="text-xs text-muted-foreground">2h ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need to stay online
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive monitoring solutions for developers and system administrators.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Website Monitoring</h3>
                <p className="text-center text-muted-foreground">
                  Monitor your websites and APIs with regular health checks at configurable intervals.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Cron Job Monitoring</h3>
                <p className="text-center text-muted-foreground">
                  Verify your scheduled tasks are running on time with unique ping URLs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Instant Alerts</h3>
                <p className="text-center text-muted-foreground">
                  Receive immediate notifications when your services experience downtime.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Start monitoring in minutes</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our simple setup process gets you up and running quickly. No complex configurations needed.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg">Sign Up Free</Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col space-y-4 rounded-xl border bg-muted/50 p-4">
                <div className="flex items-center gap-2 rounded-lg bg-background p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <div className="font-medium">Create an account</div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-background p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <div className="font-medium">Add your first monitor</div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-background p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <div className="font-medium">Get notified when issues occur</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span>UptimeMonitor</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} UptimeMonitor. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
