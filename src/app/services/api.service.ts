import { User, Cart } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = 'https://freshnripe-api.herokuapp.com';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllCategories`);
  }

  getCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getACategory/${category}`);
  }

  getAllFeaturedProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllFeaturedProducts`);
  }

  getProductsBasedOnSubCategory(
    category: string,
    subcategory: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getProductsBasedOnSubCategory/${category}/${subcategory}`
    );
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProduct/${id}`);
  }

  getProductsBasedOnCategory(category: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getProductsBasedOnCategory/${category}`
    );
  }

  getProductsBasedOnSubCategoryWithPriceRange(
    category: string,
    subcategory: string,
    minPrice: number,
    maxPrice: number
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getProductsBasedOnSubCategory/${category}/${subcategory}/${minPrice}/${maxPrice}`
    );
  }

  getProductsBasedOnCategoryWithPriceRange(
    category: string,
    minPrice: number,
    maxPrice: number
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getProductsBasedOnCategory/${category}/${minPrice}/${maxPrice}`
    );
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllProducts`);
  }

  checkEmailExistance(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/checkEmailExistance/${email}`);
  }

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerUser`, user);
  }

  validateUser(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/validateUserLogin/${token}`);
  }

  loginUser(userCred: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginUser`, userCred);
  }

  updateUserCart(cart: Cart[], id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateUserCart/${id}`, {
      cart: JSON.stringify(cart),
    });
  }

  confirmUserOrder(
    userid: string,
    cart: string,
    deliveryMethod: string,
    protection: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirmOrder`, {
      userid,
      cart,
      deliveryMethod,
      protection,
    });
  }

  getUserOrders(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getUserOrders/${id}`);
  }

  deleteUserOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteUserOrder/${id}`);
  }

  productsSearchFilter(searchString: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/filterProductsSearch/${searchString}`);
  }

  updateRatingReview(
    productid: string,
    rating: number,
    reviews: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateReviewRating/${productid}`, {
      rating,
      reviews,
    });
  }
}
