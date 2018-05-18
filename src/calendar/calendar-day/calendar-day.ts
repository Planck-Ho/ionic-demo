import { Component, Input, Output, EventEmitter } from '@angular/core';
import moment, { Moment } from 'moment';



@Component({
  selector: 'calendar-day',
  templateUrl: 'calendar-day.html'
})
export class CalendarDayComponent {


  // 显示的日期
  @Input() date: string;

  // 当前日期
  @Input() currentDate: Moment;

  // 选择时间
  @Output() onSelect = new EventEmitter<string>();

  @Input() schedules: string[];


  // 有日程安排
  get haveSchedule(): boolean {
    return this.schedules && this.schedules.indexOf(this.date) !== -1;
  }


  get isToday(): boolean {
    return this.date === moment().format('YYYY-MM-DD');
  }


  // 当前月份
  get isCurrentMonth(): boolean {

    return this.currentDate.isSame(this.date, 'month');

  }


  get isSelectDay(): boolean {
    // 当前日期
    const currentDate = this.currentDate.format('YYYY-MM-DD');
    return this.date === currentDate;
  }


  constructor() {
  }



  select() {

    // 不能选择小于 1970-01-01
    if (moment(this.date).isBefore('1970-01-01')) return;

    if (this.isCurrentMonth) {
      this.currentDate.set('date', moment(this.date).date())
    }

    this.onSelect.emit(this.date);


  }


}

