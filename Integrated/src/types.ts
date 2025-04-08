export interface Order {
    id: string;
    tableNumber: number;
    items: OrderItem[];
    status: 'New' | 'In Progress' | 'Ready' | 'Delayed' | 'Completed' | 'Cancelled';
    timestamp: string;
    priority: boolean;
  }
  
  export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    category: 'Starters' | 'Main Course' | 'Beverages' | 'Desserts';
    specialInstructions?: string;
  }
  
  export interface WasteLog {
    id: string;
    dishName: string;
    quantity: number;
    reason?: string;
    timestamp: string;
  }