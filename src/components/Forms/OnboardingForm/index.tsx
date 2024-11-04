"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import GeneralInfoForm from "../GeneralInfoForm";
import AddressFrom from "../AddressForm";
import VerificationForm from "../VerificationForm";
import RolesInfoForm from "../RolesInfoForm";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

interface FormData {
  general: { [key: string]: string };
  address: { [key: string]: string };
  identification: { [key: string]: string };
  payment: { [key: string]: string };
  rolesInfo: { [key: string]: string };
}

interface StepComponentProps {
  updateData: (data: { [key: string]: string }) => void;
}

export default function OnboardingForm({ onSkip }: { onSkip: () => void }) {
  const steps = [
    {
      id: 1,
      title: "User Info",
    },
    {
      id: 2,
      title: "Address",
    },
    {
      id: 3,
      title: "Verification",
    },
    {
      id: 4,
      title: "Shipper/Traveller",
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    general: {},
    address: {},
    identification: {},
    payment: {},
    rolesInfo: {},
  });

  const [activeStep, setStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const updateFormData = (
    section: keyof FormData,
    data: { [key: string]: string }
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], ...data },
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center h-full w-full py-1">
      <Card className="w-[80%] h-[90%] max-w-4xl overflow-auto shadow-lg border-t-8  border-teal-700 rounded-t-xl">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-black text-2xl">Onboarding Form</CardTitle>
          <Button
            className="bg-white text-black hover:text-white hover:bg-primaryColor"
            onClick={onSkip}
          >
            Skip
            <ArrowRight />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      activeStep >= index + 1
                        ? "border-primaryColor bg-primaryColor text-primary-foreground"
                        : "border-muted"
                    }`}
                  >
                    {activeStep > index + 1 ? (
                      <CheckIcon className="w-6 h-6" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="text-xs mt-2 font-semibold">{step.title}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 bg-muted rounded-full">
              <div
                className="h-full bg-primaryColor rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {activeStep === 1 && (
            <motion.div {...fadeInUp}>
              <GeneralInfoForm
                initialData={formData.general}
                updateData={(data) => updateFormData("general", data)}
              />
            </motion.div>
          )}
          {activeStep === 2 && (
            <motion.div {...fadeInUp}>
              <AddressFrom
                initialData={formData.address}
                updateData={(data) => updateFormData("address", data)}
              />
            </motion.div>
          )}
          {activeStep === 3 && (
            <motion.div {...fadeInUp}>
              <VerificationForm
                initialData={formData.identification}
                updateData={(data) => updateFormData("identification", data)}
              />
            </motion.div>
          )}
          {activeStep === 4 && (
            <motion.div {...fadeInUp}>
              <RolesInfoForm
                updateData={(data) => updateFormData("rolesInfo", data)}
              />
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={activeStep === 0}
            variant="outline"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button
            className="bg-primaryColor text-white hover:bg-teal-800"
            onClick={activeStep === totalSteps ? handleSubmit : handleNext}
          >
            {activeStep === totalSteps ? "Submit" : "Next"}{" "}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// function IdentificationVerification({ updateData }: StepComponentProps) {
//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { id, value } = e.target;
//     updateData({ [id]: value });
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-lg font-semibold">Identification and Verification</h2>
//       <div>
//         <Label htmlFor="documentType">Identity Document Type</Label>
//         <Select>
//           <SelectTrigger id="documentType">
//             <SelectValue placeholder="Select document type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="passport">Passport</SelectItem>
//             <SelectItem value="driverLicense">Driver's License</SelectItem>
//             <SelectItem value="nationalId">National ID</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <div>
//         <Label htmlFor="documentUpload">Document Upload</Label>
//         <Input id="documentUpload" type="file" accept=".pdf,image/*" />
//       </div>
//     </div>
//   );
// }

function PaymentBillingInfo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Payment and Billing Information</h2>
      <div>
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <Select>
          <SelectTrigger id="paymentMethod">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="creditCard">Credit Card</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="bankTransfer">Bank Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="billingAddress">Billing Address</Label>
        <Textarea
          id="billingAddress"
          placeholder="Enter your billing address"
        />
      </div>
      <div>
        <Label htmlFor="payoutMethod">
          Preferred Payout Method (for travelers)
        </Label>
        <Select>
          <SelectTrigger id="payoutMethod">
            <SelectValue placeholder="Select payout method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bankTransfer">Bank Transfer</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="check">Check</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="currency">Preferred Currency</Label>
        <Select>
          <SelectTrigger id="currency">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
            <SelectItem value="gbp">GBP</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
