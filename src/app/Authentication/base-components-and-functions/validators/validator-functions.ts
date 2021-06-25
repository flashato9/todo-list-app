import { AbstractControl, ValidationErrors } from '@angular/forms';

export function numbersOnlyValidator(control: AbstractControl): ValidationErrors | null {
  if (isEmptyInputValue(control.value)) {
    return null; // don't validate empty values to allow optional controls
  }
  return /\d/.test(control.value) ? null : { numbersonly: true };
}
export function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  if (isEmptyInputValue(control.value)) {
    return null; // don't validate empty values to allow optional controls
  } else {
    const noSpacesSatisfied: boolean = /^(?!.*\s+)/.test(control.value);
    const lowercaseSatisfied: boolean = /^(?=.*[a-z]+)/.test(control.value);
    const uppercaseSatisfied: boolean = /^(?=.*[A-Z]+)/.test(control.value);
    const numberSatisfied: boolean = /^(?=.*[0-9]+)/.test(control.value);
    const specialCharacterSatisfied: boolean = /^(?=.*[!@#$&-]+)/.test(control.value);

    if (!noSpacesSatisfied) return { strongpassword: { nospace: 'Input must have no spaces.' } };
    if (!lowercaseSatisfied) return { strongpassword: { lowercase: 'Input requires at least one lowercase letter.' } };
    if (!uppercaseSatisfied) return { strongpassword: { uppercase: 'Input requires at least one uppercase letter.' } };
    if (!numberSatisfied) return { strongpassword: { number: 'Input requires at least one number (i.e., 0-9)' } };
    if (!specialCharacterSatisfied)
      return {
        strongpassword: {
          specialchar: 'Input requires at least one of the following special characters: !@#$&-',
        },
      };

    return null;
  }
}
export function validUsernameValidator(control: AbstractControl): ValidationErrors | null {
  if (isEmptyInputValue(control.value)) {
    return null; // don't validate empty values to allow optional controls
  } else {
    const alphaUnderscoreSatisfied: boolean = /^\w+$/.test(control.value);

    return alphaUnderscoreSatisfied ? null : { alphanume: 'Input must contain alphanumeric/underscore characters only.' };
  }
}
//Helper Functions
function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

// function minValidator(min: number): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     if (isEmptyInputValue(control.value)) {
//       return null; // don't validate empty values to allow optional controls
//     }
//     const value = parseFloat(control.value);
//     // Controls with NaN values after parsing should be treated as not having a
//     // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
//     return !isNaN(value) && value < min ? { min: { min: min, actual: control.value } } : null;
//   };
// }
