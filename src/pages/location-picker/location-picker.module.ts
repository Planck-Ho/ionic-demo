import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPickerPage } from './location-picker';

@NgModule({
  declarations: [
    LocationPickerPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationPickerPage),
  ],
})
export class LocationPickerPageModule {}
