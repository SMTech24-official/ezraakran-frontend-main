"use client";

import { useLoginUserMutation } from "@/redux/api/baseApi";
import { setUser } from "@/redux/slice/userSlice";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type FormData = {
  identifier: string; // Can be email or username
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

console.log(redirect, 'redirect');

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const payload = {
      identifier: data.identifier, 
      password: data.password,
    };

    try {
      const response = await loginUser(payload).unwrap();
      dispatch(setUser(response?.data)); 
      if (response.success && response.data.accessToken) {
        reset();
        toast.success("Login Successful!");
        console.log(response.data , 'loo')
        if (response.data.isSubscribed) {
          router.push(redirect);
        } else {
          router.push(`/subscription?redirect=${encodeURIComponent(redirect)}`);
        }
      }
    } catch (err: any) {
      console.error("Login failed:", err?.data?.message || "An error occurred");
      toast.error(err?.data?.message || "An error occurred");
      reset();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-bgUpdate">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-11/12 max-w-lg bg-blue p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label
            htmlFor="identifier"
            className="block text-sm font-medium mb-1"
          >
            Email or Username
          </label>
          <input
            type="text"
            id="identifier"
            {...register("identifier", {
              required: "Email or username is required",
            })}
            className="w-full p-3 bg-darkBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium  mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-3  bg-darkBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 "
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white bg-darkBlue rounded-lg font-bold hover:bg-bgUpdate transition"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm ">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-purple-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
