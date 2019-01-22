import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { CalendarController } from '../../calendar/calendar-controller';
import * as moment from 'moment';
import { Schedule } from '../../calendar/calendar.model';

@IonicPage()
@Component({
  selector: 'page-calendar-slides',
  templateUrl: 'calendar-slides.html'
})
export class CalendarSlidesPage implements OnInit{
  date: string;

  // 日程安排
  schedules: Schedule[] = [];

  get hasSchedule(): boolean {
    return this.schedules.some(item => item.date === this.date);
  }

  constructor(
    private calendarCtrl: CalendarController
  ) {}

  ngOnInit() {
    this.setSchedules();
  }

  private setSchedules() {
    const date = moment().subtract('d', 1);
    const colors = ['#488aff', '#32db64', '#f53d3d', '#222'];
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(Math.random() * 4);
      this.schedules.push({
        date: date.add('d', 1).format('YYYY-MM-DD'),
        color: colors[index]
      });
    }
  }

  today() {
    this.date = moment().format('YYYY-MM-DD');
  }

  selectDate() {
    this.calendarCtrl.selectDate();
  }

  changeDate(date: string) {
    console.log(date, '当前日期');
  }

  tapDate(date: string) {
    console.log(date, '点击');
  }

}
