import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const DeliveryPreferencesForm = () => {
  const [preferences, setPreferences] = useState({
    dropOff: false,
    travelerPickup: false,
    flexiblePickup: false,
    directDelivery: false,
    centralLocation: false,
    localCourier: false,
  });

  const handleInputChange = (field: any, value: any) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Pickup Handling (Select all that apply)</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="drop-off"
              checked={preferences.dropOff}
              onCheckedChange={(checked) =>
                handleInputChange("dropOff", checked)
              }
            />
            <Label htmlFor="drop-off">
              Drop-off at a Location (e.g., airport, hub)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="traveler-pickup"
              checked={preferences.travelerPickup}
              onCheckedChange={(checked) =>
                handleInputChange("travelerPickup", checked)
              }
            />
            <Label htmlFor="traveler-pickup">Traveler Picks Up from Me</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="flexible-pickup"
              checked={preferences.flexiblePickup}
              onCheckedChange={(checked) =>
                handleInputChange("flexiblePickup", checked)
              }
            />
            <Label htmlFor="flexible-pickup">
              Flexible (Let travelers choose)
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Delivery Preferences (Select all that apply)</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="direct-delivery"
              checked={preferences.directDelivery}
              onCheckedChange={(checked) =>
                handleInputChange("directDelivery", checked)
              }
            />
            <Label htmlFor="direct-delivery">
              Direct Delivery to Recipient
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="central-location"
              checked={preferences.centralLocation}
              onCheckedChange={(checked) =>
                handleInputChange("centralLocation", checked)
              }
            />
            <Label htmlFor="central-location">
              Drop-off at a Central Location
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="local-courier"
              checked={preferences.localCourier}
              onCheckedChange={(checked) =>
                handleInputChange("localCourier", checked)
              }
            />
            <Label htmlFor="local-courier">
              Local Courier Service (traveler hands off to a local courier)
            </Label>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Selecting multiple preferences can increase your chances of matching
        with a traveler.
      </p>
    </div>
  );
};

export default DeliveryPreferencesForm;
