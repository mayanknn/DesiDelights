import React, { useState } from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { Razorpay } = useRazorpay();

  const payNow = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch order details from your backend
      const response = await fetch("http://localhost:8080/order");
      const data = await response.json();
      console.log(data);

      if (!data || !data.amount || !data.orderID) {
        throw new Error("Invalid order data received from server");
      }

      const options = {
        key: "rzp_test_ympRGkcZSefCNd", // Replace with your Razorpay key
        amount: data.amount * 100, // Convert to paise
        currency: "INR",
        name: "DESI DELIGHT",
        description: "PAY BILL",
        order_id: data.orderID,
        handler: (response) => {
          console.log("Payment Successful", response);
          alert("Payment Successful!");
        },
        prefill: {
          name: "Mayank Nihalchandani",
          email: "mayanknihalchandani673@gmail.com",
          contact: "9313613987",
        },
        theme: {
          color: "#F37254",
        },
      };

      // Ensure `Razorpay` is available
      if (Razorpay) {
        const razorpayInstance = new Razorpay(options);

        razorpayInstance.on("payment.failed", (response) => {
          console.error("Payment Failed", response.error);
          alert(`Payment Failed! Error: ${response.error.code}`);
        });

        razorpayInstance.open();
      } else {
        throw new Error("Razorpay SDK not loaded");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={payNow} disabled={isLoading}>
        {isLoading ? "Loading..." : "Pay Now"}
      </button>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
    </div>
  );
};

export default App;
