"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

type FormValues = {
  title: string;
  location: string;
  price: number;
  propertyType: string;
  image: FileList;
};
export default function CreatePropertyForm() {
  const [imageUrl, setImageUrl] = useState("");
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
  try {
    // 1. Upload image
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/properties/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const imageUrl = res.data.imageUrl;
    setImageUrl(imageUrl);

    // 2. Create property with uploaded image URL
    const propertyRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/properties/create`,
      {
        title: data.title,
        location: data.location,
        price: data.price,
        propertyType: data.propertyType,
        image: imageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // or Clerk token if you're using Clerk
        },
      }
    );

    console.log("✅ Property created:", propertyRes.data);
    alert("Property created successfully!");
  } catch (err) {
    console.error("Something went wrong:", err);
    alert("Failed to create property");
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  <input type="text" placeholder="Title" {...register("title")} className="border p-2 w-full" />
  <input type="text" placeholder="Location" {...register("location")} className="border p-2 w-full" />
  <input type="number" placeholder="Price" {...register("price")} className="border p-2 w-full" />
  <input type="text" placeholder="Property Type" {...register("propertyType")} className="border p-2 w-full" />
  
  <input type="file" accept="image/*" {...register("image")} className="border p-2 w-full" />
  
  <button type="submit" className="bg-black text-white p-2 rounded">
    Submit Property
  </button>

  {imageUrl && (
    <div className="mt-4">
      <p>Uploaded Image:</p>
      <img src={imageUrl} alt="uploaded" className="w-64 h-auto mt-2" />
    </div>
  )}
</form>

  );
}
