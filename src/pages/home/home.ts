import { BackService } from './../../core/common/back.service';
import { ActionSheetService } from './../../core/common/action-sheet.service';
import { ToastService } from './../../core/common/toast.service';
import { Component } from '@angular/core';
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
    private toastService: ToastService,
    private actionSheetService: ActionSheetService,
    private backService: BackService
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
    this.events.subscribe('scan-completed', code => {
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

  presentActionSheet() {
    let actionSheet = this.actionSheetService.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }
}
