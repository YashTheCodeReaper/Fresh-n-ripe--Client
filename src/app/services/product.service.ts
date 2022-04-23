import { EventsService } from './events.service';
import { ApiService } from './api.service';
import { Cart } from './../interfaces/user.interface';
import { UserService } from './user.service';
import { Product } from 'src/app/interfaces/product.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private eventsService: EventsService
  ) {}

  mergeUserCartWithProducts(productsArray: Product[]) {
    let mergedProductsArray: { product: Product; count: number }[] = [];
    productsArray.forEach((product) => {
      let index = undefined;
      this.userService.user?.cart.forEach((cart: Cart, i: number) => {
        if (cart.productid == product.id) {
          index = i;
          return;
        }
      });

      if (index != undefined) {
        mergedProductsArray.push({
          product: product,
          count: Number(this.userService.user?.cart[index].count),
        });
      } else {
        mergedProductsArray.push({
          product: product,
          count: 0,
        });
      }
    });
    return mergedProductsArray;
  }

  modifyUserCart(productId: string, count: number) {
    if (this.userService.user) {
      let index = undefined;
      this.userService.user.cart.forEach((cart: Cart, i: number) => {
        if (cart.productid == productId) {
          index = i;
          return;
        }
      });
      if (index != undefined) {
        this.userService.user.cart[index] = {
          productid: productId,
          count: count,
        };
      } else {
        this.userService.user.cart.push({
          productid: productId,
          count: count,
        });
      }

      this.apiService
        .updateUserCart(this.userService.user.cart, this.userService.user.id)
        .subscribe(
          () => {},
          (error) => {
            console.log(error);
          },
          () => {
            this.userService.validateLogin();
          }
        );
    }
  }
}
