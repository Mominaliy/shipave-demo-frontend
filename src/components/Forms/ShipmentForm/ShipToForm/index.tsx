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
import { CalendarIcon, Upload } from "lucide-react";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const ShipToForm: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Define date change handlers
  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date || null);
    // Reset endDate if it is before the new startDate
    if (endDate && date && endDate < date) {
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
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="use-profile-recipient"
          onCheckedChange={(checked) => console.log(checked)}
        />
        <Label htmlFor="use-profile-recipient">
          Use profile information for auto-fill (if recipient is the same as the
          shipper)
        </Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipient-name">Recipient's Full Name</Label>
        <Input
          id="recipient-name"
          placeholder="Jane Doe"
          onChange={(e) => console.log(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipient-country">Country</Label>
        <Select onValueChange={(value) => console.log(value)}>
          <SelectTrigger id="recipient-country">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipient-city">City/Region (Optional)</Label>
        <Input
          id="recipient-city"
          placeholder="Enter city or region"
          onChange={(e) => console.log(e.target.value)}
        />
      </div>

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
        All communication with travelers regarding delivery will be handled via
        in-app messaging for security.
      </p>
    </div>
  );
};

export default ShipToForm;
