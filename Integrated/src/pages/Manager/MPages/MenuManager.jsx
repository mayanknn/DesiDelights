import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { UtensilsCrossed } from "lucide-react";

export default function MenuManager() {
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "menuItems"));
        const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const groupedItems = items.reduce((acc, item) => {
          if (!acc[item.categoryId]) {
            acc[item.categoryId] = { displayName: item.category, items: [] };
          }
          acc[item.categoryId].items.push(item);
          return acc;
        }, {});

        setCategories(groupedItems);
        setSelectedCategory(Object.keys(groupedItems)[0] || "");
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.item.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.item.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const totalAmount = cart.reduce(
    (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty! Please add items before checkout.");
      return;
    }
  
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    const orderDetails = cart.map(({ item, quantity }) => ({
      itemId: item.id || '',
      name: item.itemName || '',
      price: item.price || 0,
      category: item.category || '',
      quantity: quantity || 1,
    }));
  
    const orderData = {
      orderDetails: orderDetails,
      total: totalAmount || 0,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      customerName: "Walk-in Customer", // Default value
      paymentMethod: "Cash", // Default value
    };
  
    console.log("Order data being submitted:", orderData); // Debug log
  
    try {
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Order placed successfully with ID:", docRef.id);
      alert(`Order placed successfully! Order ID: ${docRef.id}`);
      setCart([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert(`Failed to place order: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-6">
      <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <UtensilsCrossed className="mr-2" /> Categories
        </h2>
        <ul className="space-y-2">
          {Object.entries(categories).map(([categoryId, category]) => (
            <li
              key={categoryId}
              className={`px-3 py-2 rounded-md cursor-pointer transition-colors ${
                selectedCategory === categoryId ? "bg-[#C2410C] text-white" : "bg-gray-50"
              }`}
              onClick={() => setSelectedCategory(categoryId)}
            >
              {category.displayName || categoryId}
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-7 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <div className="grid grid-cols-2 gap-4">
          {selectedCategory &&
            categories[selectedCategory]?.items.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 shadow-sm cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={() => addToCart(item)}
              >
                <h3 className="font-semibold">{item.itemName}</h3>
                <span className="font-bold">₹{item.price}</span>
                {item.isJain && (
                  <span className="text-green-600 font-medium block mt-2">Jain Available</span>
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="col-span-3 bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
        <h2 className="text-xl font-semibold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <>
            <ul>
              {cart.map(({ item, quantity }) => (
                <li key={item.id} className="flex justify-between items-center p-2 border-b">
                  <span className="flex-1">
                    {item.itemName} (x{quantity})
                  </span>
                  <div className="flex items-center">
                    <span className="mr-4">₹{item.price * quantity}</span>
                    <div className="flex border rounded">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(item.id);
                        }}
                        className="px-2 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                        className="px-2 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <div className="font-bold text-lg">Total: ₹{totalAmount}</div>
              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className={`mt-2 w-full bg-[#C2410C] text-white px-4 py-2 rounded-md ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#9C3A0A]"
                }`}
              >
                {isSubmitting ? "Processing..." : "Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}