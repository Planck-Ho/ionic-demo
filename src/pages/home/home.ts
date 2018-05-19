import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  date: string;

  constructor(
  ) {



  }

  ionViewDidLoad() {



  }


  today() {
    this.date = moment().format('YYYY-MM-DD');
  }


}
