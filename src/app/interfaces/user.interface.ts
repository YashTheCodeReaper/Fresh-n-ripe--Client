export interface User {
  name: string;
  email: string;
  phone: string;
  picture: string;
  password: string;
  doorno: string;
  street: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  id: string;
  cart: Cart[];
}

export interface Cart {
  productid: string;
  count: number;
}
