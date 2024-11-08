import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import React from "react";

const CustomsForm = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="item-value">Item Value (USD)</Label>
        <Input id="item-value" type="number" step="0.01" onChange={() => {}} />
      </div>

      <div className="space-y-2">
        <Label>Customs Documentation</Label>
        <p className="text-sm text-gray-500">
          Use our customs-check tool to see if your shipment needs customs
          documentation.
        </p>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
          <div className="flex items-center justify-center">
            <Upload className="mr-2" />
            <span>Upload required documents if needed</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Prohibited Items Reminder</Label>
        <p className="text-sm text-gray-500">
          Please be aware that hazardous materials and other prohibited items
          are not allowed for shipment.
        </p>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Providing customs forms helps avoid shipment delays.
      </p>
    </div>
  );
};

export default CustomsForm;
