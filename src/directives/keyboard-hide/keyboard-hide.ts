import { Directive, OnInit, HostBinding, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { KeyboardService } from '../../core/native/keyboard.service';


@Directive({
  selector: '[keyboard-hide]' // Attribute selector
})
export class KeyboardHideDirective implements OnInit, OnDestroy {

  @HostBinding('attr.style') style: SafeStyle = '';

  private willShowSubject: any;
  private willHideSubject: any;

  constructor(
    private keyboardService: KeyboardService,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }


  ngOnInit() {
    this.willShowSubject = this.keyboardService.willShow.subscribe(() => {
      this.style = this.sanitizer.bypassSecurityTrustStyle('display: none');
      this.changeDetectorRef.detectChanges();
    });

    this.willHideSubject = this.keyboardService.willHide.subscribe(() => {
      this.style = '';
    });
  }

  ngOnDestroy() {
    this.willShowSubject.unsubscribe();
    this.willHideSubject.unsubscribe();
  }

}
