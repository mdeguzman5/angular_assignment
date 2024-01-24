import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function allWhiteSpaceValidator(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    return value.trim() === '' ? { allWhiteSpace: true } : null;
  }
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => { 
    const value = control.value;

    const isValid = value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    return !isValid ? { invalidEmail: true } : null;
  }
}