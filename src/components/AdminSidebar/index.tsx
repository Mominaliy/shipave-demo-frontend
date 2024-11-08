import {
  Bell,
  ChartNoAxesCombined,
  CreditCard,
  Plane,
  Settings,
  Users,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";

type AdminSidebarProps = {
  activeItem: string;
  setActiveItem: (item: string) => void;
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeItem,
  setActiveItem,
}) => {
  const sidebarItems = [
    { name: "Overview", icon: ChartNoAxesCombined },
    { name: "Manage Users", icon: Users },
    { name: "Transactions", icon: CreditCard },
    { name: "Escrow Payments", icon: CreditCard },
    { name: "Notifications", icon: Bell },
    { name: "Settings", icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/admin/dashboard" className="flex items-center">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#008080] text-white">
                  <Plane className="size-5" />
                </div>
                <div className="ml-2 flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-[#008080]">ShipAve</span>
                  <span className="text-xs text-muted-foreground">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-8rem)] px-2">
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  onClick={() => setActiveItem(item.name)}
                  isActive={activeItem === item.name}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-center p-4">
          <Button variant="outline" className="w-full">
            Logout
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;
