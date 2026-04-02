export interface Category {
  id: number;
  name: string;
  image: string;
  slug?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  thumbnail?: string; // Optional for backward compatibility/helper
  rating?: number;    // Optional, Platzi doesn't provide
  stock?: number;     // Optional, Platzi doesn't provide
  brand?: string;     // Optional, Platzi doesn't provide
}
