const express = require("express");
const cors = require("cors");
const ImageKit = require("imagekit");
const app = express();
app.use(cors());

const imagekit = new ImageKit({
  publicKey: "public_XIz+lkN8Ye0WpbUS6A2/n7TIK00=",
  privateKey: "private_e/Kr8usBddDd72BXOmuyXrzbNUk=",
  urlEndpoint: "https://ik.imagekit.io/9uls8zjbo/"
});

// Generate authentication parameters
app.get("/auth", (req, res) => {
  const authenticationParameters = imagekit.getAuthenticationParameters();
  res.json(authenticationParameters);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
