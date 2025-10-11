"use client"

import type React from "react"

import { useState } from "react"
import { Edit, Lock, Plus, Search, Shield, UserPlus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function UsersPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState("operator")

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddUserOpen(false)
    toast({
      title: "User added",
      description: "The new user has been added successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
        <p className="text-sm text-muted-foreground">Manage user accounts and permissions.</p>
      </div>

      <Alert className="bg-primary/10 border-primary">
        <Shield className="h-4 w-4 text-primary" />
        <AlertTitle>Access Restriction</AlertTitle>
        <AlertDescription>System access is restricted to Administrator and Manager roles only.</AlertDescription>
      </Alert>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="w-full pl-8 sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddUser}>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account and set their permissions.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
                  <Label htmlFor="name" className="sm:text-right">
                    Name
                  </Label>
                  <Input id="name" className="sm:col-span-3" required />
                </div>
                <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
                  <Label htmlFor="email" className="sm:text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="sm:col-span-3" required />
                </div>
                <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
                  <Label htmlFor="role" className="sm:text-right">
                    Role
                  </Label>
                  <Select defaultValue={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="sm:col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="operator">Operator (Limited Access)</SelectItem>
                      <SelectItem value="viewer">Viewer (Limited Access)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(selectedRole === "operator" || selectedRole === "viewer") && (
                  <div className="col-span-1 rounded-md bg-yellow-50 p-2 text-sm text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 sm:col-span-4">
                    Note: This role has limited system access.
                  </div>
                )}
                <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
                  <Label className="sm:text-right">Access Level</Label>
                  <div className="sm:col-span-3">
                    <RadioGroup
                      defaultValue={selectedRole === "admin" || selectedRole === "manager" ? "full" : "limited"}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="full"
                          id="full"
                          disabled={selectedRole !== "admin" && selectedRole !== "manager"}
                        />
                        <Label htmlFor="full">Full Access</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="limited"
                          id="limited"
                          disabled={selectedRole === "admin" || selectedRole === "manager"}
                        />
                        <Label htmlFor="limited">Limited Access</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex-col gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddUserOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  Add User
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">User Accounts</CardTitle>
          <CardDescription>Manage user accounts and their access levels</CardDescription>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">User</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell className="hidden md:table-cell">john.doe@example.com</TableCell>
                  <TableCell>
                    <Badge className="bg-primary">Admin</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                      Active
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">2h ago</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Lock className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">Jane Smith</TableCell>
                  <TableCell className="hidden md:table-cell">jane.smith@example.com</TableCell>
                  <TableCell>
                    <Badge className="bg-primary">Manager</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                      Active
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">1d ago</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Lock className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                      <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">Robert Johnson</TableCell>
                  <TableCell className="hidden md:table-cell">robert.johnson@example.com</TableCell>
                  <TableCell>
                    <Badge variant="outline">Operator</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                      Active
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">3d ago</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Lock className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between">
          <div className="text-sm text-muted-foreground mb-2 sm:mb-0">Showing 3 of 10 users</div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" disabled className="flex-1 sm:flex-none">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Role Management</CardTitle>
            <CardDescription>Configure user roles and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2">
                <div>
                  <h4 className="font-medium">Administrator</h4>
                  <p className="text-sm text-muted-foreground">Full system access and control</p>
                </div>
                <Badge className="bg-primary w-fit">Full Access</Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2">
                <div>
                  <h4 className="font-medium">Manager</h4>
                  <p className="text-sm text-muted-foreground">Can manage robots and view reports</p>
                </div>
                <Badge className="bg-primary w-fit">Full Access</Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2">
                <div>
                  <h4 className="font-medium">Operator</h4>
                  <p className="text-sm text-muted-foreground">Can view diagnostics only</p>
                </div>
                <Badge variant="outline" className="w-fit">
                  Limited Access
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-medium">Viewer</h4>
                  <p className="text-sm text-muted-foreground">Read-only access to dashboard</p>
                </div>
                <Badge variant="outline" className="w-fit">
                  Limited Access
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add New Role
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activity Log</CardTitle>
            <CardDescription>Recent user activity and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 border-b pb-4">
                <Avatar className="h-8 w-8 hidden sm:flex">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe updated robot settings</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b pb-4">
                <Avatar className="h-8 w-8 hidden sm:flex">
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Jane Smith scheduled maintenance</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b pb-4">
                <Avatar className="h-8 w-8 hidden sm:flex">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe added a new robot</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-8 w-8 hidden sm:flex">
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Jane Smith logged in</p>
                  <p className="text-xs text-muted-foreground">5 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
