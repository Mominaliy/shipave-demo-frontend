"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowBigLeftDash,
  Box,
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  CircleX,
  ClipboardCheck,
  Clock,
  FileText,
  MapPin,
  Truck,
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ShipFromForm from "@/components/Forms/ShipmentForm/ShipFromForm";
import ShipToForm from "@/components/Forms/ShipmentForm/ShipToForm";
import ItemsDetailForm from "@/components/Forms/ShipmentForm/ItemsDetailForm";
import DeliveryPreferencesForm from "@/components/Forms/ShipmentForm/DeliveryPreferencesForm";
import CustomsForm from "@/components/Forms/ShipmentForm/CustomsForm";
import ReviewForm from "@/components/Forms/ShipmentForm/ReviewForm";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const CreateShipmentScreen = () => {
  const [activeStep, setStep] = useState(1);
  const totalSteps = 6;

  const steps = [
    {
      id: 1,
      title: "Ship From",
      icon: <Truck className="size-5" />,
    },
    {
      id: 2,
      title: "Ship To",
      icon: <MapPin className="size-6" />,
    },
    {
      id: 3,
      title: "Item Detail",
      icon: <Box className="size-6" />,
    },
    {
      id: 4,
      title: "Delivery Preferences",
      icon: <Clock className="size-6" />,
    },
    {
      id: 5,
      title: "Customs & Documentation",
      icon: <FileText className="size-6" />,
    },
    {
      id: 6,
      title: "Review & Submit",
      icon: <ClipboardCheck className="size-6" />,
    },
  ];

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    console.log("Data");
  };

  return (
    <Card className="w-full h-full overflow-auto border-none shadow-none rounded-none">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-black text-2xl">Shipment Form</CardTitle>
        <Button className="bg-white text-black hover:text-white hover:bg-primaryColor">
          <ArrowBigLeftDash />
          Back
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
                    step.icon
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
            <ShipFromForm />
          </motion.div>
        )}
        {activeStep === 2 && (
          <motion.div {...fadeInUp}>
            <ShipToForm />
          </motion.div>
        )}
        {activeStep === 3 && (
          <motion.div {...fadeInUp}>
            <ItemsDetailForm />
          </motion.div>
        )}
        {activeStep === 4 && (
          <motion.div {...fadeInUp}>
            <DeliveryPreferencesForm />
          </motion.div>
        )}
        {activeStep === 5 && (
          <motion.div {...fadeInUp}>
            <CustomsForm />
          </motion.div>
        )}
        {activeStep === 6 && (
          <motion.div {...fadeInUp}>
            <ReviewForm />
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
  );
};

export default CreateShipmentScreen;
