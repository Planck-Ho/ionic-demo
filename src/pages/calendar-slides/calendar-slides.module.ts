import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarSlidesPage } from './calendar-slides';

@NgModule({
  declarations: [
    CalendarSlidesPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarSlidesPage),
  ],
})
export class CalendarSlidesPageModule {}
