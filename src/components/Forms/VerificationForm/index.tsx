import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

interface VerificationProps {
  updateData: (data: { [key: string]: string }) => void;
  initialData?: {
    documentType?: string;
  };
}

const VerificationForm = ({
  updateData,
  initialData = {},
}: VerificationProps) => {
  const [Document, setDocument] = useState(initialData.documentType || "");

  const handleDocument = (value: string) => {
    setDocument(value);
    updateData({ documentType: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Identification and Verification</h2>
      <div>
        <Label htmlFor="documentType">Identity Document Type</Label>
        <Select value={Document} onValueChange={handleDocument}>
          <SelectTrigger id="documentType">
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="passport">Passport</SelectItem>
            <SelectItem value="driverLicense">Driver's License</SelectItem>
            <SelectItem value="nationalId">National ID</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="documentUpload">Document Upload</Label>
        <Input id="documentUpload" type="file" accept=".pdf,image/*" />
      </div>
    </div>
  );
};

export default VerificationForm;
