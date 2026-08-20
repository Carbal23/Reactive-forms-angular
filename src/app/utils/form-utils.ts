import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
};

export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors) {
    if (!errors) return null;

    if (errors['required']) return 'El campo es requerido';
    if (errors['minlength'])
      return `El campo debe tener mínimo ${errors['minlength']?.requiredLength} caracteres`;
    if (errors['min']) return `El valor mínimo es de ${errors['min'].min}`;
    if (errors['email']) return 'Escriba un email valido';
    if (errors['emailExist']) return 'El correo ya existe';
    if (errors['isStrider']) return 'Nombre no permitido';
    if (errors['pattern']) {
      if (errors['pattern']['requiredPattern'] === this.emailPattern)
        return 'El correo electrónico no es permitido';
      return 'Error de patron contra expresión regular';
    }

    return null;
  }

  static validatedField(form: FormGroup, field: string): boolean | null {
    if (!form.controls?.[field]?.errors) return null;

    return form.controls[field]?.errors && form.controls[field]?.touched;
  }

  static getErrorField(form: FormGroup, field: string): string | null {
    const errors = form.controls?.[field]?.errors ?? {};
    return this.getTextError(errors);
  }

  static isValidFielInArray(formArray: FormArray, index: number): boolean | null {
    if (!formArray) return null;

    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  static getErrorInArray(formArray: FormArray, index: number): string | null {
    if (!formArray) return null;
    const errors = formArray.controls[index]?.errors ?? {};

    return this.getTextError(errors);
  }

  static confirmPassword(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl) => {
      const passwordField = formGroup.get(password)?.value;
      const confirmPasswordField = formGroup.get(confirmPassword)?.value;

      return passwordField === confirmPasswordField ? null : { isPasswordNotEqual: true };
    };
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();

    const value = control.value;

    if (value === 'mau@correo.com') {
      return {
        emailExist: true,
      };
    }

    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;

    if (value.trim().toLowerCase() === 'strider') {
      return {
        isStrider: true,
      };
    }
    return null;
  }
}
