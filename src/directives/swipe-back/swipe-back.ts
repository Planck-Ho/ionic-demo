import { Directive, ElementRef } from '@angular/core';
import { Gesture, NavController } from 'ionic-angular';

declare var Hammer: any

@Directive({
  selector: '[swipe-back]' // Attribute selector
})
export class SwipeBackDirective {



  private el: any;

  private swipeGesture: Gesture;


  constructor(
    private navCtrl: NavController,
    el: ElementRef,
  ) {
    this.el = el.nativeElement;
  }

  ngOnInit() {

    this.swipeGesture = new Gesture(this.el.firstElementChild.nextSibling, {
      recognizers: [
        [Hammer.Swipe, { direction: Hammer.DIRECTION_RIGHT }]
      ]
    });
    this.swipeGesture.listen();
    this.swipeGesture.on('swiperight', () => {

      if (this.navCtrl.canGoBack()) this.navCtrl.pop();

    });

  }



  ngOnDestroy() {
    this.swipeGesture.destroy();
  }
}
