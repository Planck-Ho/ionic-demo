import { Directive, HostListener } from '@angular/core';


@Directive({
  selector: '[input-num]' // Attribute selector
})
export class InputNumDirective {


  constructor(
  ) {


  }

  // 监听Input keyup事件
  @HostListener('keyup', ['$event.target'])
  _keyup(target: any) {
    target.value = target.value.replace(/\D/g,'');
  }

}
