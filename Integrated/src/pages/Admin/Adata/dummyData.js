export const menuItems = [
    {
      id: '1',
      name: 'Butter Chicken',
      description: 'Tender chicken pieces in rich, creamy tomato sauce',
      price: 320,
      category: 'main',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500',
      ratings: 4.8,
      isAvailable: true,
    },
    {
      id: '2',
      name: 'Paneer Tikka',
      description: 'Grilled cottage cheese with spices and vegetables',
      price: 280,
      category: 'starters',
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500',
      ratings: 4.5,
      isAvailable: true,
    },
    {
      id: '3',
      name: 'Garlic Naan',
      description: 'Freshly baked bread with garlic and butter',
      price: 60,
      category: 'breads',
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e3?w=500',
      ratings: 4.3,
      isAvailable: true,
    },
    {
      id: '4',
      name: 'Gulab Jamun',
      description: 'Sweet milk dumplings in sugar syrup',
      price: 120,
      category: 'desserts',
      image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=500',
      ratings: 4.7,
      isAvailable: false,
    },
    {
      id: '5',
      name: 'Mango Lassi',
      description: 'Refreshing yogurt drink with mango pulp',
      price: 90,
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=500',
      ratings: 4.6,
      isAvailable: true,
    },
  ];
  
  export const customers = [
    {
      id: '1',
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      email: 'rahul.s@example.com',
      visits: 15,
      totalSpent: 12500,
      lastVisit: new Date('2024-03-10'),
      reviews: [
        {
          id: '1',
          rating: 5,
          comment: 'Amazing food and service! The butter chicken was outstanding.',
          date: new Date('2024-03-10'),
          customerId: '1',
        },
        {
          id: '2',
          rating: 4,
          comment: 'Great ambiance, slightly long wait times.',
          date: new Date('2024-02-15'),
          customerId: '1',
        },
      ],
    },
    {
      id: '2',
      name: 'Priya Patel',
      phone: '+91 87654 32109',
      email: 'priya.p@example.com',
      visits: 8,
      totalSpent: 6800,
      lastVisit: new Date('2024-03-12'),
      reviews: [
        {
          id: '3',
          rating: 5,
          comment: 'Best paneer tikka in town! Will definitely come back.',
          date: new Date('2024-03-12'),
          customerId: '2',
        },
      ],
    },
  ];
  
  export const orders = [
    {
      id: 'ORD001',
      items: [
        {
          menuItem: menuItems[0],
          quantity: 2,
          subtotal: 640,
        },
        {
          menuItem: menuItems[2],
          quantity: 3,
          subtotal: 180,
        },
      ],
      tableNumber: 5,
      status: 'completed',
      totalAmount: 820,
      customerName: 'Rahul Sharma',
      customerPhone: '+91 98765 43210',
      orderDate: new Date('2024-03-10 19:30'),
    },
    {
      id: 'ORD002',
      items: [
        {
          menuItem: menuItems[1],
          quantity: 1,
          subtotal: 280,
        },
        {
          menuItem: menuItems[4],
          quantity: 2,
          subtotal: 180,
        },
      ],
      tableNumber: 3,
      status: 'preparing',
      totalAmount: 460,
      customerName: 'Priya Patel',
      customerPhone: '+91 87654 32109',
      orderDate: new Date('2024-03-12 20:15'),
    },
  ];
  
  export const donations = [
    {
      id: 'DON001',
      items: [menuItems[0], menuItems[1]],
      quantity: 25,
      organization: 'Food for All NGO',
      date: new Date('2024-03-01'),
      status: 'completed',
    },
    {
      id: 'DON002',
      items: [menuItems[2], menuItems[3]],
      quantity: 30,
      organization: 'Helping Hands Foundation',
      date: new Date('2024-03-15'),
      status: 'scheduled',
    },
  ];
  
  export const donationStats = [
    { month: 'Jan', meals: 150 },
    { month: 'Feb', meals: 200 },
    { month: 'Mar', meals: 180 },
    { month: 'Apr', meals: 220 },
    { month: 'May', meals: 250 },
    { month: 'Jun', meals: 190 },
  ];
  
  export const salesData = [
    { date: '2024-03-01', revenue: 15000, orders: 45 },
    { date: '2024-03-02', revenue: 12000, orders: 38 },
    { date: '2024-03-03', revenue: 18000, orders: 52 },
    { date: '2024-03-04', revenue: 16000, orders: 48 },
    { date: '2024-03-05', revenue: 22000, orders: 65 },
    { date: '2024-03-06', revenue: 25000, orders: 72 },
    { date: '2024-03-07', revenue: 20000, orders: 58 },
  ];
  
  export const categoryDistribution = [
    { name: 'Main Course', value: 45 },
    { name: 'Starters', value: 25 },
    { name: 'Desserts', value: 15 },
    { name: 'Beverages', value: 15 },
  ];