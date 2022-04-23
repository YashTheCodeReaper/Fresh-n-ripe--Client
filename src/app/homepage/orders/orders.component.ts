import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';
import { Order } from 'src/app/interfaces/order.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  allOrders: Order[] = [];
  totalAmount: number = 0;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {
    if (this.userService.user)
      this.apiService.getUserOrders(this.userService.user.id).subscribe(
        (response) => {
          response.data.forEach((order: any) => {
            this.allOrders.push({
              id: order.id,
              userid: order.userid,
              deliverymethod: order.deliverymethod,
              cart: JSON.parse(order.cart.toString()),
              protection: order.protection,
            });
          });
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.allOrders.forEach((order: Order, orderIndex: number) => {
            order.cart.forEach((cart: any, cartIndex: number) => {
              let product: any;
              this.apiService.getProduct(cart.productid).subscribe(
                (response) => {
                  if (response.status == 'success') product = response.data[0];
                },
                (error) => {
                  console.log(error);
                },
                () => {
                  this.allOrders[orderIndex].cart[cartIndex].product = product;
                  this.allOrders[orderIndex].cart[cartIndex].count = cart.count;
                  this.totalAmount += product.price * cart.count;
                }
              );
            });
          });
        }
      );
  }

  onDeleteOrder(id: string) {
    this.apiService.deleteUserOrder(id).subscribe((response) => {
      if ((response.status = 'success')) {
        this.router.navigate(['/']);
      }
    });
  }
}
