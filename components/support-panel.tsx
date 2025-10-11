"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, HelpCircle, LifeBuoy, Mail, MessageSquare, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function SupportPanel() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Support request submitted",
      description: "We'll get back to you as soon as possible.",
    })
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Support</h2>
        <p className="text-sm text-muted-foreground">Get help with your solar robot system.</p>
      </div>

      <Tabs defaultValue="contact">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-4 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Support</CardTitle>
                <CardDescription>Fill out the form to get help from our support team.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
                <CardDescription>Reach out to us directly using the following information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+1 (800) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Monday - Friday, 9AM - 5PM PST</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@jagrutsolarbot.example.com</p>
                    <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">Available on our website</p>
                    <p className="text-sm text-muted-foreground">Monday - Friday, 9AM - 5PM PST</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Visit Help Center
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4 pt-4">
          <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <CardTitle className="text-lg text-red-500">Emergency Contact</CardTitle>
              </div>
              <CardDescription>Use these contacts only in case of emergency situations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-white p-4 dark:bg-background">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Emergency Hotline</p>
                    <p className="text-lg font-bold">+1 (800) 999-8888</p>
                    <p className="text-sm text-muted-foreground">Available 24/7 for critical issues</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">When to use emergency contact:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm">Robot malfunction causing safety hazards</li>
                  <li className="text-sm">System security breach</li>
                  <li className="text-sm">Electrical issues or fire hazards</li>
                  <li className="text-sm">Physical damage to solar panels or equipment</li>
                </ul>
              </div>

              <div className="rounded-md bg-white p-4 dark:bg-background">
                <div className="flex items-start gap-3">
                  <LifeBuoy className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium">On-Site Emergency Response</p>
                    <p className="text-sm">
                      For critical hardware failures or safety issues, we can dispatch a technician to your location.
                    </p>
                    <p className="text-sm font-medium mt-2">Response time: Within 4 hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Call Emergency Hotline
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
