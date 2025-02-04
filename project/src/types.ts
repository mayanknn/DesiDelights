export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  isJain: boolean;
  image: string;
  ingredients: string[];
}

export interface User {
  email: string;
  password: string;
  name: string;
}

export interface Reservation {
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}