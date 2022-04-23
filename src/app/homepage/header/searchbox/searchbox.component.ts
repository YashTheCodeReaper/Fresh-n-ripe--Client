import { Product } from './../../../interfaces/product.interface';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css'],
})
export class SearchboxComponent implements OnInit {
  allProducts: Product[] = [];
  searchString: string = '';
  showRenderBox: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  onSearchInput() {
    if (this.searchString.length > 2)
      this.apiService
        .productsSearchFilter(this.searchString)
        .subscribe((response) => {
          this.allProducts = response.data;
        });
    else this.allProducts = [];
  }

  onFocus() {
    this.showRenderBox = true;
  }

  onFocusOut() {
    setTimeout(() => {
      this.showRenderBox = false;
    }, 200);
  }
}
