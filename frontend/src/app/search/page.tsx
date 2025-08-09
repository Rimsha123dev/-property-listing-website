


"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Property {
  id: string;
  title: string;
  location: string;
  type: string;
  price: number;
  image: string;
}

const SearchPage = () => {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProperties = async () => {
    setLoading(true);
    setError("");
    try {
      const { location, type, minPrice, maxPrice } = filters;
      const query: Record<string, string | number> = {};
      
      if (location) query.location = location;
      if (type) query.type = type;
      if (minPrice) query.minPrice = Number(minPrice);
      if (maxPrice) query.maxPrice = Number(maxPrice);

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/properties/search`, {
        params: query,
        timeout: 5000, // 5 second timeout
      });

      setProperties(response.data.properties);
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch properties";
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProperties();
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.location, filters.type, filters.minPrice, filters.maxPrice]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <input
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleInputChange}
          className="border rounded px-3 py-2"
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleInputChange}
          className="border rounded px-3 py-2"
        >
          <option value="">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
        </select>
        <input
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleInputChange}
          type="number"
          min="0"
          className="border rounded px-3 py-2"
        />
        <input
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleInputChange}
          type="number"
          min="0"
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded sm:col-span-4 hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property.id}
                className="border rounded shadow-md p-4 hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={property.image || "/placeholder-property.jpg"}
                  alt={property.title}
                  className="w-full h-40 object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-property.jpg";
                  }}
                />
                <h3 className="text-lg font-semibold mt-2">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-sm text-gray-500 capitalize">{property.type}</p>
                <p className="text-blue-600 font-bold">Rs. {property.price.toLocaleString()}</p>
              </div>
            ))
          ) : (
            !loading && <p className="text-gray-500 col-span-full text-center py-10">No properties found matching your criteria.</p>
          )}
        </div>
      )}

        <Link href="/">
          <button className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Properties
          </button>
        </Link>

    </div>
  );
};

export default SearchPage;


