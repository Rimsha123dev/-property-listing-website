"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const { register, handleSubmit } = useForm<RegisterFormValues>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);
      alert("Registration successful! Please login.");
      router.push("/login"); // ➡️ take user to login
   } catch (error) {
  const err = error as AxiosError<{ message: string }>;

  if (err.response?.status === 400) {
    alert("User already exists. Please login instead.");
  } else if (err.response?.data?.message) {
    alert(err.response.data.message);
  } else {
    alert("Something went wrong during registration.");
  }
}

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded w-full max-w-md">
      <h2 className="text-xl font-semibold">Register</h2>

      <input
        type="text"
        placeholder="Username"
        {...register("name")}
        className="w-full p-2 border"
      />
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
        Register
      </button>
    </form>
  );
}
