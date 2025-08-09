"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Property = {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  image: string;
};

export default function PropertyCard({ property }: { property: Property }) {
  const router = useRouter();

  return (
    <div className="rounded-2xl shadow-md overflow-hidden border hover:shadow-xl transition-shadow bg-white">
      <Link href={`/properties/${property.id}`}>
        <div className="relative w-full h-52">
          <Image
            src={property.image  || "https://via.placeholder.com/400x200"}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <Link href={`/properties/${property.id}`}>
          <h2 className="text-lg font-semibold text-gray-800 truncate hover:underline">
            {property.title}
          </h2>
        </Link>

        <p className="text-sm text-gray-500">{property.location}</p>
        <p className="text-sm text-gray-500 capitalize">{property.type}</p>
        <p className="text-md font-bold text-indigo-600">Rs. {property.price}</p>

        <button
          className="mt-2 inline-block px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          onClick={() => router.push(`/properties/${property.id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
