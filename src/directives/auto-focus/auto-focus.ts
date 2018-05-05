import { ToolService } from './../../core/common/tool.service';
import { KeyboardService } from './../../core/native/keyboard.service';
import { Directive, OnInit, ElementRef, Self, Optional, OnDestroy } from '@angular/core';
import { TextInput } from 'ionic-angular';


@Directive({
  selector: '[auto-focus]' // Attribute selector
})
export class AutoFocusDirective implements OnInit, OnDestroy {

  private keyboardShowSubscription: any;


  constructor(
    private el: ElementRef,
    @Optional() @Self() private textInput: TextInput,
    private keyboardService: KeyboardService,
    private toolService: ToolService
  ) {
    // this.element = el.nativeElement;

  }

  ngOnInit() {

    if (this.toolService.isDevice()) {


      setTimeout(() => {
        this.keyboardService.show();
      }, 500);

      this.keyboardShowSubscription = this.keyboardService.didShow.subscribe(() => {
        this.setFocus();
      });


    } else {



      setTimeout(() => {
        this.setFocus();
      }, 333);

    }




  }

  ngOnDestroy() {

    if (this.keyboardShowSubscription) this.keyboardShowSubscription.unsubscribe();

  }

  private setFocus() {

    if (this.textInput) {
      this.textInput.setFocus();
    } else {
      this.el.nativeElement.focus();
    }


  }

}
