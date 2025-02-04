export const menuItems = [
  // Starters
  {
    id: 1,
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes grilled to perfection",
    price: 299,
    category: "starters",
    isJain: true,
    image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&q=80",
    ingredients: ["Paneer", "Yogurt", "Spices"]
  },
  {
    id: 2,
    name: "Samosa",
    description: "Crispy pastry filled with spiced potatoes and peas",
    price: 99,
    category: "starters",
    isJain: false,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80",
    ingredients: ["Potatoes", "Peas", "Spices"]
  },
  {
    id: 3,
    name: "Dahi Puri",
    description: "Crispy puris filled with yogurt and chutneys",
    price: 149,
    category: "starters",
    isJain: true,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80",
    ingredients: ["Puri", "Yogurt", "Chutneys"]
  },
  // Main Course
  {
    id: 4,
    name: "Dal Makhani",
    description: "Creamy black lentils simmered overnight",
    price: 299,
    category: "main course",
    isJain: true,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
    ingredients: ["Black Lentils", "Cream", "Butter"]
  },
  {
    id: 5,
    name: "Paneer Butter Masala",
    description: "Cottage cheese in rich tomato gravy",
    price: 349,
    category: "main course",
    isJain: true,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80",
    ingredients: ["Paneer", "Tomatoes", "Cream"]
  },
  {
    id: 6,
    name: "Chole Bhature",
    description: "Spiced chickpeas with fluffy fried bread",
    price: 249,
    category: "main course",
    isJain: false,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80",
    ingredients: ["Chickpeas", "Flour", "Spices"]
  },
  // Breads
  {
    id: 7,
    name: "Butter Naan",
    description: "Soft tandoor-baked bread brushed with butter",
    price: 69,
    category: "breads",
    isJain: true,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80",
    ingredients: ["Flour", "Butter", "Yogurt"]
  },
  {
    id: 8,
    name: "Garlic Roti",
    description: "Whole wheat bread with garlic",
    price: 59,
    category: "breads",
    isJain: false,
    image: "https://images.unsplash.com/photo-1590502593744-2a11e7449d3c?auto=format&fit=crop&q=80",
    ingredients: ["Wheat Flour", "Garlic", "Butter"]
  },
  // Rice Dishes
  {
    id: 9,
    name: "Veg Biryani",
    description: "Fragrant rice with mixed vegetables",
    price: 299,
    category: "rice",
    isJain: false,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80",
    ingredients: ["Basmati Rice", "Vegetables", "Spices"]
  },
  {
    id: 10,
    name: "Jeera Rice",
    description: "Steamed rice tempered with cumin",
    price: 199,
    category: "rice",
    isJain: true,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80",
    ingredients: ["Basmati Rice", "Cumin", "Ghee"]
  },
  // Desserts
  {
    id: 11,
    name: "Gulab Jamun",
    description: "Deep-fried milk solids in sugar syrup",
    price: 149,
    category: "desserts",
    isJain: true,
    image: "https://images.unsplash.com/photo-1605196560547-b2f7281b7355?auto=format&fit=crop&q=80",
    ingredients: ["Milk Powder", "Sugar", "Cardamom"]
  },
  {
    id: 12,
    name: "Rasmalai",
    description: "Soft cottage cheese dumplings in saffron milk",
    price: 199,
    category: "desserts",
    isJain: true,
    image: "https://images.unsplash.com/photo-1634481570432-0987f7f06fcc?auto=format&fit=crop&q=80",
    ingredients: ["Cottage Cheese", "Milk", "Saffron"]
  },
  // More Starters
  {
    id: 13,
    name: "Pani Puri",
    description: "Hollow crispy balls with spiced water",
    price: 129,
    category: "starters",
    isJain: true,
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80",
    ingredients: ["Semolina", "Mint", "Tamarind"]
  },
  {
    id: 14,
    name: "Aloo Tikki",
    description: "Spiced potato patties",
    price: 149,
    category: "starters",
    isJain: false,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80",
    ingredients: ["Potatoes", "Green Peas", "Spices"]
  },
  // More Main Course
  {
    id: 15,
    name: "Malai Kofta",
    description: "Cheese dumplings in creamy gravy",
    price: 329,
    category: "main course",
    isJain: true,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
    ingredients: ["Paneer", "Cream", "Nuts"]
  },
  {
    id: 16,
    name: "Kadai Paneer",
    description: "Cottage cheese in spicy bell pepper gravy",
    price: 349,
    category: "main course",
    isJain: true,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80",
    ingredients: ["Paneer", "Bell Peppers", "Spices"]
  },
  // More Rice
  {
    id: 17,
    name: "Kashmiri Pulao",
    description: "Rice with fruits and nuts",
    price: 249,
    category: "rice",
    isJain: true,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80",
    ingredients: ["Basmati Rice", "Dry Fruits", "Saffron"]
  },
  // More Desserts
  {
    id: 18,
    name: "Gajar Ka Halwa",
    description: "Carrot pudding with nuts",
    price: 199,
    category: "desserts",
    isJain: false,
    image: "https://images.unsplash.com/photo-1605196560547-b2f7281b7355?auto=format&fit=crop&q=80",
    ingredients: ["Carrots", "Milk", "Nuts"]
  },
  {
    id: 19,
    name: "Kulfi Falooda",
    description: "Traditional ice cream with rose syrup",
    price: 179,
    category: "desserts",
    isJain: true,
    image: "https://images.unsplash.com/photo-1634481570432-0987f7f06fcc?auto=format&fit=crop&q=80",
    ingredients: ["Milk", "Vermicelli", "Rose Syrup"]
  },
  {
    id: 20,
    name: "Jalebi",
    description: "Crispy spiral sweets in sugar syrup",
    price: 129,
    category: "desserts",
    isJain: true,
    image: "https://images.unsplash.com/photo-1589249975221-5870b4bc6b4f?auto=format&fit=crop&q=80",
    ingredients: ["Flour", "Sugar", "Saffron"]
  }
];