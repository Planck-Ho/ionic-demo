import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Tabs } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { StatusBar } from '@ionic-native/status-bar';
import { ToastService } from '../../core/common/toast.service';



@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage implements OnDestroy {

  qrScannerStatus: QRScannerStatus;

  private scanSub: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private qrScanner: QRScanner,
    private events: Events,
    private statusBar: StatusBar,
    private toastService: ToastService
  ) {
  }

  ionViewWillEnter() {



    (this.navCtrl.parent as Tabs).setTabbarHidden(true);

    document.body.classList.add('scanner');

    this.statusBar.hide();

  }

  ionViewDidLeave() {
    this.events.publish('scanned', null);
  }




  ionViewDidLoad() {


    this.init();
  }

  private async init(): Promise<void> {

    try {

      this.qrScannerStatus = await this.qrScanner.prepare();


      if (this.qrScannerStatus.authorized) {

        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
          this.events.publish('scanned', text)

          let audio = new Audio('assets/audio/scanner.mp3');

          audio.play().then(() => {

            this.qrScanner.hide(); // hide camera preview
            this.scanSub.unsubscribe(); // stop scanning

            this.navCtrl.pop({
              animation: 'md-transition'
            });

            audio = null;
          });


        });

        // show camera preview
        this.qrScanner.show();
      }


    } catch (err) {
      console.error(err);



      if (err.code === 1) {
        this.toastService.presentToast('請允許訪問相機權限')
          .onDidDismiss(() => {
            this.qrScanner.openSettings();
          });
      } else {
        this.toastService.presentToast('請允許訪問相機權限', 1000)
          .onDidDismiss(() => {
            this.navCtrl.pop();
          });
      }

    }

  }

  ngOnDestroy() {
    if (this.scanSub) this.scanSub.unsubscribe();
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }

  ionViewWillLeave() {
    document.body.classList.remove('scanner');


    (this.navCtrl.parent as Tabs).setTabbarHidden(false);
    this.statusBar.show();
  }


  async toggleLight(): Promise<void> {

    this.qrScannerStatus = this.qrScannerStatus.lightEnabled ?
      await this.qrScanner.disableLight() :
      await this.qrScanner.enableLight();

  }
  // async toggleCamera(): Promise<void> {
  //   this.qrScannerStatus = !!this.qrScannerStatus.currentCamera ?
  //     await this.qrScanner.useBackCamera() :
  //     await this.qrScanner.useFrontCamera();
  // }

}
