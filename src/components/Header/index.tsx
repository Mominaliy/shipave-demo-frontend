// Header.tsx

import { LogOut, PlaneTakeoff, BaggageClaim, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarTrigger } from "../ui/sidebar";

interface HeaderProps {
  userRole: "shipper" | "traveler";
  toggleRole: () => void;
}

export default function Header({ userRole, toggleRole }: HeaderProps) {
  return (
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
              Switch to {userRole === "shipper" ? "Traveler" : "Shipper"}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="default" className="bg-[#008080] hover:bg-[#006666]">
          {userRole === "shipper" ? "Create Shipment" : "Submit Availability"}
        </Button>
      </div>
    </header>
  );
}
