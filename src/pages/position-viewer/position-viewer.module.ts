import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PositionViewerPage } from './position-viewer';

@NgModule({
  declarations: [
    PositionViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(PositionViewerPage),
  ],
})
export class PositionViewerPageModule {}
