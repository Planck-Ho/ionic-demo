import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarSlidesPage } from './calendar-slides';
import { CalendarModule } from '../../calendar/calendar.module';

@NgModule({
  declarations: [
    CalendarSlidesPage,
  ],
  imports: [
    CalendarModule,
    IonicPageModule.forChild(CalendarSlidesPage),
  ],
})
export class CalendarSlidesPageModule {}
