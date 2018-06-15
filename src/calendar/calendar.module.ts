import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar';
import { IonicModule } from 'ionic-angular';
import { CalendarMonthComponent } from './calendar-month/calendar-month';
import { CalendarDayComponent } from './calendar-day/calendar-day';
import { LockSlidesDirective } from './lock-slides.directive';

@NgModule({
  imports: [
    IonicModule
  ],
  declarations: [
    CalendarComponent,
    CalendarMonthComponent,
    CalendarDayComponent,
    LockSlidesDirective
],
  exports: [
    CalendarComponent
  ]
})
export class CalendarModule { }
