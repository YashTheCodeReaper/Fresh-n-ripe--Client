import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './../../../interfaces/user.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { ApiService } from './../../../services/api.service';
import { UserService } from './../../../services/user.service';
import { EventsService } from './../../../services/events.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  user!: User;
  showContactInformationForm: boolean = true;
  showDeliveryInformationForm: boolean = true;
  showShipmentInformationForm: boolean = true;
  deliveryMethod!: string | undefined;
  totalAmount: number = 0;
  totalMrp: number = 0;
  totalProductCount: number = 0;
  protectionRequired!: boolean;
  orderError: boolean = false;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private route: Router
  ) {
    // get user information
    if (this.userService.user) this.user = this.userService.user;
  }

  ngOnInit(): void {
    // match protection from user service
    this.protectionRequired = this.userService.addProtection;
    // initial form position
    this.goBackToContactInformationForm();
    // calculate total amount, total mrp, total product count
    this.user.cart.forEach((cart) => {
      if (cart.count > 0) {
        this.apiService.getProduct(cart.productid).subscribe((response) => {
          if (response.status == 'success') {
            this.totalAmount += response.data[0].price * cart.count;
            this.totalMrp += response.data[0].mrp * cart.count;
            this.totalProductCount++;
          }
        });
      }
    });
    // if there is protection required add 75 to the total amount
    if (this.protectionRequired) {
      this.totalAmount += 75;
    }
    // mark the initial deliveryMethod as undefined
    this.deliveryMethod = undefined;
  }

  // shipment toggler
  chooseShipment(deliveryMethod: string) {
    document.querySelectorAll('.ups').forEach((ups) => {
      ups.classList.remove('icon-active');
    });
    document.querySelector(`.${deliveryMethod}`)?.classList.add('icon-active');
    this.deliveryMethod = deliveryMethod;
  }

  goBackToContactInformationForm() {
    this.showContactInformationForm = true;
    this.showDeliveryInformationForm = false;
    this.showShipmentInformationForm = false;
    document.querySelectorAll('.step').forEach((step) => {
      step.classList.remove('shadow-step');
    });
    document.querySelector('.step-delivery')?.classList.add('shadow-step');
    document.querySelector('.step-shipment')?.classList.add('shadow-step');
    this.deliveryMethod = undefined;
  }

  proceedFromContactInformationForm() {
    this.showContactInformationForm = false;
    this.showDeliveryInformationForm = true;
    this.showShipmentInformationForm = false;
    document.querySelectorAll('.step').forEach((step) => {
      step.classList.remove('shadow-step');
    });
    document.querySelector('.step-contact')?.classList.add('shadow-step');
    document.querySelector('.step-shipment')?.classList.add('shadow-step');
    this.deliveryMethod = undefined;
  }

  proceedFromDeliveryInformationForm() {
    this.showContactInformationForm = false;
    this.showDeliveryInformationForm = false;
    this.showShipmentInformationForm = true;
    document.querySelectorAll('.step').forEach((step) => {
      step.classList.remove('shadow-step');
    });
    document.querySelector('.step-delivery')?.classList.add('shadow-step');
    document.querySelector('.step-contact')?.classList.add('shadow-step');
    this.deliveryMethod = undefined;
  }

  // send order to the backend
  confirmOrder() {
    if (this.deliveryMethod != undefined) {
      this.apiService
        .confirmUserOrder(
          this.user.id,
          JSON.stringify(this.user.cart),
          this.deliveryMethod,
          this.userService.addProtection.toString()
        )
        .subscribe((response) => {
          if (response.status == 'success') {
            this.orderError = false;
            this.apiService
              .updateUserCart([], this.user.id)
              .subscribe((response) => {
                if (response.status == 'success') {
                  this.orderError = false;
                  this.userService.validateLogin();
                  this.route.navigate(['/']);
                } else {
                  this.orderError = true;
                }
              });
          } else {
            this.orderError = true;
          }
        });
    }
  }
}
