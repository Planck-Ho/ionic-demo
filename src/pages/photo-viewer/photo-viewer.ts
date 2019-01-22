import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Content,
  Tabs
} from 'ionic-angular';

declare var Swiper;

@IonicPage()
@Component({
  selector: 'page-photo-viewer',
  templateUrl: 'photo-viewer.html'
})
export class PhotoViewerPage {
  @ViewChild(Content)
  private content: Content;

  initialSlide: number;
  picturePaths: string[] = [];

  constructor(navParams: NavParams, private navCtrl: NavController) {
    this.initialSlide = navParams.get('initialSlide') || 0;
    this.picturePaths = navParams.get('picturePaths');
  }

  ionViewWillEnter() {
    (this.navCtrl.parent as Tabs).setTabbarHidden(true);
  }

  ionViewWillLeave() {
    (this.navCtrl.parent as Tabs).setTabbarHidden(false);
  }

  ionViewDidLoad() {
    this.navCtrl.swipeBackEnabled = false;

    this.content.setElementClass('swiper-container', true);

    new Swiper(this.content.getScrollElement(), {
      initialSlide: this.initialSlide,
      zoom: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
      }
    });
  }
}
