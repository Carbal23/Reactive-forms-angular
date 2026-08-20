import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Country } from '../../interfaces/country.interfaces';
import { filter, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  countryService = inject(CountryService);
  fb = inject(FormBuilder);

  regions = this.countryService.regions;
  countriesByRegion = signal<Country[]>([]);
  countryBorders = signal<Country[]>([]);

  countryForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onRegionChangedEffect = effect((onCleanup) => {
    const regionField = this.onRegionFieldChanged();
    const countryField = this.onCountryFieldChanged();

    onCleanup(() => {
      regionField.unsubscribe();
      countryField.unsubscribe();
    });
  });

  onRegionFieldChanged() {
    return this.countryForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.countryForm.get('country')!.setValue('')),
        tap(() => this.countryForm.get('border')!.setValue('')),
        tap(() => this.countriesByRegion.set([])),
        tap(() => this.countryBorders.set([])),
        switchMap((region) => {
          if (!region || region.trim() === '') return of([]);

          return this.countryService.getCountriesByRegion(region);
        }),
      )
      .subscribe({
        next: (countries) => this.countriesByRegion.set(countries),
        error: (error) => console.error('Error cargando países', error),
      });
  }

  onCountryFieldChanged() {
    return this.countryForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.countryForm.get('border')!.setValue('')),
        map((countryCode) =>
          this.countriesByRegion().find(
            (countryRegion) => countryRegion.codes.alpha_3 === countryCode,
          ),
        ),
        switchMap((country) => {
          if (!country || !country.borders || country.borders.length === 0) {
            this.countryBorders.set([]);
            return of([]);
          }
          console.log(country);
          return this.countryService.getCountryNameByCodeArray(country.borders);
        }),
      )
      .subscribe({
        next: (borders) => {
          console.log(borders);
          const bordersCleaned = borders.filter((country) => !!country);
          this.countryBorders.set(bordersCleaned);
        },
        error: (error) => console.error(error),
      });
  }
}
