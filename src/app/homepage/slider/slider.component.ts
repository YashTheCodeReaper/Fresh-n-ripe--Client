import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    const sliders = document.querySelectorAll('.slider-box-component');
    const maxSlideCount = sliders.length;
    let slideCount = 0;

    const goToSlider = function (index: number) {
      sliders.forEach((slider: any, i: number) => {
        slider.style.transform = `translateY(${100 * (i - index)}%)`;
      });
    };

    goToSlider(0);

    setInterval(() => {
      if (slideCount >= maxSlideCount - 1) {
        slideCount = 0;
      } else {
        slideCount++;
      }
      goToSlider(slideCount);
    }, 4000);
  }
}
