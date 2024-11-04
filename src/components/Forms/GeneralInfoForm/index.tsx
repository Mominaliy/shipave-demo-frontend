import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useRef, useState } from "react";

interface GeneralInfoProps {
  updateData: (data: { [key: string]: string }) => void;
  initialData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    country?: string;
    language?: string;
    profileImage?: string;
  };
}

const GeneralInfoForm = ({
  updateData,
  initialData = {},
}: GeneralInfoProps) => {
  const [Country, setCountry] = useState<string>(initialData.country || "");
  const [Language, setLanguage] = useState<string>(initialData.language || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    updateData({ [id]: value });
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    updateData({ country: value });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    updateData({ language: value });
  };

  const [profileImage, setProfileImage] = useState(
    initialData.profileImage || "https://www.gravatar.com/avatar/?d=mp"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">General User Information</h2>

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center space-y-4">
        <Avatar
          onClick={handleAvatarClick}
          className="w-24 h-24 cursor-pointer bg-gray-300 rounded-full"
        >
          <AvatarImage
            className="h-full w-full rounded-full"
            src={profileImage}
            alt="User Profile Picture"
          />
        </Avatar>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            onChange={handleChange}
            id="firstName"
            placeholder="John"
            defaultValue={initialData.firstName || ""}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            onChange={handleChange}
            id="lastName"
            placeholder="Doe"
            defaultValue={initialData.lastName || ""}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          className="bg-gray-200"
          disabled={true}
          id="email"
          type="email"
          placeholder="john.doe@example.com"
          value="Test@gmail.com"
        />
      </div>

      <div>
        <Label htmlFor="country">Country of Residence</Label>
        <Select onValueChange={handleCountryChange} value={Country}>
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

      <div>
        <Label htmlFor="language">Preferred Language</Label>
        <Select value={Language} onValueChange={handleLanguageChange}>
          <SelectTrigger id="language">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Spanish">Spanish</SelectItem>
            <SelectItem value="French">French</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default GeneralInfoForm;
