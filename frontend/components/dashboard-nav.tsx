"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AlertCircle, BarChart, Clock, Cog, Globe, Home, Menu, Server, Users } from "lucide-react"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "All Monitors",
    href: "/dashboard/monitors",
    icon: <Server className="h-4 w-4" />,
  },
  {
    title: "Websites/APIs",
    href: "/dashboard/websites",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    title: "Cron Jobs",
    href: "/dashboard/cronjobs",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    title: "Alerts",
    href: "/dashboard/alerts",
    icon: <AlertCircle className="h-4 w-4" />,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Cog className="h-4 w-4" />,
  },
]

export default function DashboardNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isMobile = useMobile()

  if (!isMobile) {
    return (
      <div className="hidden border-r bg-background md:block w-64">
        <ScrollArea className="h-full py-6">
          <nav className="grid gap-2 px-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden fixed bottom-4 right-4 z-40 rounded-full shadow-lg">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <ScrollArea className="h-full py-6">
          <nav className="grid gap-2 px-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
