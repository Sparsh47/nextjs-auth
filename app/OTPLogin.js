"use client";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "./config";
import { useRouter } from "next/navigation";

export default function OTPLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {},
        "expired-callback": () => {},
      }
    );
  }, [auth]);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
      alert("OTP has been sent");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      await confirmationResult.confirm(otp);
      setOtp("");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-evenly w-[400px]">
      <label for="otp" className="self-start pl-10">
        Enter your number
      </label>
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter your phone number with country code"
        className="border border-gray-500 p-2 rounded-md outline-none w-[80%]"
      />
      <br />
      <label for="otp" className="self-start pl-10">
        Enter the otp
      </label>
      <input
        type="text"
        name="otp"
        value={otp}
        onChange={handleOTPChange}
        placeholder="Enter OTP"
        className="border border-gray-500 p-2 rounded-md outline-none w-[80%]"
      />
      <br />
      {!otpSent ? <div id="recaptcha-container"></div> : null}
      <button
        onClick={otpSent ? handleOTPSubmit : handleSendOtp}
        className={`bg-${
          otpSent ? "green" : "blue"
        }-500 text-white p-2 rounded-md m-2 w-[80%] `}
        style={{ backgroundColor: otpSent ? "green" : "blue" }}
      >
        {otpSent ? "Submit OTP" : "Send OTP"}
      </button>
    </div>
  );
}
