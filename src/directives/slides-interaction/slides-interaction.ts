import { Directive, Self, AfterViewInit } from '@angular/core';
import { Slides } from 'ionic-angular';

// 设置轮播图滑动后继续自动轮播指令
@Directive({
  selector: '[slides-interaction]' // Attribute selector
})
export class SlidesInteractionDirective implements AfterViewInit {



  constructor(
    @Self() private slides: Slides
  ) {

  }


  ngAfterViewInit() {
    this.slides.autoplayDisableOnInteraction = false;
  }
}
