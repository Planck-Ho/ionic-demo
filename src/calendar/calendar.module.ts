import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar';
import { IonicModule } from 'ionic-angular';
import { CalendarMonthComponent } from './calendar-month/calendar-month';
import { CalendarDayComponent } from './calendar-day/calendar-day';

@NgModule({
  imports: [
    IonicModule
  ],
  declarations: [
    CalendarComponent,
    CalendarMonthComponent,
    CalendarDayComponent
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarModule { }
