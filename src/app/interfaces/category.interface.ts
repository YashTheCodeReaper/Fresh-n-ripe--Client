export interface Category {
  name: string;
  subcategories: SubCategory[];
}

interface SubCategory {
  name: string;
  image: string;
}
