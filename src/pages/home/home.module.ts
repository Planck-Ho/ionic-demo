import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ComponentsModule } from '../../components/components.module';
import { CalendarModule } from '../../calendar/calendar.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    ComponentsModule,
    CalendarModule,
    IonicPageModule.forChild(HomePage),
  ],
  providers: [

  ]
})
export class HomePageModule { }
