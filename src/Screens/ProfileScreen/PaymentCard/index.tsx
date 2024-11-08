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
import { Landmark } from "lucide-react";
import React, { useState } from "react";
import { FaPaypal, FaStripeS } from "react-icons/fa6";
import { SiVisa } from "react-icons/si";
import mastercardLogo from "../../../../public/images/mastercard.svg";
import visa from "../../../../public/images/visa.svg";
import amex from "../../../../public/images/amex.svg";

const PaymentCard = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [billingAddress, setBillingAddress] = useState<string>("");
  const [payoutMethod, setPayoutMethod] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment and Billing Information</CardTitle>
        <CardDescription>
          Set up your payment method and preferred payout options.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Payment Method (Stripe)</Label>
          <div className="flex space-x-4">
            <div className="flex items-center justify-center w-12 h-8 bg-gray-100 rounded-md">
              <img src={visa.src} alt="Mastercard" className="h-7 w-11" />
            </div>
            <div className="flex items-center justify-center w-12 h-8 bg-gray-100 rounded-md">
              <img
                src={mastercardLogo.src}
                alt="Mastercard"
                className="h-7 w-11"
              />
            </div>
            <div className="flex items-center justify-center w-12 h-8 bg-blue-400 rounded-md">
              <img
                src={amex.src}
                alt="Mastercard"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Save Card Section */}
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="save-card">Save Card for Future Payments</Label>
          <Button
            id="save-card"
            variant="outline"
            className="w-1/3 group hover:bg-[#5433FF] hover:text-white"
            // onClick={() =>
            //   (window.location.href =
            //     "https://stripe.com/docs/payments/save-and-reuse")
            // }
          >
            <FaStripeS className="text-[#5433FF] group-hover:text-white "></FaStripeS>
            Save Card with Stripe
          </Button>
        </div>

        {/* Preferred Payout Method */}
        <div className="space-y-4">
          <Label>Preferred Payout Method</Label>
          <RadioGroup
            onValueChange={setPayoutMethod}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank" className="flex items-center space-x-2">
                <Landmark className="h-4 w-4" />
                <span>Bank Transfer</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="flex items-center space-x-2">
                <FaPaypal className="h-4 w-4 text-blue-600" />
                <span>PayPal</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Conditional Fields for Payout Method */}
        {payoutMethod === "bank" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input id="bank-name" placeholder="Enter your bank name" />
            </div>
            <div>
              <Label htmlFor="iban">IBAN Number</Label>
              <Input id="iban" placeholder="Enter your IBAN number" />
            </div>
          </div>
        )}

        {payoutMethod === "paypal" && (
          <div>
            <Label htmlFor="paypal-email">PayPal Email</Label>
            <Input
              id="paypal-email"
              type="email"
              placeholder="Enter your PayPal email"
            />
          </div>
        )}

        {/* Stylish Currency Selector */}
        <div className="space-y-2">
          <Label htmlFor="currency">Currency Preference</Label>
          <Select onValueChange={setCurrency}>
            <SelectTrigger id="currency" className="w-full">
              <SelectValue placeholder="Select your currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">$</span>
                  <span>USD - US Dollar</span>
                </div>
              </SelectItem>
              <SelectItem value="eur">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">€</span>
                  <span>EUR - Euro</span>
                </div>
              </SelectItem>
              <SelectItem value="gbp">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">£</span>
                  <span>GBP - British Pound</span>
                </div>
              </SelectItem>
              <SelectItem value="jpy">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">¥</span>
                  <span>JPY - Japanese Yen</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentCard;
