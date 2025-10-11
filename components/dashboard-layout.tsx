"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bell,
  ClipboardList,
  Cog,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Sun,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto bg-muted/20">
          <div className="flex items-center justify-between border-b bg-background px-4 py-3 w-full">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <h1 className="text-lg font-semibold">Solar Robot Management System</h1>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      3
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto">
                    <DropdownMenuItem
                      className="flex flex-col items-start p-3 cursor-pointer"
                      onClick={() => router.push("/dashboard/notifications")}
                    >
                      <div className="font-medium">Maintenance Required</div>
                      <div className="text-sm text-muted-foreground">Robot Alpha needs brush replacement</div>
                      <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex flex-col items-start p-3 cursor-pointer"
                      onClick={() => router.push("/dashboard/notifications")}
                    >
                      <div className="font-medium">Cleaning Complete</div>
                      <div className="text-sm text-muted-foreground">Robot Beta finished cleaning Section B</div>
                      <div className="text-xs text-muted-foreground mt-1">5 hours ago</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex flex-col items-start p-3 cursor-pointer"
                      onClick={() => router.push("/dashboard/notifications")}
                    >
                      <div className="font-medium">Low Battery</div>
                      <div className="text-sm text-muted-foreground">Robot Alpha battery below 20%</div>
                      <div className="text-xs text-muted-foreground mt-1">1 day ago</div>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center" onClick={() => router.push("/dashboard/notifications")}>
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Admin User</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                    <Avatar className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="container mx-auto p-4 md:p-6 max-w-full min-h-[calc(100vh-57px)]">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}

function AppSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <Sun className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">JAGRUT solar bot</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
              <Link href="/dashboard">
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/control")}>
              <Link href="/dashboard/control">
                <Cog className="h-5 w-5" />
                <span>Robot Control</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/diagnostics")}>
              <Link href="/dashboard/diagnostics">
                <ClipboardList className="h-5 w-5" />
                <span>System Diagnostics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/reports")}>
              <Link href="/dashboard/reports">
                <FileText className="h-5 w-5" />
                <span>Reports & Logs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/users")}>
              <Link href="/dashboard/users">
                <Users className="h-5 w-5" />
                <span>User Management</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/support")}>
              <Link href="/dashboard/support">
                <HelpCircle className="h-5 w-5" />
                <span>Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-xs">System Online</span>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
