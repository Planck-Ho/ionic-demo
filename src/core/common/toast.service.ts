import { Injectable } from '@angular/core';
import { ToastController, Toast } from 'ionic-angular';

@Injectable()
export class ToastService {


  constructor(
    private toastCtrl: ToastController
  ) { }


  presentToast(mesage: string, duration: number = 3000): Toast {

    const toast = this.toastCtrl.create({
      message: mesage,
      duration: duration,
      position: 'bottom'
    });

    toast.present();

    return toast;
  }







}
