"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isTokenExpired } from "@/utils/auth";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react"




const Navbar = () => {

 const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    //   router.push("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, []);


  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-xl font-bold text-blue-600 hover:opacity-80 transition">
            PropEase
          </span>
        </Link>

        {/* Nav Buttons */}
        <div className="space-x-4">
           <Link
            href="/search"
            className={`${
              pathname === "/search" ? "text-blue-600 font-semibold" : "text-gray-600"
            } hover:text-blue-700 transition`}
          >
            Search
          </Link>
          <Link
            href="/register"
            className={`${
              pathname === "/register" ? "text-blue-600 font-semibold" : "text-gray-600"
            } hover:text-blue-700 transition`}
          >
            Register
          </Link>
         {isLoggedIn ? (
  <button
    onClick={() => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      location.reload(); // force refresh
    }}
    className="text-gray-600 hover:text-blue-700 transition"
  >
    Logout
  </button>
) : (
  <Link href="/login" className="text-gray-600 hover:text-blue-700 transition">
    Login
  </Link>
)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
