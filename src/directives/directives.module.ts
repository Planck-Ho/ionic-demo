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




@NgModule({
  declarations: [
    SlidesInteractionDirective,
    BeginRefreshDirective,
    SwipeBackDirective,
    VerificationCodeDirective,
    InputNumDirective,
    TextSpilloverDirective,
    AutoFocusDirective,
    TabClickDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SlidesInteractionDirective,
    BeginRefreshDirective,
    SwipeBackDirective,
    VerificationCodeDirective,
    InputNumDirective,
    TextSpilloverDirective,
    AutoFocusDirective,
    TabClickDirective
  ]
})
export class DirectivesModule { }
