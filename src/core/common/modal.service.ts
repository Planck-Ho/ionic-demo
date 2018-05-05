import { Injectable } from '@angular/core';
import { ModalController, ModalOptions, Modal } from 'ionic-angular';
import { BackService } from './back.service';

@Injectable()
export class ModalService {

  constructor(
    private modalCtrl: ModalController,
    private backService: BackService,
  ) { }

  create(component: any, data?: any, opts?: ModalOptions): Modal {
    const modal = this.modalCtrl.create(component, data, opts);


    modal.onWillDismiss(() => {

      this.backService.unsubscribe();

    });



    this.backService.subscribe(() => {
      modal.dismiss();
    });

    return modal;
  }

}
