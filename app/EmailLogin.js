import React from "react";
import { app } from "./config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const EmailLogin = () => {
  const auth = getAuth(app);
  const [user, setUser] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();
  const router = useRouter();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, googleAuth);
    if (user) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center gap-[5px] w-[400px]">
      <h1 className="text-3xl font-bold">Email Login</h1>
      <button
        onClick={handleLogin}
        className="rounded-m bg-white p-2 m-2 border border-[1px] border-gray-600 rounded-full w-[80%]"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default EmailLogin;
