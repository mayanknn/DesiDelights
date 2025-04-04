import React from 'react';
import { Award, Gift, Ticket, Trophy } from 'lucide-react';

// Mock user data (replace with real data later)
const userData = {
  name: "John Doe",
  points: 450,
  tier: "Silver",
  nextTier: "Gold",
  pointsToNextTier: 50
};

const rewards = [
  {
    id: 1,
    name: "Free Dessert",
    points: 200,
    icon: <Gift className="w-6 h-6" />,
    description: "Get any dessert item free with your next order"
  },
  {
    id: 2,
    name: "20% Off",
    points: 500,
    icon: <Ticket className="w-6 h-6" />,
    description: "20% off on your next order above ₹500"
  },
  {
    id: 3,
    name: "Free Delivery",
    points: 300,
    icon: <Trophy className="w-6 h-6" />,
    description: "Free delivery on your next 3 orders"
  }
];

const tiers = [
  { name: "Bronze", minPoints: 0, color: "bg-amber-700" },
  { name: "Silver", minPoints: 300, color: "bg-gray-400" },
  { name: "Gold", minPoints: 500, color: "bg-yellow-500" },
  { name: "Platinum", minPoints: 1000, color: "bg-gray-600" }
];

export default function Loyalty() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Points Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">My Rewards</h1>
          <Award className="text-orange-600 w-8 h-8" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <p className="text-gray-600">Current Points</p>
            <p className="text-3xl font-bold text-orange-600">{userData.points}</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-gray-600">Current Tier</p>
            <p className="text-xl font-semibold">{userData.tier}</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-gray-600">Next Tier</p>
            <p className="text-sm">
              {userData.pointsToNextTier} points to {userData.nextTier}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-600 rounded-full transition-all duration-500"
              style={{ width: `${(userData.points / 1000) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            {tiers.map((tier, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${tier.color}`} />
                <span className="mt-1">{tier.name}</span>
                <span className="text-xs">{tier.minPoints}pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <h2 className="text-xl font-bold mb-4">Available Rewards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map(reward => (
          <div key={reward.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-start">
              <div className="p-3 bg-orange-100 rounded-lg">
                {reward.icon}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{reward.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-medium">{reward.points} points</span>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium
                      ${userData.points >= reward.points
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    disabled={userData.points < reward.points}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Points History */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Points History</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Last Order</span>
              <span>+50 points</span>
            </div>
          </div>
          <div className="p-4 border-b">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Redeemed Free Dessert</span>
              <span className="text-red-500">-200 points</span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Birthday Bonus</span>
              <span>+100 points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}