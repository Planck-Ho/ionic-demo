import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Base64Validator } from './directives/base64';
import { DateISOValidator } from './directives/date-iso';
import { DateValidator } from './directives/date';
import { DigitsValidator } from './directives/digits';
import { EmailValidator } from './directives/email';
import { EqualToValidator } from './directives/equal-to';
import { EqualValidator } from './directives/equal';
import { JSONValidator } from './directives/json';
import { MaxDateValidator } from './directives/max-date';
import { MinDateValidator } from './directives/min-date';
import { NumberValidator } from './directives/number';
import { OnlyNumberValidator } from './directives/onlyNumber';
import { PhoneValidator } from './directives/phone';
import { TelValidator } from './directives/tel';
import { UrlValidator } from './directives/url';
import { UUIDValidator } from './directives/uuid';
import { NoEmptyValidator } from './directives/noEmpty';
import { MoneyValidator } from './directives/money';
import { MinValidator } from './directives/min';
import { MaxValidator } from './directives/max';

const DECLARATIONS: any[] = [
  Base64Validator,
  DateISOValidator,
  DateValidator,
  DigitsValidator,
  EmailValidator,
  EqualToValidator,
  EqualValidator,
  JSONValidator,
  MaxDateValidator,
  MinDateValidator,
  NumberValidator,
  OnlyNumberValidator,
  PhoneValidator,
  TelValidator,
  UrlValidator,
  UUIDValidator,
  NoEmptyValidator,
  MoneyValidator,
  MinValidator,
  MaxValidator
];


@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...DECLARATIONS
  ]

})
export class ValidatorsModule { }
