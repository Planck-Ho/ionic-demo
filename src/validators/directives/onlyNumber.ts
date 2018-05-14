import {Directive, forwardRef} from '@angular/core';
import {NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms';


const ONLY_NUMBER_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => OnlyNumberValidator),
  multi: true
};

@Directive({
  selector: '[onlyNumber][formControlName],[onlyNumber][formControl],[onlyNumber][ngModel]',
  providers: [ONLY_NUMBER_VALIDATOR]
})
export class OnlyNumberValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    const reg = /^[0-9]*$/;

    return reg.exec(c.value) ?  null : {'onlyNumber': true};
  }
}
