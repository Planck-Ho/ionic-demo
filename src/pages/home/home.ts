import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import moment from 'moment';
import {
  CalendarController,
  Schedule
} from '../../calendar/calendar-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  date: string;

  // 日程安排
  scheduleDates: Schedule[] = [
    {
      date: moment().format('YYYY-MM-DD'),
      color: '#488aff'
    },
    {
      date: moment()
        .add('day', 1)
        .format('YYYY-MM-DD'),
      color: 'red'
    }
  ];

  constructor(private calendarCtrl: CalendarController) {}

  ionViewDidLoad() {}

  today() {
    this.date = moment().format('YYYY-MM-DD');
    // this.calendarCtrl.selectDate();
  }
}
