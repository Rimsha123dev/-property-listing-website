// src/components/PropertyCard.tsx
"use client";
import Image from "next/image";
import { Property } from "@/types";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <Image
        src={property.image}
        alt={property.title}
        width={400}
        height={250}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{property.title}</h2>
        <p className="text-gray-600">{property.location}</p>
        <p className="text-green-600 font-bold">₹ {property.price}</p>
        <p className="text-sm text-gray-500 capitalize">{property.type}</p>
      </div>
    </div>
  );
}
