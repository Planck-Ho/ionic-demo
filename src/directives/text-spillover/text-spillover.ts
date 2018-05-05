import { Directive, HostBinding, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


@Directive({
  selector: '[text-spillover]' // Attribute selector
})
export class TextSpilloverDirective implements OnChanges {

  @HostBinding('attr.style') style: SafeStyle = ``;

  @Input('text-spillover') line: number | string;



  constructor(
    private sanitizer: DomSanitizer
  ) {


  }

  ngOnChanges() {

    const style = `
    display: -webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:${this.line || 1};
    overflow: hidden;
    `;

    this.style = this.sanitizer.bypassSecurityTrustStyle(style);

  }

}
