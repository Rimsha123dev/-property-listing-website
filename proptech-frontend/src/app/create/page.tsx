"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      let imageUrl = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await axios.post(
          "http://localhost:5000/api/properties/upload",
          formData
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      const token = localStorage.getItem("token");

      const propertyData = {
        ...form,
        price: Number(form.price),
        image: imageUrl,
      };

      await axios.post("http://localhost:5000/api/properties/create", propertyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Property created successfully!");
      router.push("/"); // or wherever you list properties

    } catch (error) {
      console.error("❌ Property creation failed", error);
      alert("Something went wrong. Try again!");
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
    </div>
  );
};

export default CreatePropertyPage;
