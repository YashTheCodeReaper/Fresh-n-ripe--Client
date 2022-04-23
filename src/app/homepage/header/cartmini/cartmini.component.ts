import { Product } from 'src/app/interfaces/product.interface';
import { ApiService } from './../../../services/api.service';
import { EventsService } from 'src/app/services/events.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartmini',
  templateUrl: './cartmini.component.html',
  styleUrls: ['./cartmini.component.css'],
})
export class CartminiComponent implements OnInit {
  isLogged: boolean = false;
  totalAmount: number = 0;
  showCartContainer: boolean = false;
  totalCartCount: number = 0;
  cartProducts: Product[] = [];

  constructor(
    private userService: UserService,
    private eventsService: EventsService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.userService.isLogged;
    if (this.isLogged) {
      this.getCartStats();
    }
    this.eventsService.eventSubject.subscribe((eventData) => {
      if (eventData == 'cart update') {
        this.getCartStats();
      }
    });
  }

  getCartStats() {
    if (this.userService.user) {
      this.totalAmount = 0;
      this.totalCartCount = 0;
      this.cartProducts = [];
      this.userService.user.cart.forEach((cart) => {
        this.apiService.getProduct(cart.productid).subscribe((response) => {
          if (cart.count > 0) {
            this.totalAmount += response.data[0].price * cart.count;
            this.totalCartCount++;
            this.cartProducts.push(response.data[0]);
          }
        });
      });
    }
  }

  toggleCartContainer() {
    if (this.totalAmount > 0) this.showCartContainer = !this.showCartContainer;
  }

  hideContainer() {
    this.showCartContainer = false;
  }
}
