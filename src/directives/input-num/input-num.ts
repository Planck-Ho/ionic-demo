import { Directive, HostListener, Self, Optional } from '@angular/core';
import { TextInput } from 'ionic-angular';



@Directive({
  selector: 'ion-input[input-num]' // Attribute selector
})
export class InputNumDirective {


  constructor(
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
