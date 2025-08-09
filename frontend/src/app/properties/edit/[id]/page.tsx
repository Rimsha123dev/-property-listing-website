"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function EditPropertyPage() {
  const router = useRouter();
  // const params = useParams();
  const { id } = useParams();


 const [formData, setFormData] = useState({
  title: "",
  description: "",
  price: 0,
  location: "",
  image: "",
  type: "",
  });


 useEffect(() => {
  const fetchProperty = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
      const property = res.data;

      setFormData({
        title: property.title || '',
        description: property.description || '',
        price: property.price || '',
        location: property.location || '',
        image: property.image || '',
        type: property.type || '',
      });
    } catch (err) {
      console.error("Error fetching property", err);
    }
  };

  if (id) {
    fetchProperty();
  }
}, [id]);


const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  // agar price field change ho rahi hai
  if (name === "price") {
    setFormData({ ...formData, [name]: Number(value) });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Property updated successfully!");
      router.push(`/properties/${id}`);
    } catch (error) {
      console.error("Failed to update property:", error);
      alert("Error updating property.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Edit Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-6 rounded-md">
       <input
  type="text"
  name="image"
  placeholder="Image URL"
  value={formData.image}
  onChange={handleChange}
  className="border p-2 rounded w-full"
/>
<select
  name="type"
  value={formData.type}
  onChange={handleChange}
  className="border p-2 rounded w-full"
>
  <option value="">Select Type</option>
  <option value="apartment">Apartment</option>
  <option value="house">House</option>
  <option value="villa">Villa</option>
</select>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full border px-4 py-2 rounded-md"
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border px-4 py-2 rounded-md"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border px-4 py-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full"
        >
          Update Property
        </button>
      </form>
    </div>
  );
}
