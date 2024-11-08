"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Plane,
  Clock,
  Calendar,
  Star,
  Search,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const travelersData = [
  {
    id: 1,
    nickname: "Emma",
    destination: "Paris",
    image: "/placeholder.svg?height=100&width=100",
    departureTime: "10:00 AM",
    departureDate: "2023-07-15",
    route: "London to Paris",
    languages: ["English", "French"],
    rating: 4.5,
    ratePerKg: 15,
  },
  {
    id: 2,
    nickname: "Jack",
    destination: "Rome",
    image: "/placeholder.svg?height=100&width=100",
    departureTime: "2:30 PM",
    departureDate: "2023-07-16",
    route: "Berlin to Rome",
    languages: ["English", "German", "Italian"],
    rating: 4.0,
    ratePerKg: 20,
  },
  {
    id: 3,
    nickname: "Mia",
    destination: "Tokyo",
    image: "/placeholder.svg?height=100&width=100",
    departureTime: "11:45 PM",
    departureDate: "2023-07-17",
    route: "New York to Tokyo",
    languages: ["English", "Japanese"],
    rating: 5.0,
    ratePerKg: 25,
  },
  {
    id: 4,
    nickname: "Leo",
    destination: "Sydney",
    image: "/placeholder.svg?height=100&width=100",
    departureTime: "8:15 AM",
    departureDate: "2023-07-18",
    route: "Los Angeles to Sydney",
    languages: ["English", "Spanish"],
    rating: 3.5,
    ratePerKg: 18,
  },
];

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [rateFilter, setRateFilter] = useState("");

  const filteredTravelers = travelersData.filter((traveler) => {
    const matchesSearch =
      traveler.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traveler.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = languageFilter
      ? traveler.languages.includes(languageFilter)
      : true;
    const matchesRate = rateFilter
      ? traveler.ratePerKg <= Number(rateFilter)
      : true;

    return matchesSearch && matchesLanguage && matchesRate;
  });

  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating);
    return (
      <div className="flex">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${index < roundedRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6 text-teal-900">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-teal-800 to-teal-600 mb-6"
      >
        Find Travelers
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600" />
          <Input
            type="text"
            placeholder="Search by nickname or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-teal-200 text-teal-900 focus-visible:ring-teal-400/50"
          />
        </div>

        <Select onValueChange={(value) => setLanguageFilter(value)}>
          <SelectTrigger className="w-full sm:w-[200px] bg-white border-teal-200 text-teal-900 focus:ring-teal-300">
            <SelectValue placeholder="Filter by Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Languages">All Languages</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="French">French</SelectItem>
            <SelectItem value="German">German</SelectItem>
            <SelectItem value="Italian">Italian</SelectItem>
            <SelectItem value="Japanese">Japanese</SelectItem>
            <SelectItem value="Spanish">Spanish</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Max Rate per kg (USD)"
          value={rateFilter}
          onChange={(e) => setRateFilter(e.target.value)}
          className="w-full sm:w-[200px] bg-white border-teal-200 text-teal-900 focus-visible:ring-teal-300"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTravelers.map((traveler) => (
          <motion.div
            key={traveler.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
          >
            <Card className="bg-white border-teal-100 shadow-md overflow-hidden cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="w-10 h-10 ring-2 ring-teal-600 ring-offset-2">
                  <AvatarImage src={traveler.image} alt={traveler.nickname} />
                  <AvatarFallback className="bg-gray-100 text-teal-800">
                    {traveler.nickname[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg text-teal-900">
                    {traveler.nickname}
                  </CardTitle>
                  <p className="text-sm text-teal-600">
                    {traveler.destination}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-2xl font-bold text-teal-700">
                    ${traveler.ratePerKg}
                  </p>
                  <p className="text-xs text-teal-600">USD/kg</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex items-center justify-between">
                  {renderStars(traveler.rating)}
                  <span className="text-sm text-teal-600">
                    {traveler.rating.toFixed(1)}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-teal-800 text-white">
                      <Plane className="size-[14px]" />
                    </div>
                    <span className="flex-grow text-teal-700">
                      {traveler.route}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-teal-800 text-white">
                      <Clock className="size-[14px]" />
                    </div>
                    <span className="text-teal-700">
                      {traveler.departureTime}
                    </span>
                    <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-teal-800 text-white ml-2">
                      <Calendar className="size-[14px]" />
                    </div>
                    <span className="text-teal-700">
                      {traveler.departureDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-teal-800 text-white">
                      <Globe className="size-[14px]" />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {traveler.languages.map((lang, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gray-100 text-teal-800 hover:bg-teal-200 hover:text-teal-900"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300">
                  Message
                  <MessageCircle className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
