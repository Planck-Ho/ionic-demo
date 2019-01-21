import { ToastService } from './../../core/common/toast.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    private navCtrl: NavController,
    private events: Events,
    private toastService: ToastService
  ) {}

  goPhotoViewer() {
    this.navCtrl.push('PhotoViewerPage', {
      picturePaths: [
        'assets/imgs/1.jpg',
        'assets/imgs/2.jpg',
        'assets/imgs/3.jpg',
        'assets/imgs/4.jpg'
      ],
      initialSlide: 0
    });
  }

  scanner() {
    this.navCtrl.push('ScannerPage');
    this.events.subscribe('scanned', code => {
      if (code) this.toastService.presentToast(`code:${code}`);
    });
  }

  goGaoDeMap() {
    this.navCtrl.push('PositionViewerPage', {
      // 纬度
      latitude: 39.916527,
      // 经度
      longitude: 116.397128
    });
  }
}
