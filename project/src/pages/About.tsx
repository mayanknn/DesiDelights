import React from 'react';
import { Star, Clock, Users, UtensilsCrossed } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">About Desi Delight</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Bringing authentic Indian flavors to your table since 1970
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 1970, Desi Delight began as a small family-owned restaurant with a passion for authentic Indian cuisine. Our founder, inspired by traditional family recipes passed down through generations, embarked on a journey to share the rich flavors of India with the world.
            </p>
            <p className="text-gray-600">
              Today, we continue to honor those traditions while innovating our menu to cater to modern tastes and dietary preferences. Our commitment to quality ingredients, traditional cooking methods, and exceptional service remains unchanged.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80"
              alt="Restaurant Interior"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
              alt="Restaurant Ambiance"
              className="rounded-lg shadow-lg mt-8"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Star,
                title: "Quality First",
                description: "Premium ingredients and authentic spices"
              },
              {
                icon: Clock,
                title: "Fresh Daily",
                description: "All dishes prepared fresh every day"
              },
              {
                icon: Users,
                title: "Family Friendly",
                description: "Perfect atmosphere for family gatherings"
              },
              {
                icon: UtensilsCrossed,
                title: "Diverse Menu",
                description: "Wide range of vegetarian and Jain options"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Rajesh Kumar",
              role: "Head Chef",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
            },
            {
              name: "Priya Sharma",
              role: "Restaurant Manager",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
            },
            {
              name: "Amit Patel",
              role: "Sous Chef",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}