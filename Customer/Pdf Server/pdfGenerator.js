const { jsPDF } = require('jspdf');

class PDFGenerator {
    async generateInvoice(data) {
        try {
            const doc = new jsPDF();

            // Validate and extract data
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid input data format');
            }

            const invoiceId = data.invoiceId || data.orderId || 'N/A';
            const date = data.date || new Date().toLocaleDateString();
            const customer = data.customer || {};
            const customerName = (customer.displayName || customer.name || 'Customer').trim();
            const customerEmail = customer.email || '';
            const customerAddress = customer.address || '';

            // Handle items array safely
            let items = [];
            if (Array.isArray(data.items)) {
                items = data.items.map(item => ({
                    name: String(item.name || 'Unnamed Item'),
                    description: String(item.description || ''),
                    quantity: Number(item.quantity) || 1,
                    price: Number(item.price) || 0
                }));
            }

            const paymentMethod = data.paymentMethod || 'Online Payment';

            // Calculate amounts
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const total = subtotal; // Always use calculated subtotal as total

            // Professional color scheme with subtle orange
            const darkColor = '#333333';
            const mediumColor = '#666666';
            const lightColor = '#FFF5EB'; // Very light orange
            const accentColor = '#E67E22'; // Muted orange
            const borderColor = '#E67E22';

            // Set document defaults
            doc.setFont('helvetica');
            doc.setTextColor(darkColor);

            // Header section with subtle orange accent
            doc.setFillColor(lightColor);
            doc.rect(0, 0, 210, 40, 'F');

            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(accentColor);
            doc.text('DESI DELIGHTS', 15, 20);

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(darkColor);
            doc.text('123 Spice Street, Mumbai', 15, 27);
            doc.text('Maharashtra 400001, India', 15, 32);
            doc.text('GSTIN: 27ABCDE1234F1Z2', 15, 37);

            // Invoice info
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('INVOICE', 160, 20, { align: 'right' });

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Invoice #: ${invoiceId}`, 160, 27, { align: 'right' });
            doc.text(`Date: ${date}`, 160, 32, { align: 'right' });
            doc.text(`Payment: ${paymentMethod}`, 160, 37, { align: 'right' });

            // Customer information
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('BILL TO:', 15, 50);

            doc.setFont('helvetica', 'normal');
            doc.text(customerName, 15, 57);

            const addressLines = doc.splitTextToSize(customerAddress, 80);
            doc.text(addressLines, 15, 64);

            if (customerEmail) {
                doc.text(customerEmail, 15, addressLines.length > 1 ? 74 : 70);
            }

            // Line separator with orange accent
            doc.setDrawColor(borderColor);
            doc.setLineWidth(0.5);
            doc.line(15, 85, 195, 85);

            // Items table header with light orange background
            doc.setFillColor(lightColor);
            doc.rect(15, 90, 180, 8, 'F');

            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(darkColor);
            doc.text('Description', 20, 95);
            doc.text('Qty', 130, 95, { align: 'right' });
            doc.text('Rate', 150, 95, { align: 'right' });
            doc.text('Amount', 180, 95, { align: 'right' });

            // Items table rows
            let y = 105;
            items.forEach((item, index) => {
                const name = String(item.name).substring(0, 50);
                const description = String(item.description).substring(0, 80);
                const quantity = item.quantity;
                const price = item.price;
                const amount = price * quantity;

                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(darkColor);
                doc.text(name, 20, y);

                if (description) {
                    doc.setFontSize(8);
                    doc.setTextColor(mediumColor);
                    doc.text(description, 20, y + 4);
                }

                doc.setFontSize(10);
                doc.setTextColor(darkColor);
                doc.text(String(quantity), 130, y, { align: 'right' });
                doc.text(`₹${price.toFixed(2)}`, 150, y, { align: 'right' });
                doc.text(`₹${amount.toFixed(2)}`, 180, y, { align: 'right' });

                y += description ? 12 : 8;
            });

            // Totals section
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Total:', 160, y + 20, { align: 'right' });
            doc.text(`₹${total.toFixed(2)}`, 180, y + 20, { align: 'right' });

            // Footer with subtle orange border
            doc.setDrawColor(borderColor);
            doc.setLineWidth(0.3);
            doc.line(15, 280, 195, 280);

            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(mediumColor);
            doc.text('Thank you for your business!', 105, 285, { align: 'center' });
            doc.text('Payment due within 15 days', 105, 290, { align: 'center' });

            return Buffer.from(doc.output('arraybuffer'));
        } catch (error) {
            console.error('PDF Generation Error:', {
                message: error.message,
                stack: error.stack,
                inputData: data
            });
            throw new Error(`Failed to generate PDF: ${error.message}`);
        }
    }
}

module.exports = PDFGenerator;