import { NgModule } from '@angular/core';
import { DiffTimePipe } from './diff-time/diff-time';
import { SanitizerPipe } from './sanitizer/sanitizer';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DiffTimePipe,
    SanitizerPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DiffTimePipe,
    SanitizerPipe
  ]
})
export class PipesModule { }
