import { Directive, Self, AfterViewInit, OnDestroy } from '@angular/core';
import { TextInput } from 'ionic-angular';

// ion-textarea自动高度指令
@Directive({
  selector: 'ion-textarea[auto-height]' // Attribute selector
})
export class AutoHeightDirective implements AfterViewInit, OnDestroy {

  private subject: any;

  constructor(
    @Self() private textInput: TextInput
  ) {
  }


  ngAfterViewInit() {

    const textarea = this.textInput._native.nativeElement;
    this.subject = this.textInput.ionChange.subscribe(() => {

      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });

  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }
}
