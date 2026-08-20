import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchesPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  switchesForm = this.fb.group({
    gender: ['M', Validators.required],
    wantNotification: [true],
    termAndConditions: [false, Validators.requiredTrue],
  });

  onSubmit() {
    if(this.switchesForm.invalid){
      this.switchesForm.markAllAsTouched()
      return
    }
    console.log(this.switchesForm.value);
  }
}
