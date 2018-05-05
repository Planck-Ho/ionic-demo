import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoViewerPage } from './photo-viewer';

@NgModule({
  declarations: [
    PhotoViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoViewerPage),
  ],
})
export class PhotoViewerPageModule {}
