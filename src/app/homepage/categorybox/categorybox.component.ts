import { Category } from './../../interfaces/category.interface';
import { ApiService } from './../../services/api.service';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorybox',
  templateUrl: './categorybox.component.html',
  styleUrls: ['./categorybox.component.css'],
})
export class CategoryboxComponent implements OnInit {
  allCategories: Category[] = [];

  constructor(private apiService: ApiService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.apiService.getAllCategories().subscribe((response) => {
      this.allCategories = response.data.map((category: Category) => {
        return {
          name: category.name,
          subcategories: JSON.parse(category.subcategories.toString()),
        };
      });
    });
  }

  onCategoryEvent(dropdownName: string) {
    const categoryComponent: any = (<HTMLElement>(
      this.elementRef.nativeElement
    )).querySelector(`.dropdown-${dropdownName}`);

    categoryComponent.classList.toggle('visible');
  }
}
