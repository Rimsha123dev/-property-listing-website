// src/app/page.tsx
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types";

async function fetchProperties(): Promise<Property[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default async function Home() {
  const properties = await fetchProperties();

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </main>
  );
}
