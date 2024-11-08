"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import React, { useState } from "react";

const ItemsDetailForm = () => {
  const [itemDetails, setItemDetails] = useState({
    category: "",
    description: "",
    size: "",
    height: "",
    width: "",
    length: "",
    weight: "",
  });

  const handleInputChange = (field: any, value: any) => {
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="item-category">Item Category</Label>
        <Select onValueChange={(value) => handleInputChange("category", value)}>
          <SelectTrigger id="item-category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="documents">Documents</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="item-description">Item Description</Label>
        <Textarea
          id="item-description"
          placeholder="Describe your item"
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Package Size</Label>
        <RadioGroup onValueChange={(value) => handleInputChange("size", value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small" id="small" />
            <Label htmlFor="small">Small (e.g., envelope size)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium (e.g., shoebox size)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large" id="large" />
            <Label htmlFor="large">Large (e.g., suitcase size)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="custom" />
            <Label htmlFor="custom">Custom Size</Label>
          </div>
        </RadioGroup>
      </div>

      {itemDetails.size === "custom" && (
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              onChange={(e) => handleInputChange("height", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Width (cm)</Label>
            <Input
              id="width"
              type="number"
              onChange={(e) => handleInputChange("width", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="length">Length (cm)</Label>
            <Input
              id="length"
              type="number"
              onChange={(e) => handleInputChange("length", e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          type="number"
          step="0.1"
          onChange={(e) => handleInputChange("weight", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Item Photos</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
          <div className="flex items-center justify-center">
            <Upload className="mr-2" />
            <span>Drag and drop or click to upload</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Accurate descriptions, weight, size, and photos help match your shipment
        to the right traveler.
      </p>
    </div>
  );
};

export default ItemsDetailForm;
