import { Injectable } from '@angular/core';
import { ActionSheetController, ActionSheet, ActionSheetOptions } from 'ionic-angular';
import { BackService } from './back.service';

@Injectable()
export class ActionSheetService {


  constructor(
    private actionSheetCtrl: ActionSheetController,
    private backService: BackService
  ) { }

  create(options?: ActionSheetOptions): ActionSheet {

    const actionSheet = this.actionSheetCtrl.create(options);

    actionSheet.onWillDismiss(() => {

      this.backService.unsubscribe();

    });


    this.backService.subscribe(() => {
      actionSheet.dismiss();
    });


    return actionSheet;

  }






}
