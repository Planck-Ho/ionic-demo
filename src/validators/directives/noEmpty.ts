import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../custom-validators';


const NoEmpty_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NoEmptyValidator),
  multi: true
};

@Directive({
  selector: '[noEmpty][formControlName],[noEmpty][formControl],[noEmpty][ngModel]',
  providers: [NoEmpty_VALIDATOR]
})
export class NoEmptyValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    return CustomValidators.noEmpty(c);
  }
}
