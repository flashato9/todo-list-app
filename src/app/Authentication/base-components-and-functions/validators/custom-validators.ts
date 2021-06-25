import { AbstractControl, ValidationErrors } from '@angular/forms';
import { numbersOnlyValidator, strongPasswordValidator, validUsernameValidator } from './validator-functions';

export class CustomValidators {
  static numbersOnly(control: AbstractControl): ValidationErrors | null {
    return numbersOnlyValidator(control);
  }
  static strongPassword(control: AbstractControl): ValidationErrors | null {
    return strongPasswordValidator(control);
  }
  static validUsername(control: AbstractControl): ValidationErrors | null {
    return validUsernameValidator(control);
  }
}

//For rereference when creating a validor

//
// static min(min: number): ValidatorFn {
//   return minValidator(min);
// }

//
