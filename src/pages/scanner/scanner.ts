import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  Tabs
} from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { StatusBar } from '@ionic-native/status-bar';
import { ToastService } from '../../core/common/toast.service';

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html'
})
export class ScannerPage {
  qrScannerStatus: QRScannerStatus;

  private scanSub: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private qrScanner: QRScanner,
    private events: Events,
    private statusBar: StatusBar,
    private toastService: ToastService
  ) {}

  ionViewWillEnter() {
    (this.navCtrl.parent as Tabs).setTabbarHidden(true);
    document.body.classList.add('scanner');
    this.statusBar.hide();
  }

  ionViewWillLeave() {
    document.body.classList.remove('scanner');

    (this.navCtrl.parent as Tabs).setTabbarHidden(false);
    this.statusBar.show();
  }

  ionViewDidLoad() {
    this.init();
  }

  ionViewWillUnload() {
    if (this.scanSub) this.scanSub.unsubscribe();
    this.qrScanner.hide();
    this.qrScanner.destroy();
    this.events.publish('scan-completed', null);
    this.events.unsubscribe('scan-completed');
  }

  private async init(): Promise<void> {
    try {
      this.qrScannerStatus = await this.qrScanner.prepare();

      if (this.qrScannerStatus.authorized) {
        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
          this.events.publish('scan-completed', text);

          let audio = new Audio('assets/audio/scanner.mp3');

          audio.play().then(() => {
            this.navCtrl.pop({
              animation: 'md-transition'
            });

            audio = null;
          });
        });

        this.qrScanner.show();
      }
    } catch (err) {
      console.error(err);

      if (err.code === 1) {
        this.toastService
          .presentToast('请允许访问相机权限')
          .onDidDismiss(() => {
            this.qrScanner.openSettings();
          });
      } else {
        this.toastService
          .presentToast('请允许访问相机权限', 1000)
          .onDidDismiss(() => {
            this.navCtrl.pop();
          });
      }
    }
  }

  async toggleLight(): Promise<void> {
    this.qrScannerStatus = this.qrScannerStatus.lightEnabled
      ? await this.qrScanner.disableLight()
      : await this.qrScanner.enableLight();
  }
}
