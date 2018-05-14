import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../custom-validators';


const URL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => UrlValidator),
  multi: true
};

@Directive({
  selector: '[url][formControlName],[url][formControl],[url][ngModel]',
  providers: [URL_VALIDATOR]
})
export class UrlValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    return CustomValidators.url(c);
  }
}