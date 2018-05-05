import { Injectable } from '@angular/core';
import { PopoverController, PopoverOptions, Popover } from 'ionic-angular';
import { BackService } from './back.service';

@Injectable()
export class PopoverService {

  constructor(
    private popoverCtrl: PopoverController,
    private backService: BackService,

  ) { }

  create(component: any, data?: {}, opts?: PopoverOptions): Popover {

    const popover = this.popoverCtrl.create(component, data, opts);




    popover.onWillDismiss(() => {

      this.backService.unsubscribe();


    });





    this.backService.subscribe(() => {
      popover.dismiss();
    });

    return popover;
  }

}
