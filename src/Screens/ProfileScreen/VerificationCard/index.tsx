"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, CloudUpload } from "lucide-react";
import React, { useState } from "react";

const VerificationCard = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const backgroundImageStyle = file
    ? {
        backgroundImage: `url(${URL.createObjectURL(file)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.5,
      }
    : {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Information</CardTitle>
        <CardDescription>
          Select an ID type and upload your document.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ID Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="idType">ID Type</Label>
          <Select>
            <SelectTrigger id="idType">
              <SelectValue placeholder="Select an ID type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="driver">Driver's License</SelectItem>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="id">ID Card</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-2">
          <Label
            htmlFor="fileUpload"
            className="text-sm font-medium text-black"
          >
            Upload Document
          </Label>
          <div className="relative w-1/2 mx-auto">
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/png,image/jpeg,image/svg+xml"
            />
            <label
              htmlFor="fileUpload"
              className="relative flex flex-col items-center justify-center h-48 border-2 border-teal-600 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300 overflow-hidden"
              style={{
                position: "relative",
              }}
            >
              {file && (
                <div
                  className="absolute inset-0 opacity-50 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(file)})`,
                  }}
                ></div>
              )}
              <div className="relative z-10 flex flex-col items-center">
                {file ? (
                  <>
                    <CheckCircle2 className="w-12 h-12 text-teal-500 mb-2" />
                    <p className="text-sm text-black font-bold">{file.name}</p>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <CloudUpload className="w-12 h-12 text-primaryColor mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Click or drag file to upload
                    </p>
                  </div>
                )}
              </div>
            </label>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 w-1/2 mx-auto">
            Accepted formats: PNG, JPEG, SVG
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">Save</Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationCard;
