"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  CreditCard,
  Bell,
  Settings,
  Search,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Plus,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    verified: true,
    joinDate: "2023-01-15",
    lastLogin: "2023-05-10",
    transactions: 15,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Active",
    verified: false,
    joinDate: "2023-02-20",
    lastLogin: "2023-05-09",
    transactions: 8,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    status: "Suspended",
    verified: true,
    joinDate: "2023-03-05",
    lastLogin: "2023-04-30",
    transactions: 3,
  },
];

const transactionData = [
  { date: "2023-05-01", amount: 500 },
  { date: "2023-05-02", amount: 750 },
  { date: "2023-05-03", amount: 600 },
  { date: "2023-05-04", amount: 900 },
  { date: "2023-05-05", amount: 800 },
  { date: "2023-05-06", amount: 1000 },
  { date: "2023-05-07", amount: 1200 },
];

const userGrowthData = [
  { date: "2023-05-01", users: 1000 },
  { date: "2023-05-02", users: 1050 },
  { date: "2023-05-03", users: 1100 },
  { date: "2023-05-04", users: 1200 },
  { date: "2023-05-05", users: 1300 },
  { date: "2023-05-06", users: 1400 },
  { date: "2023-05-07", users: 1500 },
];

export default function AdminDashboard() {
  const [activeItem, setActiveItem] = React.useState("Overview");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [expandedUser, setExpandedUser] = React.useState<number | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="flex h-full w-full bg-gradient-to-br from-slate-300/40 to-slate-100 text-gray-900">
        <AdminSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        <div className="flex flex-col w-full">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b border-gray-200 px-6 bg-white shadow-sm">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">{activeItem}</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-900"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-900"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                {activeItem === "Overview" && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Users
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1,500</div>
                        <p className="text-xs text-muted-foreground">
                          +20% from last month
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Revenue
                        </CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                          +15% from last month
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Active Users
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">573</div>
                        <p className="text-xs text-muted-foreground">
                          +201 since last hour
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Conversion Rate
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3.2%</div>
                        <p className="text-xs text-muted-foreground">
                          +0.5% from last week
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="md:col-span-2 bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>Transaction Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer
                          config={{
                            amount: {
                              label: "Amount",
                              color: "hsl(var(--chart-1))",
                            },
                          }}
                          className="h-[300px] w-full max-w-full px-4"
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={transactionData}>
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip content={<ChartTooltipContent />} />
                              <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="var(--color-amount)"
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                    <Card className="md:col-span-2 bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer
                          config={{
                            users: {
                              label: "Users",
                              color: "hsl(var(--chart-2))",
                            },
                          }}
                          className="h-[300px] w-full max-w-full px-4"
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userGrowthData}>
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip content={<ChartTooltipContent />} />
                              <Line
                                type="monotone"
                                dataKey="users"
                                stroke="var(--color-users)"
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </div>
                )}
                {activeItem === "Manage Users" && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm bg-white border-gray-200 text-gray-900"
                      />
                    </div>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="w-[40px]"></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Verified</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map((user) => (
                            <React.Fragment key={user.id}>
                              <TableRow className="hover:bg-gray-50 transition-colors duration-150">
                                <TableCell>
                                  <Collapsible>
                                    <CollapsibleTrigger
                                      onClick={() =>
                                        setExpandedUser(
                                          expandedUser === user.id
                                            ? null
                                            : user.id
                                        )
                                      }
                                      className="h-4 w-4 text-gray-500 hover:text-gray-700 transition-colors duration-150"
                                    >
                                      {expandedUser === user.id ? (
                                        <ChevronUp className="h-4 w-4" />
                                      ) : (
                                        <ChevronDown className="h-4 w-4" />
                                      )}
                                    </CollapsibleTrigger>
                                  </Collapsible>
                                </TableCell>
                                <TableCell className="font-medium">
                                  {user.name}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                      user.status === "Active"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {user.status}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  {user.verified ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <XCircle className="h-5 w-5 text-red-500" />
                                  )}
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                      >
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>View</DropdownMenuItem>
                                      <DropdownMenuItem>
                                        {user.status === "Active"
                                          ? "Suspend"
                                          : "Activate"}
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colSpan={6} className="p-0">
                                  <Collapsible open={expandedUser === user.id}>
                                    <CollapsibleContent className="px-4 py-2 bg-gray-50">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <h3 className="font-semibold text-gray-700">
                                            User Details
                                          </h3>
                                          <p className="text-sm text-gray-600">
                                            Join Date: {user.joinDate}
                                          </p>
                                          <p className="text-sm text-gray-600">
                                            Last Login: {user.lastLogin}
                                          </p>
                                          <p className="text-sm text-gray-600">
                                            Total Transactions:{" "}
                                            {user.transactions}
                                          </p>
                                        </div>
                                        <div>
                                          <h3 className="font-semibold text-gray-700">
                                            Verification
                                          </h3>
                                          {user.verified ? (
                                            <p className="text-sm text-green-600">
                                              User is verified
                                            </p>
                                          ) : (
                                            <div>
                                              <p className="text-sm text-red-600">
                                                User is not verified
                                              </p>
                                              <Button
                                                size="sm"
                                                className="mt-2"
                                              >
                                                Verify User
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </CollapsibleContent>
                                  </Collapsible>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
                {activeItem === "Transactions" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold text-gray-800">
                        Recent Transactions
                      </h2>
                    </div>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Escrow Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            {
                              id: "TX001",
                              amount: "$500",
                              status: "Completed",
                              escrow: "Released",
                            },
                            {
                              id: "TX002",
                              amount: "$750",
                              status: "Pending",
                              escrow: "Held",
                            },
                            {
                              id: "TX003",
                              amount: "$1000",
                              status: "Disputed",
                              escrow: "Held",
                            },
                          ].map((transaction) => (
                            <TableRow
                              key={transaction.id}
                              className="hover:bg-gray-50 transition-colors duration-150"
                            >
                              <TableCell className="font-medium">
                                {transaction.id}
                              </TableCell>
                              <TableCell>{transaction.amount}</TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    transaction.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : transaction.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {transaction.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    transaction.escrow === "Released"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-purple-100 text-purple-800"
                                  }`}
                                >
                                  {transaction.escrow}
                                </span>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Resolve Dispute
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
