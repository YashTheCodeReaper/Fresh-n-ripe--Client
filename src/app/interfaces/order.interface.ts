import { Product } from './product.interface';
import { Cart } from './user.interface';
export interface Order {
  id: string;
  userid: string;
  deliverymethod: string;
  protection: string;
  cart: { product: Product; count: number; productid: string }[];
}
