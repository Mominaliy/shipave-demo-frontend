"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BaggageClaim, PlaneTakeoff, X } from "lucide-react";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

interface RolesInfoProps {
  updateData: (data: { [key: string]: string }) => void;
}

export default function RolesInfoForm({ updateData }: RolesInfoProps) {
  const [role, setRole] = useState<"traveler" | "shipper">("traveler");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [frequentDepartures, setFrequentDepartures] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    updateData({ [id]: value });
  };

  const [formData, setFormData] = useState({
    countryOfOrigin: "",
    frequentDepartures: [] as string[],
    frequentArrivals: "",
    maxPackageSpace: "",
    weightLimit: "",
    compensationRate: "",
    pickupPreferences: "",
    deliveryPreferences: [] as string[],
    frequentShipFrom: "",
    frequentShipTo: "",
    itemCategories: "",
    insurancePreference: false,
    requiresCustoms: false,
  });

  const handleLocationSelect = (value: string) => {
    if (!frequentDepartures.includes(value)) {
      setFrequentDepartures([...frequentDepartures, value]);
    }
    // setSelectedLocation("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ role, ...formData });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (preference: string) => {
    setFormData((prev) => ({
      ...prev,
      pickupPreferences:
        prev.pickupPreferences === preference ? "" : preference,
    }));
  };

  const removeLocation = (location: string) => {
    setFrequentDepartures(
      frequentDepartures.filter((item) => item !== location)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full border-0 shadow-none">
        <CardHeader>
          <CardTitle>Role Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={role}
            onValueChange={(value) => setRole(value as "traveler" | "shipper")}
          >
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger
                value="traveler"
                className="flex items-center data-[state=active]:bg-primaryColor data-[state=active]:text-white"
              >
                <PlaneTakeoff className="mr-2 size-4" />
                Traveler
              </TabsTrigger>
              <TabsTrigger
                value="shipper"
                className="flex items-center data-[state=active]:bg-primaryColor data-[state=active]:text-white"
              >
                <BaggageClaim className="mr-2 size-4" />
                Shipper
              </TabsTrigger>
            </TabsList>
            <TabsContent value="traveler">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="countryOfOrigin">Country of Origin</Label>
                  <Select
                    name="countryOfOrigin"
                    onValueChange={(value) =>
                      handleSelectChange("countryOfOrigin", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequentDepartures">
                    Frequent Departure Locations
                  </Label>
                  <Select
                    onValueChange={handleLocationSelect}
                    value={selectedLocation}
                  >
                    <SelectTrigger id="frequentDepartures">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                      <SelectItem value="Chicago">Chicago</SelectItem>
                      <SelectItem value="Houston">Houston</SelectItem>
                      <SelectItem value="Miami">Miami</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="mt-2 space-y-1">
                    {frequentDepartures.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {frequentDepartures.map((location, index) => (
                          <div
                            key={index}
                            className="flex gap-2 text-sm items-center justify-between bg-primaryColor text-white rounded-xl px-3 py-1"
                          >
                            <p>{location}</p>
                            <X
                              className="cursor-pointer size-4"
                              onClick={() => removeLocation(location)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequentArrivals">
                    Frequent Arrival Locations
                  </Label>
                  <Input name="frequentArrivals" onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPackageSpace">Maximum Package Space</Label>
                  <Select
                    name="maxPackageSpace"
                    onValueChange={(value) =>
                      handleSelectChange("maxPackageSpace", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weightLimit">Weight Limit (kg)</Label>
                  <Input
                    name="weightLimit"
                    type="number"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compensationRate">
                    Compensation Rate (per kg)
                  </Label>
                  <Input
                    name="compensationRate"
                    type="number"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Pickup Preferences</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        className="data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor"
                        id="travelerPickup"
                        checked={
                          formData.pickupPreferences === "travelerPickup"
                        }
                        onCheckedChange={() =>
                          handleCheckboxChange("travelerPickup")
                        }
                      />
                      <label htmlFor="travelerPickup">
                        Traveler picks up the package
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        className="data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor"
                        id="shipperDropoff"
                        checked={
                          formData.pickupPreferences === "shipperDropoff"
                        }
                        onCheckedChange={() =>
                          handleCheckboxChange("shipperDropoff")
                        }
                      />
                      <label htmlFor="shipperDropoff">
                        Shipper drops off at a specific location
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        className="data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor"
                        id="flexiblePickup"
                        checked={
                          formData.pickupPreferences === "flexiblePickup"
                        }
                        onCheckedChange={() =>
                          handleCheckboxChange("flexiblePickup")
                        }
                      />
                      <label htmlFor="flexiblePickup">Flexible</label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Delivery Preferences</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="directDelivery"
                        checked={
                          formData.pickupPreferences === "flexiblePickup"
                        }
                        onCheckedChange={() =>
                          handleCheckboxChange("flexiblePickup")
                        }
                      />
                      <label htmlFor="directDelivery">
                        Direct delivery to the recipient
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="centralDropoff"
                        checked={
                          formData.pickupPreferences === "flexiblePickup"
                        }
                        onCheckedChange={() =>
                          handleCheckboxChange("flexiblePickup")
                        }
                      />
                      <label htmlFor="centralDropoff">
                        Drop-off at a central location
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="courierHandoff"
                        checked={
                          formData.pickupPreferences === "flexiblePickup"
                        }
                        onCheckedChange={() =>
                          handleCheckboxChange("flexiblePickup")
                        }
                      />
                      <label htmlFor="courierHandoff">
                        Hand-off to a local courier
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipper">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="frequentShipFrom">
                    Frequently Shipped From Locations
                  </Label>
                  <Input name="frequentShipFrom" onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequentShipTo">
                    Frequently Shipped To Locations
                  </Label>
                  <Input name="frequentShipTo" onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemCategories">
                    Item Categories Frequently Shipped
                  </Label>
                  <Input name="itemCategories" onChange={handleInputChange} />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="insurancePreference"
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "insurancePreference",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="insurancePreference">
                    Frequently add insurance to packages
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requiresCustoms"
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "requiresCustoms",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="requiresCustoms">
                    Usually ship items that require customs documentation
                  </Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </form>
  );
}
