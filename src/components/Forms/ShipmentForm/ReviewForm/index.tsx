import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";

const ReviewForm = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Insurance Option</Label>
        <p className="text-sm text-gray-500">
          You can add insurance for high-value items at checkout.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="liability-agreement" onCheckedChange={() => {}} />
          <Label htmlFor="liability-agreement">
            I understand the platform is not responsible for lost or damaged
            items.
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms-consent" onCheckedChange={() => {}} />
          <Label htmlFor="terms-consent">
            I agree to the platform's Privacy Policy and Terms of Service.
          </Label>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        You'll be notified once a traveler is matched with your shipment.
      </p>
    </div>
  );
};

export default ReviewForm;
