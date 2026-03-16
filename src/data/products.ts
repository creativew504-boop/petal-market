export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  unit: string;
  badge?: string;
  isNew?: boolean;
  isTrending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  { id: "fruits", name: "Fresh Fruits", icon: "🍎", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80", count: 48 },
  { id: "vegetables", name: "Vegetables", icon: "🥦", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80", count: 62 },
  { id: "dairy", name: "Dairy & Eggs", icon: "🥛", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&q=80", count: 35 },
  { id: "bakery", name: "Bakery", icon: "🍞", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80", count: 28 },
  { id: "meat", name: "Meat & Seafood", icon: "🥩", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&q=80", count: 41 },
  { id: "beverages", name: "Beverages", icon: "🥤", image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400&q=80", count: 54 },
  { id: "snacks", name: "Snacks", icon: "🍿", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80", count: 39 },
  { id: "organic", name: "Organic", icon: "🌿", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80", count: 33 },
];

export const products: Product[] = [
  {
    id: "1", title: "Organic Avocados", description: "Perfectly ripe organic Hass avocados, sourced from local farms.", price: 4.99, originalPrice: 6.99, discount: 29, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=80", category: "fruits", rating: 4.8, reviewCount: 124, stock: 50, unit: "pack of 4", badge: "Best Seller", isTrending: true,
  },
  {
    id: "2", title: "Fresh Strawberries", description: "Sweet, juicy strawberries picked at peak ripeness.", price: 3.49, originalPrice: 4.99, discount: 30, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80", category: "fruits", rating: 4.9, reviewCount: 89, stock: 30, unit: "lb", badge: "Organic",
  },
  {
    id: "3", title: "Baby Spinach", description: "Tender baby spinach leaves, triple-washed and ready to eat.", price: 2.99, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80", category: "vegetables", rating: 4.7, reviewCount: 67, stock: 80, unit: "6 oz bag", isNew: true,
  },
  {
    id: "4", title: "Free-Range Eggs", description: "Farm-fresh free-range eggs from pasture-raised hens.", price: 5.99, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=80", category: "dairy", rating: 4.9, reviewCount: 203, stock: 100, unit: "dozen", badge: "Farm Fresh",
  },
  {
    id: "5", title: "Sourdough Bread", description: "Artisan sourdough bread, slow-fermented for 24 hours.", price: 6.49, image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&q=80", category: "bakery", rating: 4.8, reviewCount: 156, stock: 25, unit: "loaf", isTrending: true,
  },
  {
    id: "6", title: "Atlantic Salmon", description: "Wild-caught Atlantic salmon fillets, sustainably sourced.", price: 12.99, originalPrice: 15.99, discount: 19, image: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400&q=80", category: "meat", rating: 4.7, reviewCount: 98, stock: 15, unit: "lb",
  },
  {
    id: "7", title: "Greek Yogurt", description: "Creamy Greek yogurt, high in protein and probiotics.", price: 1.99, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80", category: "dairy", rating: 4.6, reviewCount: 312, stock: 200, unit: "6 oz", isNew: true,
  },
  {
    id: "8", title: "Organic Bananas", description: "Perfectly yellow organic bananas, great for smoothies.", price: 0.69, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80", category: "fruits", rating: 4.5, reviewCount: 445, stock: 150, unit: "each", badge: "Organic",
  },
  {
    id: "9", title: "Almond Milk", description: "Unsweetened almond milk, fortified with calcium and vitamin D.", price: 3.99, image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=400&q=80", category: "beverages", rating: 4.4, reviewCount: 178, stock: 60, unit: "64 oz",
  },
  {
    id: "10", title: "Mixed Berries", description: "A mix of blueberries, raspberries, and blackberries.", price: 5.49, originalPrice: 7.99, discount: 31, image: "https://images.unsplash.com/photo-1596591868264-4ef1c79e0a30?w=400&q=80", category: "fruits", rating: 4.8, reviewCount: 91, stock: 40, unit: "12 oz", badge: "Deal",
  },
  {
    id: "11", title: "Broccoli Crowns", description: "Fresh broccoli crowns, perfect for steaming or roasting.", price: 1.99, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80", category: "vegetables", rating: 4.5, reviewCount: 55, stock: 90, unit: "lb",
  },
  {
    id: "12", title: "Granola Bars", description: "Crunchy oat and honey granola bars, perfect on-the-go snack.", price: 4.29, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80", category: "snacks", rating: 4.3, reviewCount: 210, stock: 120, unit: "box of 6",
  },
];
