export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: string;
    category: string;
    image: string;
    additionalToppings?: {
      name: string;
      price: number;
    }[];
  }
  
  export interface CartItem extends MenuItem {
    quantity: number;
    selectedToppings: string[];
  }
  
  export interface User {
    name: string;
    phone: string;
    loyaltyPoints: number;
  }
  
  export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: string;
    status: 'pending' | 'confirmed' | 'delivered';
  }
  
  export interface CartContextType {
    items: CartItem[];
    addToCart: (item: MenuItem, selectedToppings: string[]) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    total: number;
  }
  
  export interface WishlistContextType {
    items: MenuItem[];
    addToWishlist: (item: MenuItem) => void;
    removeFromWishlist: (itemId: string) => void;
    isInWishlist: (itemId: string) => boolean;
  }