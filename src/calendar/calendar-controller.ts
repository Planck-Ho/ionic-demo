import { Injectable } from '@angular/core';
import { CalendarComponent } from './calendar';


@Injectable()
export class CalendarController {
  private calendar: CalendarComponent;

  setCalendar(calendar: CalendarComponent) {
    this.calendar = calendar;
  }

  get schedules() {
    return this.calendar.schedules;
  }

  constructor() {}

  // 当前选中时间
  activeDate(): string {
    return this.calendar.currentDate;
  }

  selectDate() {
    this.calendar.openDateTime();
  }
}
