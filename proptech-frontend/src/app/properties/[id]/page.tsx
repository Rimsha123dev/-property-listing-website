
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface Message {
  text: string;
  sender: "me" | "owner";
}


interface Owner {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  image: string;
  owner: Owner;
}

const PropertyDetailPage = () => {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null); 
  const router = useRouter();

  const handleDelete = async () => {
  const confirmDelete = confirm("Are you sure you want to delete this property?");
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/properties/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Property deleted successfully!");
    router.push("/"); // redirect to home or search page
  } catch (error) {
    console.error("Error deleting property:", error);
    alert("Failed to delete property. Try again later.");
  }
};




    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(decoded.id); // 👈 If your JWT stores user ID as "id"
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);




const [newMessage, setNewMessage] = useState("");useEffect(() => {
  const chatBox = document.getElementById('chat-box');
  if (chatBox) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}, [messages]);








  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Safely extract the ID from params
        const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
        
        if (!id) {
          throw new Error('Property ID not found');
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to load property details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params]); // Changed to params instead of params.id

  if (loading) return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading property details...</p>
    </div>
  );

  if (error || !property) return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-center">
      <p className="text-red-500 text-lg">{error}</p>
      <Link href="/" className="mt-4 inline-block px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
        ← Back to Properties
      </Link>
    </div>
  );

const handleSendMessage = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newMessage.trim()) return;

  const newMsg: Message = {
    text: newMessage, // ✅ use user-typed message here
    sender: "me",
  };

  setMessages((prev) => [...prev, newMsg]);
  setNewMessage(""); // ✅ clear input after sending

  // Simulate owner's reply
  setTimeout(() => {
    setMessages((prev) => [
      ...prev,
      {
        text: "Thanks for reaching out. I’ll get back to you soon!",
        sender: "owner",
      },
    ]);
  }, 1000);
};

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Property Image */}
        <div className="relative">
          <img
            src={property.image }
            alt={property.title}
            className="w-full h-[400px] object-cover rounded-xl shadow-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.jpg";
            }}
          />
        </div>

        {/* Property Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{property.title}</h1>
          <div className="flex items-center gap-4">
            <p className="text-lg text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {property.location}
            </p>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
              {property.type}
            </span>
          </div>
          
          <p className="text-2xl font-semibold text-green-700">
            Rs.{property.price.toLocaleString()}
          </p>
          
          <div className="prose max-w-none text-gray-700">
            {property.description.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Owner Info */}
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Owner Information</h2>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {/* <img
                  src={property.owner?.image }
                  alt={property.owner?.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/user-placeholder.jpg";
                  }}
                /> */}
              </div>
              <div>
                <p className="text-gray-900 font-medium">{property.owner?.name}</p>
                <p className="text-gray-600 text-sm">{property.owner?.email}</p>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                  Contact Owner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


{currentUserId === property.owner.id && (
  <div className="mt-6 flex gap-4">
    <button
      onClick={() => router.push(`/properties/edit/${property.id}`)}
      className="bg-blue-100 hover:bg-slate-500 text-blue-800 px-4 py-2 rounded-md"
    >
      Edit Property
    </button>
    <button
      onClick={async () => {
        const confirmed = confirm("Are you sure you want to delete this property?");
        if (!confirmed) return;

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/${property.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (!res.ok) throw new Error("Failed to delete");

          alert("Property deleted successfully.");
          router.push("/");
        } catch (err) {
          console.error("Delete failed:", err);
          alert("Something went wrong while deleting.");
        }
      }}
      className="bg-blue-100 hover:bg-red-500 text-blue-800 px-4 py-2 rounded-md"
    >
       Delete Property
    </button>
  </div>
)}





      {/* Back Button */}
      <div className="mt-10">
        <Link href="/">
          <button className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Properties
          </button>
        </Link>
{/* 💬 Chat UI Section */}
<div className="mt-16 border-t pt-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Chat with Owner</h2>

  {/* Message List */}
  <div className="space-y-3 max-h-64 overflow-y-auto border p-4 rounded-md bg-gray-50 mb-6 scroll-smooth" id="chat-box">
    {messages.length === 0 ? (
      <p className="text-gray-500 text-center">No messages yet.</p>
    ) : (
      messages.map((msg, i) => (
        <div
          key={i}
          className={`p-2 rounded-md max-w-xs break-words ${msg.sender === 'me'
            ? 'bg-blue-500 text-white text-right ml-auto'
            : 'bg-gray-200 text-gray-900'
            }`}
        >
          <p className="text-sm">{msg.text}</p>
        </div>
      ))
    )}
  </div>

  {/* Input Box */}
  <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
    <input
      type="text"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      placeholder="Type your message..."
      className="flex-grow p-2 border rounded-md"
    />
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
      Send
    </button>
  </form>
</div>
 </div>

    </div>
  );
};

export default PropertyDetailPage;


