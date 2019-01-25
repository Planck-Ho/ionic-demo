import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, Alert } from 'ionic-angular';
import { BackService } from './back.service';

@Injectable()
export class AlertService {
  constructor(
    private alertCtrl: AlertController,
    private backService: BackService
  ) {}

  create(options?: AlertOptions): Alert {
    const alert: Alert = this.alertCtrl.create(options);

    alert.onWillDismiss(() => {
      this.backService.unsubscribe();
    });

    this.backService.subscribe(() => {
      alert.dismiss();
    });

    return alert;
  }
}
