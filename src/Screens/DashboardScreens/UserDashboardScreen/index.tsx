"use client";

import { useState } from "react";
import {
  BaggageClaim,
  Bell,
  Home,
  Inbox,
  Info,
  LogOut,
  Menu,
  Package,
  Plane,
  PlaneTakeoff,
  PlusCircle,
  Search,
  Settings,
  SwitchCamera,
  User,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnboardingForm from "@/components/Forms/OnboardingForm";
import { AnimatePresence, motion } from "framer-motion";

type UserRole = "shipper" | "traveler";

export default function UserDashboardScreen() {
  const [userRole, setUserRole] = useState<UserRole>("shipper");
  const [showOnboarding, setShowOnboarding] = useState(true);

  const toggleRole = () => {
    setUserRole(userRole === "shipper" ? "traveler" : "shipper");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-[#f8f8f8] dark:bg-gray-900">
        <AnimatePresence>
          {showOnboarding && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <OnboardingForm onSkip={() => setShowOnboarding(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <a href="#" className="flex items-center">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#008080] text-white">
                      <Plane className="size-5" />
                    </div>
                    <div className="ml-2 flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold text-[#008080]">
                        ShipAve
                      </span>
                      <span className="text-xs text-muted-foreground">
                        v1.0.0
                      </span>
                    </div>
                  </a>
                </SidebarMenuButton>
                <div className="flex flex-col items-center justify-center w-full my-5 ">
                  <SidebarMenuButton
                    className="bg-[#008080] active:bg-teal-900 active:text-gray-50 text-white hover:bg-teal-700 hover:text-white font-semibold transition-colors duration-200 py-[18px] px-5"
                    onClick={toggleRole}
                  >
                    {userRole === "shipper" ? (
                      <PlaneTakeoff className="mr-2 h-4 w-4" />
                    ) : (
                      <BaggageClaim className="mr-2 h-4 w-4" />
                    )}
                    Switch to {userRole === "shipper" ? "Traveler" : "Shipper"}
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <ScrollArea className="h-[calc(100vh-8rem)] px-2">
              <SidebarMenu>
                {userRole === "shipper" ? (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <PlusCircle className="mr-1 h-4 w-4" /> Create
                          Shipment
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <Package className="mr-2 h-4 w-4" /> My Shipments
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <Home className="mr-2 h-4 w-4" /> Favorite
                          Destinations
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                ) : (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <PlusCircle className="mr-2 h-4 w-4" /> Submit
                          Availability
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <Package className="mr-2 h-4 w-4" /> My Routes
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <Users className="mr-2 h-4 w-4" /> Matches
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <Separator className="my-2" />
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <Bell className="mr-2 h-4 w-4" /> Notifications
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/messages">
                      <Inbox className="mr-2 h-4 w-4" /> Messages
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <Info className="mr-2 h-4 w-4" /> Help Center
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </ScrollArea>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <div className="flex flex-1 flex-col overflow-hidden">
            <header className="flex h-16 items-center justify-between border-b bg-white px-4">
              <div className="flex items-center">
                <SidebarTrigger />
                <h1 className="ml-4 text-2xl font-bold font-serif text-[#008080]">
                  User-Dashboard
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <form className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="w-full appearance-none bg-[#f8f8f8] pl-8 sm:w-64"
                  />
                </form>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={toggleRole}>
                      Switch to{" "}
                      {userRole === "shipper" ? "Traveler" : "Shipper"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="default"
                  className="bg-[#008080] hover:bg-[#006666]"
                >
                  {userRole === "shipper"
                    ? "Create Shipment"
                    : "Submit Availability"}
                </Button>
              </div>
            </header>
            <div className="w-full bg-orange-100">
              <p className="p-2 text-sm">
                Please Complete Onboarding Form to Start working as Traveller or
                Shipper.{" "}
                <span
                  onClick={() => {
                    setShowOnboarding(true);
                  }}
                  className="font-semibold hover:text-primaryColor cursor-pointer underline"
                >
                  Click here
                </span>
              </p>
            </div>
            <main className="flex-1 overflow-y-auto p-4 mt-2">
              <Tabs defaultValue="overview" className="h-full space-y-6">
                <div className="space-between flex items-center">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </TabsList>
                </div>
                {/* <Button 
                className="px-6 py-3 font-semibold text-white text-lg bg-gradient-to-r from-[#008080] via-teal-600 to-teal-700 
                            hover:from-teal-700 hover:via-teal-500 hover:to-teal-700 transition-all duration-300 
                            shadow-md hover:shadow-lg rounded-md transform hover:scale-105"
                onClick={()=>{}} 
                >
                {userRole === 'shipper' ? 'Create Shipment' : 'Submit Availability'}
                </Button> */}
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {userRole === "shipper"
                            ? "Active Shipments"
                            : "Upcoming Trips"}
                        </CardTitle>
                        <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-[#008080] text-white">
                          <Package className="size-4" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                          +2 from last month
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Recent Matches
                        </CardTitle>
                        <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-[#008080] text-white">
                          <User className="size-4" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                          +3 from last week
                        </p>
                      </CardContent>
                    </Card>
                    {userRole === "shipper" && (
                      <Card>
                        <CardHeader className="flex flex-row gap-1 items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Favorite Destinations
                          </CardTitle>
                          <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-[#008080] text-white">
                            <Home className="size-4" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">3</div>
                          <p className="text-xs text-muted-foreground">
                            New York, London, Tokyo
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                      <CardHeader>
                        <CardTitle>
                          {userRole === "shipper"
                            ? "Recent Shipments"
                            : "Recent Trips"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center">
                              <div className="mr-4 h-8 w-8 rounded-full bg-[#008080] text-white flex items-center justify-center">
                                {item}
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  Shipment #{1000 + item}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {userRole === "shipper"
                                    ? "En route to New York"
                                    : "Departing from London"}
                                </p>
                              </div>
                              <div className="ml-auto text-xs text-muted-foreground">
                                2h ago
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="col-span-3">
                      <CardHeader>
                        <CardTitle>Recent Matches</CardTitle>
                        <CardDescription>
                          You have{" "}
                          {userRole === "shipper"
                            ? "5 new traveler"
                            : "3 new shipment"}{" "}
                          matches
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center">
                              <Avatar className="h-9 w-9">
                                <AvatarImage
                                  src={`/avatar-${item}.png`}
                                  alt="Avatar"
                                />
                                <AvatarFallback>OM</AvatarFallback>
                              </Avatar>
                              <div className="ml-4">
                                <p className="text-sm font-medium">
                                  Oliver Martinez
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {userRole === "shipper"
                                    ? "Traveling to Paris"
                                    : "Needs delivery to Berlin"}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-auto"
                              >
                                View
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
