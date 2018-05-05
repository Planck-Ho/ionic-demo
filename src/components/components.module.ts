import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { RichTextComponent } from './rich-text/rich-text';

// 常用共享模块
const COMMON = [
  DirectivesModule,
  PipesModule
];


@NgModule({
  declarations: [
    RichTextComponent
  ],
  imports: [
    IonicModule,
    ...COMMON
  ],
  exports: [
    RichTextComponent,
    ...COMMON
  ]
})
export class ComponentsModule { }
