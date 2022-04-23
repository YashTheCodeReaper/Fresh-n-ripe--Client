export interface Product {
  name: string;
  image: string;
  mrp: number;
  price: number;
  category: string;
  subcategory: string;
  rating: number;
  reviews: Review[];
  description: string;
  isFeatured: boolean;
  id: string;
  quantity: string;
}

export interface Review {
  name: string;
  image: string;
  rating: number;
  description: string;
}
