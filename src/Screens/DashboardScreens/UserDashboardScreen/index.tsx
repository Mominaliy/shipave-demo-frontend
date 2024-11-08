"use client";

import { useState } from "react";
import { BarChart, Package, TrendingUp, User, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OnboardingForm from "@/components/Forms/OnboardingForm";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

type UserRole = "shipper" | "traveler";

export default function UserDashboardScreen() {
  const router = useRouter();

  const [userRole, setUserRole] = useState<UserRole>("shipper");
  const [showOnboarding, setShowOnboarding] = useState(false);

  const toggleRole = () => {
    setUserRole(userRole === "shipper" ? "traveler" : "shipper");
  };

  return (
    <div className="flex h-full w-full bg-[#f8f8f8] dark:bg-gray-900">
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
      <div className="flex flex-1 flex-col overflow-hidden">
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
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#008080] tracking-tight">
              Welcome back, Alex
            </h1>
            <Button
              onClick={() => {
                router.push("/dashboard/createshipment");
              }}
              className="bg-primaryColor hover:bg-teal-700"
            >
              Create New Shipment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Shipments
                </CardTitle>
                <div className="bg-primaryColor p-1 rounded-lg">
                  <Package className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <div className="bg-primaryColor p-1 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$23,456</div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <div className="bg-primaryColor p-1 rounded-lg">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">+201 new users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Satisfaction Rate
                </CardTitle>
                <div className="bg-primaryColor p-1 rounded-lg">
                  <BarChart className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.2%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Shipments</CardTitle>
                <CardDescription>
                  You have 3 shipments in progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "SH-1234",
                      destination: "New York, USA",
                      status: "In Transit",
                    },
                    {
                      id: "SH-1235",
                      destination: "London, UK",
                      status: "Processing",
                    },
                    {
                      id: "SH-1236",
                      destination: "Tokyo, Japan",
                      status: "Delivered",
                    },
                  ].map((shipment) => (
                    <div key={shipment.id} className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {shipment.id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {shipment.destination}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Badge
                          className={`${shipment.status === "Delivered" ? "bg-primaryColor hover:bg-teal-700" : "bg-yellow-500 hover:bg-yellow-600"} cursor-pointer`}
                        >
                          {shipment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Top Travelers</CardTitle>
                <CardDescription>
                  Travelers with the most completed shipments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sophia Chen",
                      shipments: 78,
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                    {
                      name: "Aiden Patel",
                      shipments: 65,
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                    {
                      name: "Emma Rodriguez",
                      shipments: 59,
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                  ].map((traveler, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={traveler.avatar}
                          alt={traveler.name}
                        />
                        <AvatarFallback>
                          {traveler.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {traveler.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {traveler.shipments} shipments
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {index === 0 && <Badge>Top Traveler</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                New Shipment
              </Button>
              <Button
                onClick={() => {
                  router.push("/dashboard/findtraveller");
                }}
                variant="outline"
                className="w-full justify-start"
              >
                <Users className="mr-2 h-4 w-4" />
                Find Travelers
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart className="mr-2 h-4 w-4" />
                View Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Track Shipment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Track a Shipment</CardTitle>
              <CardDescription>
                Enter a shipment ID to get real-time updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" placeholder="Enter Shipment ID" />
                <Button type="submit">Track</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
