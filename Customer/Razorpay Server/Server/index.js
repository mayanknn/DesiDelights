const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());

const instance = new Razorpay({
    key_id: 'rzp_test_ympRGkcZSefCNd',
    key_secret: 'I8vTBWnKrAFBAd4CiMb8F2Ya',
});

app.get('/order', async (req, res) => {
    try {
        const data = await instance.orders.create({
            amount: 1000, // Amount in paise (₹10.00)
            currency: "INR",
            receipt: "ORD_ID_" + Date.now(),
        });

        res.json({
            amount: data.amount,
            orderID: data.id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server (Only once)
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
