import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

const NoEmpty_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MoneyValidator),
  multi: true
};

@Directive({
  selector: '[money][formControlName],[money][formControl],[money][ngModel]',
  providers: [NoEmpty_VALIDATOR]
})

export class MoneyValidator implements Validator {
  validate(c: AbstractControl): { [key: string]: any } {
    const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

    return !!reg.exec(c.value) ? null : { 'money': true };
  }
}
