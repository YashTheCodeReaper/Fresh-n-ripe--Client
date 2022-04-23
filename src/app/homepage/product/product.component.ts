import { ProductService } from './../../services/product.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Input() i!: number;
  @Input() endIndex!: number;
  @Input() count!: number;
  disableButton: boolean = false;

  constructor(
    private eventsService: EventsService,
    private userService: UserService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.i + 1 == this.endIndex) {
      this.eventsService.eventSubject.next('end of product array');
    }
  }

  onItemAdd() {
    if (this.userService.isLogged) {
      this.count++;
      this.productService.modifyUserCart(this.product.id, this.count);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onItemRemove() {
    if (this.userService.isLogged) {
      this.count--;
      this.productService.modifyUserCart(this.product.id, this.count);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
