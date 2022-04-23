import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from './../../services/product.service';
import { EventsService } from './../../services/events.service';
import { Category } from './../../interfaces/category.interface';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  category!: string;
  subCategory!: string;
  categoryProducts: { product: Product; count: number }[] = [];
  categories!: Category;
  showPriceFilterContainer: boolean = false;
  minPrice: number = 10;
  maxPrice: number = 5000;
  currPrice: number = 5000;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private eventsService: EventsService,
    private productsService: ProductService
  ) {
    this.category = this.activatedRoute.snapshot.params['category'];
    this.subCategory = this.activatedRoute.snapshot.params['subcategory'];

    if (this.subCategory != 'all') {
      this.apiService
        .getProductsBasedOnSubCategory(this.category, this.subCategory)
        .subscribe((response) => {
          if (response.status == 'success')
            this.categoryProducts =
              this.productsService.mergeUserCartWithProducts(response.data);
        });
    } else {
      this.apiService
        .getProductsBasedOnCategory(this.category)
        .subscribe((response) => {
          if (response.status == 'success')
            this.categoryProducts =
              this.productsService.mergeUserCartWithProducts(response.data);
        });
    }

    this.apiService.getCategory(this.category).subscribe((response) => {
      if (response.status == 'success')
        this.categories = {
          name: response.data[0].name,
          subcategories: JSON.parse(response.data[0].subcategories),
        };
    });
  }

  ngOnInit(): void {
    this.eventsService.eventSubject.subscribe((eventData) => {
      if (eventData == 'end of product array') {
        document.querySelectorAll('.product-card').forEach((product: any) => {
          product.style.animation = 'productCardAnimator ease-in-out 500ms';
          product.style.animationFillMode = 'forwards';
          product.style.animationDelay = 'calc(0.1s * var(--i))';
        });
      }
    });

    this.activatedRoute.params.subscribe((param: Params) => {
      this.category = param['category'];
      this.subCategory = param['subcategory'];

      this.apiService.getCategory(this.category).subscribe((response) => {
        if (response.status == 'success')
          this.categories = {
            name: response.data[0].name,
            subcategories: JSON.parse(response.data[0].subcategories),
          };
      });
      if (this.subCategory != 'all') {
        this.apiService
          .getProductsBasedOnSubCategory(this.category, this.subCategory)
          .subscribe((response) => {
            if (response.status == 'success')
              this.categoryProducts =
                this.productsService.mergeUserCartWithProducts(response.data);
          });
      } else {
        this.apiService
          .getProductsBasedOnCategory(this.category)
          .subscribe((response) => {
            if (response.status == 'success')
              this.categoryProducts =
                this.productsService.mergeUserCartWithProducts(response.data);
          });
      }
    });
  }

  onPriceFilterClick() {
    this.showPriceFilterContainer = !this.showPriceFilterContainer;
  }

  // price filter functionality
  onPriceFilterApplyClick() {
    this.showPriceFilterContainer = false;
    if (this.subCategory != 'all') {
      this.apiService
        .getProductsBasedOnSubCategoryWithPriceRange(
          this.category,
          this.subCategory,
          this.minPrice,
          this.currPrice
        )
        .subscribe((response) => {
          if (response.status == 'success')
            this.categoryProducts =
              this.productsService.mergeUserCartWithProducts(response.data);
        });
    } else {
      this.apiService
        .getProductsBasedOnCategoryWithPriceRange(
          this.category,
          this.minPrice,
          this.currPrice
        )
        .subscribe((response) => {
          if (response.status == 'success')
            this.categoryProducts =
              this.productsService.mergeUserCartWithProducts(response.data);
        });
    }
  }
}
