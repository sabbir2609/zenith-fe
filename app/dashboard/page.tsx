"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Calendar,
  CreditCard,
  Hotel,
  ListChecks,
  Settings,
  ShieldAlert,
  Users,
  Wind,
  Activity,
  CheckSquare,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      {/* Welcome section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, John!</h2>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening at Zenith Hotel today
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            April 4, 2025 | 10:30 AM | 72°F Sunny
          </div>
          <Button>Check-in Guest</Button>
          <Button variant="outline">View Reports</Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+6% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Room Occupancy</CardTitle>
            <Hotel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">74%</div>
            <div className="mt-2">
              <Progress value={74} className="h-2" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">+2% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,389</div>
            <p className="text-xs text-muted-foreground text-green-600">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Check-ins</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">For today</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rooms">Rooms & Facilities</TabsTrigger>
          <TabsTrigger value="guests">Guests & Staff</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from across the hotel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-green-100 p-2">
                      <CheckSquare className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New check-in: Smith Family</p>
                      <p className="text-xs text-muted-foreground">10 minutes ago</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment received: $1,240</p>
                      <p className="text-xs text-muted-foreground">25 minutes ago</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-yellow-100 p-2">
                      <ListChecks className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Maintenance request: Room 304</p>
                      <p className="text-xs text-muted-foreground">45 minutes ago</p>
                    </div>
                    <Badge>Pending</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-red-100 p-2">
                      <Star className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New review: 5 stars</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" size="sm">
                  View all activity
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Check-ins</CardTitle>
                <CardDescription>Guests arriving today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{`G${i}`}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Guest {i}</p>
                        <p className="text-xs text-muted-foreground">Room {100 + i} • 2PM</p>
                      </div>
                      <Badge variant={i === 1 ? "default" : "outline"}>
                        {i === 1 ? "VIP" : "Standard"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" size="sm">
                  View all check-ins
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Room Availability</CardTitle>
                <CardDescription>Current status across all floors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium ${i % 3 === 0
                          ? "bg-green-100 text-green-700"
                          : i % 5 === 0
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {100 + i}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-100"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-blue-100"></div>
                    <span>Occupied</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-100"></div>
                    <span>Maintenance</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Energy Consumption</CardTitle>
                <CardDescription>Real-time monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Electricity</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Water</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>HVAC</span>
                    <span className="font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div className="rounded-lg bg-green-50 p-2 text-center text-sm text-green-700">
                  12% less energy used compared to last week
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rooms">
          <Card>
            <CardHeader>
              <CardTitle>Rooms & Facilities Management</CardTitle>
              <CardDescription>Manage all hotel rooms and facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Room management content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Additional tab contents would follow the same pattern */}
      </Tabs>
    </div>
  )
}