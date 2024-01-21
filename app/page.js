"use client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OTPLogin from "./OTPLogin";
import EmailLogin from "./EmailLogin";

export default function Home() {
  const router = useRouter();
  const auth = getAuth(app);
  const [method, setMethod] = useState("otp");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
  }, [auth, router]);

  function handleMethod() {
    if (method === "otp") {
      setMethod("email");
    } else {
      setMethod("otp");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-10">NextJs Authentication</h1>
      <div className="flex flex-col items-center p-12 w-[400px] border-[1px] border-[rgba(0,0,0,0.3)] rounded-md">
        {method === "otp" ? <OTPLogin /> : <EmailLogin />}
        <button onClick={handleMethod} className="text-blue-700 pt-5">
          {method === "otp" ? "Login with email" : "Login with OTP"}
        </button>
      </div>
    </main>
  );
}
