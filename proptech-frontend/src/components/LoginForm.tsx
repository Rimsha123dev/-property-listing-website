"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";


type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email: data.email,
          password: data.password,
        }
      );

      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token); // ✅ Store token
        alert("Login successful!");
        router.push("/"); // or navigate to dashboard
      } else {
        alert("No token received from server");
      }
       } catch (error) {
  const err = error as AxiosError<any>;

  if (err.response?.status === 401) {
    alert("Invalid email or password. Please try again or register.");
  } else if (err.response?.status === 400) {
    alert("User not registered. Please sign up first.");
  } else {
    alert("Something went wrong. Please try again later.");
  }
}


  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded w-full max-w-md">
      <h2 className="text-xl font-semibold">Login</h2>

      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="w-full p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="w-full p-2 border"
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Login
      </button>

      <p className="text-sm">
    Dont have an account?{" "}
  <a href="/register" className="text-blue-500 underline">Register here</a>
</p>

    </form>
    
  );
  
}
