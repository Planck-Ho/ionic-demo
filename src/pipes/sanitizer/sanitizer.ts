import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizer',
})
export class SanitizerPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) {

  }


  // 消毒管道
  transform(val: string, arg: 'HTML' | 'STYLE' | 'SCRIPT' | 'URL' | 'RESOURCE_URL'): any {


    if (!val) return;

    switch (arg) {
      case 'HTML':
        return this.sanitizer.bypassSecurityTrustHtml(val);
      case 'STYLE':
        return this.sanitizer.bypassSecurityTrustStyle(val);
      case 'SCRIPT':
        return this.sanitizer.bypassSecurityTrustScript(val);
      case 'URL':
        return this.sanitizer.bypassSecurityTrustUrl(val);
      case 'RESOURCE_URL':
        return this.sanitizer.bypassSecurityTrustResourceUrl(val);
      default:
        return val;
    }
  }
}
