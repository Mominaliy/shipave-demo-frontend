"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { MainSiderbar } from "@/components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

type UserRole = "shipper" | "traveler";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userRole, setUserRole] = useState<UserRole>("shipper");

  const toggleRole = () => {
    setUserRole(userRole === "shipper" ? "traveler" : "shipper");
  };

  return (
    <SidebarProvider>
      <MainSiderbar userRole={userRole} toggleRole={toggleRole} />
      <div className="flex flex-col w-screen">
        <Header userRole={userRole} toggleRole={toggleRole} />
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
}
