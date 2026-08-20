import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
import { CountriesResponse, Country } from '../interfaces/country.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private baseUrl = environment.countriesApiUrl;
  private apiKey = environment.countriesApiKey;
  http = inject(HttpClient);

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region.trim()) return of([]);

    const url = `${this.baseUrl}?region=${region}&response_fields=names.common,codes,borders`;
    return this.http
      .get<CountriesResponse>(url, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      })
      .pipe(map((resp) => resp.data.objects));
  }

  getCountryByAlpha3Code(alpha3Code: string): Observable<Country | undefined> {
    if (!alpha3Code) return of(undefined);
    const url = `${this.baseUrl}/codes.alpha_3?q=${alpha3Code}&response_fields=names.common,codes,borders`;

    return this.http
      .get<CountriesResponse>(url, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      })
      .pipe(map((resp) => resp.data.objects.at(0)));
  }

  getCountryNameByCodeArray(codes: string[]): Observable<(Country | undefined)[]> {
    if (!codes || codes.length === 0) return of([]);

    const countriesRequest: Observable<Country | undefined>[] = codes.map((code) =>
      this.getCountryByAlpha3Code(code),
    );

    return combineLatest(countriesRequest);
  }
}
