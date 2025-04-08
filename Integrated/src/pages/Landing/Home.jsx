import React from "react";
import { Link } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";
import landing from '../../../public/landing.jpeg';
import Navbar from "./Components/Navbar";
export default function Home() {
  return (
    <div className="min-h-screen" >
      {/* Hero Section */}
      <div 
        className="h-[70vh] bg-cover bg-center relative"
        style={{
          height: "70vh",
          backgroundImage: `url(${"/landing.jpeg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: '0',
          backgroundPositionY: '0',
          // backgroundColor:'yellow'
        }}
      >
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Desi Delight</h1>
            <p className="text-xl md:text-2xl mb-8">
              Experience the authentic taste of India
            </p>
            <div className="space-x-4">
              <Link
                to="/menu"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700"
              >
                View Menu
              </Link>
              <Link
                to="/reservation"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100"
              >
                Book Table
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Specialties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Jain Specialties",
              image:
                "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80",
              description:
                "Pure vegetarian dishes prepared without root vegetables",
            },
            {
              title: "Gujarati Thali",
              image:
                "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80",
              description: "Complete meal with variety of dishes",
            },
            {
              title: "Street Food",
              image:
                "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80",
              description: "Famous Indian street food with a twist",
            },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offer */}
      <div className="bg-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Special Lunch Thali</h2>
              <p className="text-gray-600 mb-6">
                Experience our exclusive lunch thali with 12 items including dessert.
                Available Monday to Friday, 12 PM to 3 PM.
              </p>
              <Link
                to="/menu"
                className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
              >
                <UtensilsCrossed className="mr-2" />
                View Full Menu
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&q=80"
                alt="Special Thali"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
