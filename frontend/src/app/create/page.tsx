"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CreatePropertyPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to create a property.");
        return;
      }

      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/properties/upload`,
          formData
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      const propertyData = {
        ...form,
        price: Number(form.price),
        image: imageUrl,
      };

       axios.post(`${process.env.NEXT_PUBLIC_API_URL}/properties/create`, propertyData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      alert("Property created successfully!");
      router.push("/");
    } catch (error) {
      console.error("Property creation failed", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="type"
          placeholder="Type (e.g. Apartment, House)"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Property"}
        </button>
      </form>
       <div  className="mt-10">
          <Link href="/">
                  <button className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Properties
                  </button>
                </Link>
       </div>
    </div>
  );
};

export default CreatePropertyPage;
