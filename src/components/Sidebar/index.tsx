// Sidebar.tsx

import {
  BaggageClaim,
  Bell,
  Home,
  Inbox,
  Info,
  Package,
  Plane,
  PlaneTakeoff,
  PlusCircle,
  Settings,
  User,
  Users,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "../ui/sidebar";

interface SidebarProps {
  userRole: "shipper" | "traveler";
  toggleRole: () => void;
}

export function MainSiderbar({ userRole, toggleRole }: SidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard" className="flex items-center">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#008080] text-white">
                  <Plane className="size-5" />
                </div>
                <div className="ml-2 flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-[#008080]">ShipAve</span>
                  <span className="text-xs text-muted-foreground">v1.0.0</span>
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
                      <PlusCircle className="mr-1 h-4 w-4" /> Create Shipment
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
                      <Home className="mr-2 h-4 w-4" /> Favorite Destinations
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
                <a href="/dashboard/profile">
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
  );
}
