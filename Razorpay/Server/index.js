const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const app = express();
const instance = new Razorpay({
    key_id: 'rzp_test_ympRGkcZSefCNd',
    key_secret: 'I8vTBWnKrAFBAd4CiMb8F2Ya',
  });
app.listen(8080)
app.use(cors());
app.get('/order',async(req,res)=>{
    const data = await instance.orders.create({
        "amount": 100,
        "currency": "INR",
        "receipt": "ORD_ID_"+Date.now(),
      })
      res.json({
        amount : data.amount,
        orderID : data.id,
      });
})