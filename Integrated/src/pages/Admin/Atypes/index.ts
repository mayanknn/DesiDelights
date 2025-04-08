export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    ratings: number;
    isAvailable: boolean;
  }
  
  export interface Order {
    id: string;
    items: OrderItem[];
    tableNumber: number;
    status: 'pending' | 'preparing' | 'served' | 'completed';
    totalAmount: number;
    customerName: string;
    customerPhone: string;
    orderDate: Date;
  }
  
  export interface OrderItem {
    menuItem: MenuItem;
    quantity: number;
    subtotal: number;
  }
  
  export interface Table {
    id: number;
    capacity: number;
    isOccupied: boolean;
    currentOrder?: Order;
  }
  
  export interface Customer {
    id: string;
    name: string;
    phone: string;
    email: string;
    visits: number;
    totalSpent: number;
    lastVisit: Date;
    reviews: Review[];
  }
  
  export interface Review {
    id: string;
    rating: number;
    comment: string;
    date: Date;
    customerId: string;
  }
  
  export interface DonationRecord {
    id: string;
    items: MenuItem[];
    quantity: number;
    organization: string;
    date: Date;
    status: 'scheduled' | 'completed';
  }
  
  export interface SalesData {
    date: Date;
    revenue: number;
    orders: number;
    averageOrderValue: number;
  }