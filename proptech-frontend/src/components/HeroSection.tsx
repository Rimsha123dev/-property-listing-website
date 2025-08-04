"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/utils/auth";

const HeroSection = () => {
  const router = useRouter();

  const handleListProperty = () => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/create"); // ✅ Logged in → go to create page
    } else {
      router.push("/login"); // ❌ Not logged in → redirect to login
    }
  };

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* 🖼️ Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80"
        alt="Real Estate Banner"
        fill
        priority
        className="object-cover"
      />

      {/* 🌫️ Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 backdrop-blur-sm" />

      {/* ✨ Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-bold mb-4"
        >
          Find Your Dream Property
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl sm:text-2xl mb-8 max-w-2xl"
        >
          Browse through top listings to buy, rent, or list your property — all in one place.
        </motion.p>

        {/* 🚀 Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <Button variant="default" size="lg">
            Explore Listings
          </Button>
          <Button
            variant="outline"
            size="lg"
             onClick={() => {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    router.push("/login");
  } else {
    router.push("/create");
  }
}}
            className="text-black border-white hover:bg-white hover:text-blue-700 transition"
           
          >
            List Your Property
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
