import HeroSection from "@/components/HeroSection";
import PropertyCard from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Property = {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  image: string;
};

async function fetchProperties(): Promise<Property[]> {
  console.log("API URL used:", process.env.NEXT_PUBLIC_API_URL);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/all`, {
    cache: "no-store",
  });

  console.log("HTTP status:", res.status);

  if (!res.ok) {
    console.error("Failed fetch:", await res.text());
    throw new Error("Failed to fetch properties");
  }

  return res.json();
}

// async function fetchProperties(): Promise<Property[]> {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
//   if (!apiUrl) {
//     console.error("API URL is not defined");
//     throw new Error("API URL is not configured");
//   }

//   try {
//     console.log("Trying to fetch from:", `${apiUrl}/properties`);
    
//     const res = await fetch(`${apiUrl}/properties`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Failed to fetch properties:", error);
//     throw new Error("Failed to load properties. Please check your connection and try again.");
//   }
// }

export default async function Home() {
  const properties = await fetchProperties();

  return (
    <>
    <Navbar/>

      {/* 🏡 Hero Section Component */}
      <HeroSection />

      {/* 🏠 Main Property Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

        <section  id="explore-properties">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Explore Properties</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
         <Footer />
      </main>
    </>
  );
}
