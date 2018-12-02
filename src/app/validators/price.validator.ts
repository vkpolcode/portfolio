import { AbstractControl } from '@angular/forms';

export function ValidatePrice(control: AbstractControl) {
  if (control.value) {
    const number = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/.test(control.value) ? +control.value : NaN;
    if (number !== number) {
      return { 'price': true };
    }
  }
  return null;
}
