import { NgModule } from '@angular/core';
import { SlidesInteractionDirective } from './slides-interaction/slides-interaction';
import { CommonModule } from '@angular/common';
import { BeginRefreshDirective } from './begin-refresh/begin-refresh';
import { SwipeBackDirective } from './swipe-back/swipe-back';
import { VerificationCodeDirective } from './verification-code/verification-code';
import { InputNumDirective } from './input-num/input-num';
import { TextSpilloverDirective } from './text-spillover/text-spillover';
import { AutoFocusDirective } from './auto-focus/auto-focus';
import { TabClickDirective } from './tab-click/tab-click.directive';
import { AutoHeightDirective } from './auto-height/auto-height';
import { KeyboardHideDirective } from './keyboard-hide/keyboard-hide';

// 指令
const directives = [
  SlidesInteractionDirective,
  BeginRefreshDirective,
  SwipeBackDirective,
  VerificationCodeDirective,
  InputNumDirective,
  TextSpilloverDirective,
  AutoFocusDirective,
  TabClickDirective,
  AutoHeightDirective,
  KeyboardHideDirective
];


@NgModule({
  declarations: [
    ...directives
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...directives
  ]
})
export class DirectivesModule { }
