export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  isRecommended: boolean;
  isChefSpecial: boolean;
  customizations?: {
    spiceLevels: string[];
    portions: string[];
    addOns: {
      name: string;
      price: number;
    }[];
  };
}

export interface User {
  id: string;
  name: string;
  phone: string;
  loyaltyPoints: number;
  favorites: string[];
  wishlist: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  customizations?: {
    spiceLevel?: string;
    portion?: string;
    addOns?: string[];
  };
}