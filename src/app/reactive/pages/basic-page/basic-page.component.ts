import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  // myForm2 = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  // validatedField(field: string): boolean | null {
  //   if (!this.myForm.controls?.[field]?.errors) return null;

  //   return this.myForm.controls[field]?.errors && this.myForm.controls[field]?.touched;
  // }

  // getErrorField(field: string): string | null {
  //   const errors = this.myForm.controls?.[field]?.errors;
  //   console.log(errors);
  //   if (!errors) return null;

  //   if (errors['required']) return 'El campo es requerido';
  //   if (errors['minlength'])
  //     return `El campo debe tener mínimo ${errors['minlength']?.requiredLength} caracteres`;
  //   if (errors['min']) return `El valor mínimo es de ${errors['min'].min}`;

  //   return null;
  // }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
