import { Directive, Self, Input, OnChanges } from '@angular/core';
import { Slides } from 'ionic-angular';

@Directive({
  selector: 'ion-slides[lock-slides]'
})
export class LockSlidesDirective implements OnChanges {
  @Input('lock-slides')
  private enableSwipe: number;

  constructor(@Self() private slides: Slides) {}

  ngOnChanges(): void {
    if (this.enableSwipe === 1) {
      // 解锁手势滑动slide
      this.slides.onlyExternal = false;
      this.slides.shortSwipes = true;
    }
  }
}
