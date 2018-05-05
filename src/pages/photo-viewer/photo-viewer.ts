import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';

declare var Swiper;

@IonicPage()
@Component({
  selector: 'page-photo-viewer',
  templateUrl: 'photo-viewer.html',
})
export class PhotoViewerPage {

  @ViewChild(Content)
  private content: Content;



  initialSlide: number;
  // 圖片
  picturePaths: string[] = [];


  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private viewController: ViewController
  ) {
    this.initialSlide = navParams.get('initialSlide') || 0;
    this.picturePaths = navParams.get('picturePaths');

  }

  ionViewDidLoad() {

    this.navCtrl.swipeBackEnabled = false;

    this.content.setElementClass('swiper-container', true);

    new Swiper(this.content.getScrollElement(), {
      initialSlide: this.initialSlide,//初始化显示第几个
      zoom: true,//双击,手势缩放
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
      }
    });

  }


}
