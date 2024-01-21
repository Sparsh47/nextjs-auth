"use client";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const auth = getAuth(app);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-10">Welcome to the dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded-md"
      >
        Logout
      </button>
    </main>
  );
};

export default Dashboard;
