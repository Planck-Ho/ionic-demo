import { Directive, ElementRef, HostListener, OnDestroy, Input, Output, EventEmitter, OnInit } from '@angular/core';

// 获取验证码指令
@Directive({
  selector: 'button[verificationCode],ion-button[verificationCode]'
})
export class VerificationCodeDirective implements OnInit,OnDestroy {

  // 二維碼持續時間
  private duration: number = 60;


  private timer: any = null;

  private innerHTML: string;

  private _disabled: boolean;



  @Input('verificationCode')
  set disabled(val: boolean) {



    if (this._disabled === val) return;


    this._disabled = val;

    if (!val) {
      clearInterval(this.timer);
      this.duration = 60;

      if (this.innerHTML) this.el.nativeElement.innerHTML = this.innerHTML;

    }

    this.disabledChange.emit(val);

  }

  get disabled(): boolean {
    return this._disabled;
  }


  @Output('verificationCodeChange') disabledChange = new EventEmitter<boolean>();

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit(){
    this.onClick();
  }



  @HostListener('click') onClick() {
    clearInterval(this.timer);
    this.disabled = true;
    this.innerHTML = this.el.nativeElement.innerHTML;
    this.el.nativeElement.innerHTML = `${this.duration} s`;
    this.timer = setInterval(() => {

      this.el.nativeElement.innerHTML = `${--this.duration} s`;


      if (this.duration === 0) {

        this.disabled = false;

      }

    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }



}
