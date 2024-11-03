"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { loginSuccess } from "@/lib/slices/authSlice";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/react";
import { useLoginMutation } from "@/lib/slices/apiSlice";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading: isLoggingIn, error: loginError }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login({ email, password }).unwrap();
      const token = data.token;

      dispatch(loginSuccess(token));
      localStorage.setItem("token", token);
      router.push("/");
    } catch (err: any) {
      if (err?.data?.error) {
        setError(err.data.error);
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-8 w-full max-w-md">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <Input
          className="mb-4"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          className="mb-4"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="text-center mb-10">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-white-200">
            Sign Up
          </Link>
        </p>
        <div className="flex justify-center">
          <Button type="submit" className="w-1/2" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
