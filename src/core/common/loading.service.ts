import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions, Loading } from 'ionic-angular';
import { BackService } from './back.service';

@Injectable()
export class LoadingService {

  constructor(
    private loadingCtrl: LoadingController,
    private backService: BackService,

  ) { }

  create(opts?: LoadingOptions): Loading {

    const loading = this.loadingCtrl.create(opts);


    loading.onWillDismiss(() => {
      this.backService.unsubscribe();
    });

    this.backService.subscribe(() => {
      console.info('loading');
    });

    return loading;
  }

  default(): Loading {

    const loading = this.create({
      spinner: 'crescent'
    });

    loading.present();

    return loading;
  }

  presentLoadingDefault() {
    const loading = this.create();

    loading.present();

    return loading;

}


}
