import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import _ from 'lodash';

const TEL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => TelValidator),
  multi: true
};

@Directive({
  selector: '[tel][formControlName],[tel][formControl],[tel][ngModel]',
  providers: [TEL_VALIDATOR]
})
export class TelValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    const reg =  /(^[0-9]{3,4}\-[0-9]{7,8}$)|\((^[0-9]{3,4}[0-9]{7,8}\)$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^((\+86)|(86))?[0-9]{11}$)|(^((00852))[0-9]{8}$)/;
    if (reg.exec(c.value)) {
    } else {
    }
    return (!_.isEmpty(c.value)) ? (!!reg.exec(c.value) ?  null : {'tel': true}) : null;
  }
}

