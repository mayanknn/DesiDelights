// import { jsPDF } from 'jspdf';
// import { Order } from '../Atypes/index';

// export const generateInvoicePDF = (order: Order) => {
//   const doc = new jsPDF();
  
//   // Header
//   doc.setFontSize(20);
//   doc.text('Desi Delight Restaurant', 20, 20);
  
//   // Logo placeholder (you can add a logo image here)
//   doc.setFontSize(12);
//   doc.text('Invoice', 20, 30);
//   doc.text(`Order #${order.id}`, 20, 40);
//   doc.text(`Date: ${new Date(order.orderDate).toLocaleDateString()}`, 20, 50);
//   doc.text(`Time: ${new Date(order.orderDate).toLocaleTimeString()}`, 20, 60);
  
//   // Customer Details
//   doc.text('Customer Details:', 20, 80);
//   doc.text(`Name: ${order.customerName}`, 30, 90);
//   doc.text(`Phone: ${order.customerPhone}`, 30, 100);
//   doc.text(`Table: ${order.tableNumber}`, 30, 110);
  
//   // Items Header
//   doc.setFillColor(240, 240, 240);
//   doc.rect(20, 130, 170, 10, 'F');
//   doc.text('Item', 25, 137);
//   doc.text('Qty', 100, 137);
//   doc.text('Price', 130, 137);
//   doc.text('Total', 160, 137);
  
//   // Items
//   let y = 150;
//   order.items.forEach((item) => {
//     doc.text(item.menuItem.name, 25, y);
//     doc.text(item.quantity.toString(), 100, y);
//     doc.text(`₹${item.menuItem.price.toFixed(2)}`, 130, y);
//     doc.text(`₹${item.subtotal.toFixed(2)}`, 160, y);
//     y += 10;
//   });
  
//   // Total
//   y += 10;
//   doc.line(20, y, 190, y);
//   y += 10;
//   doc.setFont('helvetica', 'bold');
//   doc.text('Subtotal:', 130, y);
//   doc.text(`₹${order.totalAmount.toFixed(2)}`, 160, y);
  
//   y += 10;
//   const tax = order.totalAmount * 0.05; // 5% tax
//   doc.setFont('helvetica', 'normal');
//   doc.text('Tax (5%):', 130, y);
//   doc.text(`₹${tax.toFixed(2)}`, 160, y);
  
//   y += 10;
//   doc.setFont('helvetica', 'bold');
//   doc.text('Grand Total:', 130, y);
//   doc.text(`₹${(order.totalAmount + tax).toFixed(2)}`, 160, y);
  
//   // Footer
//   y += 30;
//   doc.setFont('helvetica', 'normal');
//   doc.setFontSize(10);
//   doc.text('Thank you for dining with us!', 20, y);
//   doc.text('Visit us again soon!', 20, y + 10);
  
//   // Restaurant Details
//   y += 30;
//   doc.text('Desi Delight Restaurant', 20, y);
//   doc.text('123 Food Street, Cuisine City', 20, y + 5);
//   doc.text('Phone: +1 234 567 8900', 20, y + 10);
//   doc.text('Email: contact@desidelight.com', 20, y + 15);
  
//   // Terms and Conditions
//   y += 30;
//   doc.setFontSize(8);
//   doc.text('Terms & Conditions:', 20, y);
//   doc.text('1. All prices are inclusive of taxes', 20, y + 5);
//   doc.text('2. This is a computer generated invoice', 20, y + 10);
  
//   // Save the PDF
//   doc.save(`invoice-${order.id}.pdf`);
// };