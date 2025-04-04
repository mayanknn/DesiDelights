import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Heart, BookmarkPlus, ShoppingCart, Search, Star, X, Minus, Plus } from 'lucide-react';
import { collection, getDocs, addDoc, serverTimestamp, updateDoc, doc, setDoc,query,where } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useRazorpay } from "react-razorpay";
import { useWishlist } from '../context/WishlistContext';
import { useFavorites } from '../context/FavoritesContext';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth } from '../firebase';



export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([{ id: 'All', displayName: 'All' }]);

  const { items, addToCart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();
  const Razorpay = useRazorpay();

  // Fetch menu items from Firestore
  useEffect(() => {
    const fetchMenuItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'menuItems'));
      const fetchedItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuItems(fetchedItems);
    };
    fetchMenuItems();
  }, []);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const fetchedCategories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          displayName: doc.data().displayName,
        }));
        setCategories([{ id: 'All', displayName: 'All' }, ...fetchedCategories]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Filtering logic for menu items
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.categoryId === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });



  const userData = localStorage.getItem("userData");
  const handleAddToCart = (item) => {
    if (items.length === 0 && !userData) {
      setShowPhoneInput(true); // Prompt for sign-in
    } else {
      addToCart(item); // Add item to cart
      setShowPhoneInput(false);
    }
  };

  // // Handle adding an item to the cart
  // const handleAddToCart = (item) => {
  //   if (items.length === 0 && !phoneNumber) {
  //     setShowPhoneInput(true); // Prompt for phone number if cart is empty
  //   } else {
  //     addToCart(item); // Add item to cart
  //     setShowPhoneInput(false); // Hide phone input after adding an item
  //   }
  // };

  // Handle checkout process with Razorpay integration
  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.9:9000/order", {});
      const data = await response.json();

      if (!data || !data.amount || !data.orderID) {
        throw new Error("Invalid order data received from server");
      }
      const userData = localStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData);
      if (userData) {
         // Convert string to object
        console.log("User UID:", parsedUserData.uid);
      } else {
        console.log("No user data found in localStorage");
      }
      const options = {
        key: "rzp_test_ympRGkcZSefCNd", // Replace with your Razorpay key
        amount: data.amount,
        currency: "INR",
        name: "DESI DELIGHT",
        description: "PAY BILL",
        order_id: data.orderID,
        handler: async (response) => {

          // Save order details to Firestore
          const orderRef = await addDoc(collection(db, "orders"), {
            orderId: "",
            uid: parsedUserData.uid,
            orderDate: serverTimestamp(),
            orderDetails: JSON.stringify(
              items.map((item) => ({
                category: item.categoryId,
                name: item.itemName,
                quantity: item.quantity,
                price: item.price,
              }))
            ),
            totalAmount: total,
            paymentStatus: "Done",
            paymentId: response.razorpay_payment_id,
            isDone:"pending"
          });

          await updateDoc(orderRef, { orderId: orderRef.id });

          alert("Payment successful! Order placed.");
          setCartOpen(false);
        },
        prefill: {
          name: parsedUserData.name,
          email: parsedUserData.email,
          contact: phoneNumber || "9313613987",
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options); // Use window.Razorpay directly
      rzp.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Failed to complete payment. Please try again.");
    }
  };
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);

      const user = result.user;
      const { uid, displayName, email } = user;
      const role = "Customer"; // Default role

      // Store in localStorage
      localStorage.setItem("userData", JSON.stringify({ uid, displayName, email, role }));

      // Reference to the Firestore collection
      const usersRef = collection(db, "users");

      // Query Firestore for the user with the given email
      const querySnapshot = await getDocs(usersRef);
      const existingUser = querySnapshot.docs.find(doc => doc.data().email === email);

      if (existingUser) {
        // User exists, update their visit count
        const userDocRef = doc(db, "users", existingUser.id);
        const userData = existingUser.data();
        const currentVisits = userData.visit || 0; // Default to 0 if visit is missing
        const currentTotalSpent = userData.totalSpent || 0; // Default to 0 if totalSpent is missing

        await updateDoc(userDocRef, {
          visit: currentVisits + 1
        });

        console.log("User exists. Visit count updated:", currentVisits + 1);
      } else {
        // User does not exist, create a new entry
        const da = new Date();
        const userDocRef = doc(db, "users", uid);

        await setDoc(userDocRef, {
          name: displayName,
          email: email,
          uid: uid,
          role: role,
          date: da.toLocaleDateString(),
          visit: 1, // First-time visit
          totalSpent: 0 // Initial value
        });

        console.log("New user added to Firestore.");
      }




      setShowPhoneInput(false); // Hide popup after login
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Menu & Search */}
      <div className={`sticky top-16 bg-white shadow-md z-40 transition-all ${showPhoneInput ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-4 flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pb-4 -mx-4 px-4 overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {categories.map(({ displayName }) => (
                <button
                  key={displayName}
                  onClick={() => setSelectedCategory(displayName)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
                ${selectedCategory === displayName
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {displayName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Blur + Centered Popup */}
      {showPhoneInput && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white w-80 p-6 rounded-lg shadow-lg border border-gray-300 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {showOTPInput ? "Enter OTP" : "Enter Your Phone Number"}
              </h3>
              <button onClick={() => setShowPhoneInput(false)} className="text-gray-600 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>

            {!showOTPInput ? (
              <>
                <p className="text-sm text-gray-600 mt-1">We need your phone number to proceed with the order.</p>
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-700 transition-all"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="w-5 h-5" alt="Google logo" />
                  <span>Sign in with Google</span>
                </button>
              </>
            ) : null}

          </div>
        </div>
      )}
      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No items found</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-orange-600 hover:text-orange-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} handleAddToCart={handleAddToCart} setShowPhoneInput={setShowPhoneInput} />
            ))}
          </div>

        )}
      </div>

      {/* Floating Cart Button */}
      <button
        className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-lg flex items-center space-x-2 hover:bg-orange-700"
        onClick={() => setCartOpen(true)}
      >
        <ShoppingCart size={24} />
        <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
          {items.length}
        </span>
      </button>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="w-96 bg-white h-full shadow-lg p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-gray-600 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-gray-500 text-center mt-6">Your cart is empty.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center space-x-4">
                      <img src={item.imageUrl} alt={item.itemName} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <h3 className="text-md font-semibold">{item.itemName}</h3>
                        <p className="text-gray-500 text-sm">₹{item.price} x {item.quantity}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                            <Minus size={16} />
                          </button>
                          <span className="text-md font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                      <X size={20} />
                    </button>
                  </div>
                ))}
                <div className="text-right font-bold text-lg mt-4">Total: ₹{total}</div>
                <button onClick={handleCheckout} className="w-full bg-orange-600 text-white py-2 mt-4 rounded-lg hover:bg-orange-700">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MenuCard({ item, handleAddToCart, setShowPhoneInput }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [inFavorites, setInFavorites] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  // Function to generate random alphanumeric ID
  const generateRandomId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Check initial favorite/wishlist status
  useEffect(() => {
    const checkStatus = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData) return;

      // Check favorites status
      const favQuery = query(
        collection(db, "favorites"),
        where("uid", "==", userData.uid),
        where("itemId", "==", item.id)
      );
      const favSnapshot = await getDocs(favQuery);
      setInFavorites(!favSnapshot.empty);

      // Check wishlist status
      const wishQuery = query(
        collection(db, "wishlist"),
        where("uid", "==", userData.uid),
        where("itemId", "==", item.id)
      );
      const wishSnapshot = await getDocs(wishQuery);
      setInWishlist(!wishSnapshot.empty);
    };

    checkStatus();
  }, [item.id]);

  const toggleFavorite = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    if (!userData) {
      setShowPhoneInput(true);
      return;
    }

    try {
      const favoritesRef = collection(db, "favorites");
      const q = query(
        favoritesRef,
        where("uid", "==", userData.uid),
        where("itemId", "==", item.id)
      );
      
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Add to favorites
        const docId = generateRandomId();
        await setDoc(doc(favoritesRef, docId), {
          id: docId,
          uid: userData.uid,
          itemId: item.id,
          itemName: item.itemName,
          description: item.description,
          price: item.price,
          imageUrl: item.imageUrl,
          categoryId: item.categoryId,
          createdAt: serverTimestamp()
        });
        setInFavorites(true);
      } else {
        // Remove from favorites
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setInFavorites(false);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const toggleWishlist = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    if (!userData) {
      setShowPhoneInput(true);
      return;
    }

    try {
      const wishlistRef = collection(db, "wishlist");
      const q = query(
        wishlistRef,
        where("uid", "==", userData.uid),
        where("itemId", "==", item.id)
      );
      
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Add to wishlist
        const docId = generateRandomId();
        await setDoc(doc(wishlistRef, docId), {
          id: docId,
          uid: userData.uid,
          itemId: item.id,
          itemName: item.itemName,
          description: item.description,
          price: item.price,
          imageUrl: item.imageUrl,
          categoryId: item.categoryId,
          createdAt: serverTimestamp()
        });
        setInWishlist(true);
      } else {
        // Remove from wishlist
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setInWishlist(false);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="flex flex-row items-center p-4 bg-white shadow-lg rounded-2xl transform transition-all hover:scale-105 sm:flex-row sm:w-full">
      <img src={item.imageUrl} alt={item.itemName} className="w-32 h-32 object-cover rounded-lg" />
      <div className="flex-1 text-left ml-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.itemName}</h3>
        <p className="text-xs text-gray-600 mt-1">{item.description}</p>
        <p className="text-lg font-semibold text-orange-600 mt-2">₹{item.price}</p>
        <div className="flex gap-2 mt-2">
          <button 
            onClick={toggleFavorite} 
            className={`p-2 rounded-full shadow bg-gray-200 hover:bg-yellow-100 ${inFavorites ? 'text-yellow-500' : 'text-gray-500'}`}
          >
            <Star size={20} />
          </button>
          <button 
            onClick={toggleWishlist} 
            className={`p-2 rounded-full shadow bg-gray-200 hover:bg-red-100 ${inWishlist ? 'text-red-500' : 'text-gray-500'}`}
          >
            <Heart size={20} />
          </button>
          <button
            onClick={() => handleAddToCart(item)}
            className="px-4 py-2 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-700 flex items-center space-x-2"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
