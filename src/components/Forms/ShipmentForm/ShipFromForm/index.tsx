"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const ShipFromForm: React.FC = () => {
  const [useProfile, setUseProfile] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date || null);
    if (endDate && date && date > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (startDate && date && date < startDate) {
      alert("End date cannot be earlier than start date.");
    } else {
      setEndDate(date || null);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Checkbox for Using Profile */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="use-profile"
          checked={useProfile}
          onCheckedChange={() => setUseProfile(!useProfile)}
        />
        <Label htmlFor="use-profile">
          Use profile information for auto-fill
        </Label>
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="full-name">Full Name</Label>
        <Input
          id="full-name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Country Selection */}
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Select value={country} onValueChange={(value) => setCountry(value)}>
          <SelectTrigger id="country">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* City/Region Field */}
      <div className="space-y-2">
        <Label htmlFor="city">City/Region (Optional)</Label>
        <Input
          id="city"
          placeholder="Enter city or region"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* Pickup Date Range */}
      <div className="space-y-2">
        <Label>Pickup Date Range</Label>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {startDate ? format(startDate, "PPP") : "Start Date"}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate || undefined}
                onSelect={handleStartDateChange}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {endDate ? format(endDate, "PPP") : "End Date"}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate || undefined}
                onSelect={handleEndDateChange}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Your contact details are for internal records. All communication with
        travelers will be via in-app messaging.
      </p>
    </div>
  );
};

export default ShipFromForm;
