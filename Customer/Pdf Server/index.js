const express = require("express");
const cors = require("cors");
const ImageKit = require("imagekit");
const PDFGenerator = require("./pdfGenerator");
const app = express();
// Generate and upload invoice PDF
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize ImageKit
// Initialize ImageKit with your credentials
const imagekit = new ImageKit({
    publicKey: "public_XIz+lkN8Ye0WpbUS6A2/n7TIK00=",
    privateKey: "private_e/Kr8usBddDd72BXOmuyXrzbNUk=",
    urlEndpoint: "https://ik.imagekit.io/9uls8zjbo/"
  });


  app.post("/generate-invoice", async (req, res) => {
    console.log('Received request:', req.body); // Debug logging
  
    try {
      const { orderData } = req.body;
      
      // Validate input
      if (!orderData?.orderId || !Array.isArray(orderData?.items)) {
        return res.status(400).json({ 
          success: false,
          error: "Missing required fields: orderId and items array"
        });
      }
  
      const pdfGenerator = new PDFGenerator();
      const pdfBuffer = await pdfGenerator.generateInvoice({
        ...orderData,
        invoiceId: orderData.orderId,
        subtotal: orderData.subtotal || orderData.totalAmount,
        tax: orderData.tax || (orderData.totalAmount * 0.05),
        total: orderData.total || (orderData.totalAmount * 1.05)
      });
  
      console.log('PDF generated successfully, size:', pdfBuffer.length);
  
      const uploadResponse = await imagekit.upload({
        file: pdfBuffer,
        fileName: `invoice-${orderData.orderId}-${Date.now()}.pdf`,
        folder: "/invoices"
      });
  
      return res.json({
        success: true,
        invoiceUrl: uploadResponse.url,
        fileId: uploadResponse.fileId
      });
  
    } catch (error) {
      console.error('Full error:', error);
      return res.status(500).json({
        success: false,
        error: "PDF processing failed",
        details: process.env.NODE_ENV === 'development' ? error.message : null
      });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`PDF generation endpoint: http://localhost:${PORT}/generate-invoice`);
  });