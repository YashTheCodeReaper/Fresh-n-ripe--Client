import { EventsService } from './../../services/events.service';
import { ProductService } from './../../services/product.service';
import { ApiService } from './../../services/api.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  cartProductsWithCount: { product: Product; count: number }[] = [];
  addProtection: boolean = this.userService.addProtection;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private productService: ProductService,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    // Update on every cart updation event
    this.getCart();
    this.eventsService.eventSubject.subscribe((eventData) => {
      if (eventData == 'cart update') this.getCart();
    });
  }

  getCart() {
    // upon every function call, update the products with cart
    if (this.userService.user) {
      this.cartProducts = [];
      this.userService.user.cart.forEach((cart) => {
        this.apiService.getProduct(cart.productid).subscribe(
          (response) => {
            if (cart.count > 0) {
              this.cartProducts.push(response.data[0]);
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            this.cartProductsWithCount =
              this.productService.mergeUserCartWithProducts(this.cartProducts);
          }
        );
      });
    }
  }

  // upon adding item to cart
  onAddItem(productId: string, count: number) {
    count++;
    this.productService.modifyUserCart(productId, count);
  }

  // upon removing item from cart
  onRemoveItem(productId: string, count: number) {
    count--;
    this.productService.modifyUserCart(productId, count);
  }

  // upon deleting item from cart
  onDeleteItem(productId: string, count: number) {
    count = 0;
    this.productService.modifyUserCart(productId, count);
  }

  // calculating sub total
  getSubTotal() {
    let subTotal = 0;
    this.cartProductsWithCount.forEach((cartItem) => {
      if (cartItem.count > 0)
        subTotal += cartItem.product.price * cartItem.count;
    });
    if (this.addProtection) {
      return subTotal + 75;
    }
    return subTotal;
  }

  // append protection functionality
  appendProtection() {
    this.addProtection = !this.addProtection;
    this.userService.addProtection = !this.userService.addProtection;
  }
}
