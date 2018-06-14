import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { RichTextComponent } from './rich-text/rich-text';
import { ValidatorsModule } from '../validators/validators.module';

// 常用共享模块
const Modules = [
  DirectivesModule,
  PipesModule,
  ValidatorsModule
];


@NgModule({
  declarations: [
    RichTextComponent
  ],
  imports: [
    IonicModule,
    ...Modules
  ],
  exports: [
    RichTextComponent,
    ...Modules
  ]
})
export class ComponentsModule { }
