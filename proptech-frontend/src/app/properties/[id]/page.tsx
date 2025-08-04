import React from 'react';
import axios from 'axios';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  image: string;
}

interface PageProps {
  params: { id: string };
}

const PropertyDetailPage = async ({ params }: PageProps) => {
  const { id } = params;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${id}`);
    const property: Property = res.data;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <img src={property.image} alt={property.title} className="w-full h-96 object-cover rounded-md" />
        <h1 className="text-3xl font-bold mt-4">{property.title}</h1>
        <p className="text-gray-600 mt-2">{property.location}</p>
        <p className="text-xl font-semibold text-green-600 mt-2">${property.price}</p>
        <p className="mt-4">{property.description}</p>
        <span className="mt-2 inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full">{property.type}</span>
      </div>
    );
  } catch (error) {
    return <p className="text-center text-red-500 mt-10">Failed to load property details.</p>;
  }
};

export default PropertyDetailPage;
