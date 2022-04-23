import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { ProductService } from './../../services/product.service';
import { ApiService } from './../../services/api.service';
import { Product, Review } from './../../interfaces/product.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent implements OnInit {
  product!: { product: Product; count: number }[];
  productReview: Review[] = [];
  showReviewForm: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private productService: ProductService,
    private userService: UserService
  ) {}

  reviewForm = new FormGroup({
    description: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.apiService
        .getProduct(this.activatedRoute.snapshot.params['id'])
        .subscribe((response) => {
          if (response.status == 'success') {
            this.product = this.productService.mergeUserCartWithProducts(
              response.data
            );
            this.productReview = JSON.parse(
              response.data[0].reviews.toString()
            );
          }
        });
    });
  }

  onItemAdd() {
    if (this.userService.isLogged) {
      this.product[0].count++;
      this.productService.modifyUserCart(
        this.product[0].product.id,
        this.product[0].count
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  onItemRemove() {
    if (this.userService.isLogged) {
      this.product[0].count--;
      this.productService.modifyUserCart(
        this.product[0].product.id,
        this.product[0].count
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  reviewFunction() {
    if (this.showReviewForm) {
      if (this.reviewForm.valid) {
        let totalRating = 0;
        this.productReview.forEach((review) => {
          totalRating += review.rating;
        });
        let avgRating =
          (totalRating + this.reviewForm.value.rating) /
          (1 + this.productReview.length);

        this.productReview.push({
          name: this.userService.user?.name || '',
          image: this.userService.user?.picture || '',
          description: this.reviewForm.value.description,
          rating: this.reviewForm.value.rating,
        });

        this.apiService
          .updateRatingReview(
            this.product[0].product.id,
            avgRating,
            JSON.stringify(this.productReview)
          )
          .subscribe();
      }
    }
    this.showReviewForm = !this.showReviewForm;
  }
}
