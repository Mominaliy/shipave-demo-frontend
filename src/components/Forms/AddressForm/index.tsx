import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

interface AddressInfoProps {
  updateData: (data: { [key: string]: string }) => void;
  initialData?: {
    homeAddress?: string;
    country?: string;
    city?: string;
    postalCode?: string;
  };
}

const AddressFrom = ({ updateData, initialData = {} }: AddressInfoProps) => {
  const [Country, setCountry] = useState(initialData.country || "");

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    updateData({ [id]: value });
  };

  const handleCountry = (value: string) => {
    setCountry(value);
    updateData({ country: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Address Information</h2>
      <div>
        <Label htmlFor="homeAddress">Home Address (Optional)</Label>
        <Textarea
          onChange={handleChange}
          id="homeAddress"
          placeholder="Enter your home address"
          defaultValue={initialData.homeAddress || ""}
        />
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <Select onValueChange={handleCountry} value={Country}>
          <SelectTrigger id="country">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            {/* Add more countries as needed */}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="city">City/Region</Label>
        <Input
          onChange={handleChange}
          id="city"
          placeholder="Enter your city or region"
          defaultValue={initialData.city || ""}
        />
      </div>
      <div>
        <Label htmlFor="postalCode">Postal Code (Optional)</Label>
        <Input
          onChange={handleChange}
          id="postalCode"
          placeholder="Enter your postal code"
          defaultValue={initialData.postalCode || ""}
        />
      </div>
    </div>
  );
};

export default AddressFrom;
