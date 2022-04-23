import { ProductService } from './../../services/product.service';
import { EventsService } from './../../services/events.service';
import { Product } from './../../interfaces/product.interface';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featurettes',
  templateUrl: './featurettes.component.html',
  styleUrls: ['./featurettes.component.css'],
})
export class FeaturettesComponent implements OnInit {
  allFeaturedProducts: { product: Product; count: number }[] = [];

  constructor(
    private apiService: ApiService,
    private eventsService: EventsService,
    private productService: ProductService
  ) {
    this.apiService.getAllFeaturedProducts().subscribe((response) => {
      if (response.status == 'success') {
        this.allFeaturedProducts =
          this.productService.mergeUserCartWithProducts(response.data);
      }
    });
  }

  ngOnInit(): void {
    this.eventsService.eventSubject.subscribe((eventData) => {
      if (eventData == 'end of product array') {
        this.startIntersectionObserver();
      }
    });
  }

  startIntersectionObserver() {
    const featuretteGrid: any = document.querySelector('.featurettes-grid');
    const productCard: any = document.querySelectorAll('.product-card');
    const exoticFruits: any = document.querySelector('.exotic-fruits');
    const exoticVeggies: any = document.querySelector('.exotic-vegetables');
    const organicFoods: any = document.querySelector('.organic-foods');
    const exoticFlexHeadersFruits: any = document.querySelectorAll(
      '.exotic-header-flex-header-fruits'
    );
    const exoticFlexHeadersVeggies: any = document.querySelectorAll(
      '.exotic-header-flex-header-veggies'
    );
    const exoticFlexHeadersOrganics: any = document.querySelectorAll(
      '.exotic-header-flex-header-organics'
    );
    const leftSubHeadersFruits: any = document.querySelector(
      '.left-sub-header-fruits'
    );
    const rightSubHeadersFruits: any = document.querySelector(
      '.right-sub-header-fruits'
    );
    const leftSubHeadersVeggies: any = document.querySelector(
      '.left-sub-header-veggies'
    );
    const rightSubHeadersVeggies: any = document.querySelector(
      '.right-sub-header-veggies'
    );
    const leftSubHeadersOrganics: any = document.querySelector(
      '.left-sub-header-organics'
    );
    const rightSubHeadersOrganics: any = document.querySelector(
      '.right-sub-header-organics'
    );

    const featuretteSectionSlideup = function (entries: any, observer: any) {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      else {
        productCard.forEach((featurette: any) => {
          featurette.style.animation = 'productCardAnimator ease-in-out 500ms';
          featurette.style.animationFillMode = 'forwards';
          featurette.style.animationDelay = 'calc(0.1s * var(--i))';
        });
      }
    };

    const exoticFruitsSectionSlideup = function (entries: any, observer: any) {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      else {
        exoticFlexHeadersFruits.forEach((exoticFlexHeader: any) => {
          exoticFlexHeader.style.animation =
            'exoticHeaderAnimator ease-in-out 600ms';
          exoticFlexHeader.style.animationFillMode = 'forwards';
          exoticFlexHeader.style.animationDelay = 'calc(0.1s * var(--i))';
        });

        leftSubHeadersFruits.style.animation =
          'exoticHeaderAnimator ease-in-out 600ms';
        leftSubHeadersFruits.style.animationFillMode = 'forwards';
        leftSubHeadersFruits.style.animationDelay = 'calc(0.1s * var(--i))';

        rightSubHeadersFruits.style.animation =
          'exoticHeaderAnimator ease-in-out 600ms';
        rightSubHeadersFruits.style.animationFillMode = 'forwards';
        rightSubHeadersFruits.style.animationDelay = 'calc(0.1s * var(--i))';
      }
    };

    const exoticVeggiesSectionSlideup = function (entries: any, observer: any) {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      else {
        exoticFlexHeadersVeggies.forEach((exoticFlexHeader: any) => {
          exoticFlexHeader.style.animation =
            'exoticHeaderAnimator ease-in-out 600ms';
          exoticFlexHeader.style.animationFillMode = 'forwards';
          exoticFlexHeader.style.animationDelay = 'calc(0.1s * var(--i))';
        });

        leftSubHeadersVeggies.style.animation =
          'exoticHeaderAnimator ease-in-out 600ms';
        leftSubHeadersVeggies.style.animationFillMode = 'forwards';
        leftSubHeadersVeggies.style.animationDelay = 'calc(0.1s * var(--i))';

        rightSubHeadersVeggies.style.animation =
          'exoticHeaderAnimator ease-in-out 600ms';
        rightSubHeadersVeggies.style.animationFillMode = 'forwards';
        rightSubHeadersVeggies.style.animationDelay = 'calc(0.1s * var(--i))';
      }
    };

    const exoticOrganicsSectionSlideup = function (
      entries: any,
      observer: any
    ) {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      else {
        exoticFlexHeadersOrganics.forEach((exoticFlexHeader: any) => {
          exoticFlexHeader.style.animation =
            'exoticHeaderAnimator ease-in-out 600ms';
          exoticFlexHeader.style.animationFillMode = 'forwards';
          exoticFlexHeader.style.animationDelay = 'calc(0.1s * var(--i))';
        });

        leftSubHeadersOrganics.style.animation =
          'exoticHeaderAnimator ease-in-out 600ms';
        leftSubHeadersOrganics.style.animationFillMode = 'forwards';
        leftSubHeadersOrganics.style.animationDelay = 'calc(0.1s * var(--i))';

        rightSubHeadersOrganics.style.animation =
          'exoticHeaderAnimator ease-in-out 600ms';
        rightSubHeadersOrganics.style.animationFillMode = 'forwards';
        rightSubHeadersOrganics.style.animationDelay = 'calc(0.1s * var(--i))';
      }
    };

    const featuretteSection = new IntersectionObserver(
      featuretteSectionSlideup,
      {
        root: null,
        threshold: 0.02,
      }
    );

    const exoticFruitsSection = new IntersectionObserver(
      exoticFruitsSectionSlideup,
      {
        root: null,
        threshold: 0.5,
      }
    );

    const exoticVegetablesSection = new IntersectionObserver(
      exoticVeggiesSectionSlideup,
      {
        root: null,
        threshold: 0.5,
      }
    );

    const OrganicFoodsSection = new IntersectionObserver(
      exoticOrganicsSectionSlideup,
      {
        root: null,
        threshold: 0.5,
      }
    );

    if (featuretteGrid) featuretteSection.observe(featuretteGrid);
    if (exoticFruits) exoticFruitsSection.observe(exoticFruits);
    if (exoticVeggies) exoticVegetablesSection.observe(exoticVeggies);
    if (organicFoods) OrganicFoodsSection.observe(organicFoods);
  }
}
