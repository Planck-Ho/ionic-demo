import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar';
import { IonicModule } from 'ionic-angular';
import { CalendarMonthComponent } from './calendar-month/calendar-month';
import { CalendarDayComponent } from './calendar-day/calendar-day';
import { LockSlidesDirective } from './lock-slides.directive';
import { CalendarController } from './calendar-controller';

@NgModule({
  imports: [IonicModule],
  declarations: [
    CalendarComponent,
    CalendarMonthComponent,
    CalendarDayComponent,
    LockSlidesDirective
  ],
  providers: [CalendarController],
  exports: [CalendarComponent]
})
export class CalendarModule {}
