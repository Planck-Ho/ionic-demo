import { Directive, HostListener, ChangeDetectorRef, Self, Optional } from '@angular/core';
import { TextInput } from 'ionic-angular';

/**
 * Generated class for the InputNumDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[input-num]' // Attribute selector
})
export class InputNumDirective {


  constructor(
    private ref: ChangeDetectorRef,
    // ion-input
    @Optional() @Self() private textInput: TextInput
  ) {


  }

  // 监听Input keyup事件
  @HostListener('keyup', ['$event.target'])
  _keyup(target: any) {

    target.value = target.value.replace(/\D/g, '');
    // ion-input
    if (this.textInput) {
      this.textInput.setValue(target.value);
    }

  }




}
