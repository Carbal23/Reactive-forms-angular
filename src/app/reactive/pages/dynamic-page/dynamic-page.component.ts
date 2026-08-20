import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  dynamicForm = this.fb.group({
    name: ['', Validators.required, Validators.minLength(3)],
    favoriteGames: this.fb.array(
      [
        ['Spider-man', Validators.required],
        ['Superman', Validators.required],
      ],
      Validators.minLength(3),
    ),
  });

  newFavoriteGame = this.fb.control('', [Validators.required]);

  get favoriteGames() {
    return this.dynamicForm.get('favoriteGames') as FormArray;
  }

  onAddToFavoriteGames() {
    if (this.newFavoriteGame.invalid) return;
    const newGame = this.newFavoriteGame.value;

    this.favoriteGames.push(this.fb.control(newGame, [Validators.required]));

    this.newFavoriteGame.reset();
  }

  onRemoveFavoriteGame(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    if (this.dynamicForm.invalid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }

    console.log(this.dynamicForm.value);

    this.dynamicForm.reset();
  }
}
