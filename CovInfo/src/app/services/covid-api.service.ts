import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import Summary, { CountrySummary } from '../models/summary';
import { DateData } from '../models/date-data';
import { CountryData } from '../models/country-data';

@Injectable({
  providedIn: 'root',
})
export class CovidApiService {
  constructor(private http: HttpClient) {}

  getTestRequest() {
    let link =
      '/country/poland?from=2020-03-01T00:00:00Z&to=2021-04-01T00:00:00Z';
    return this.http.get<any>(environment.apiUrl + link);
  }

  async getSummaryRequest(): Promise<{
    global: Summary;
    countries: CountrySummary[];
  }> {
    // const response = await this.http.get<any>(environment.apiUrl + '/summary');
    const response = await fetch(environment.apiUrl + '/summary');
    if (response.body == null) {
      throw Error('Covid api returned unexpected response');
    }
    const data = await response.json();

    const global = {
      cases: data.Global.TotalConfirmed,
      deaths: data.Global.TotalDeaths,
    };
    const countries = data.Countries.map((element: any) => ({
      country: element.Country,
      countryCode: element.CountryCode,
      cases: element.TotalConfirmed,
      deaths: element.TotalDeaths,
    }));

    return { global, countries };
  }

  async getCountryFromTo(
    country: String,
    from: String,
    to: String
  ): Promise<DateData[]> {
    let link = '/country/' + country + '?from=' + from + '&to=' + to;
    const response = await fetch(environment.apiUrl + link);
    if (response.body == null) {
      throw Error('Covid api returned unexpected response');
    }
    const data = await response.json();

    const dateData = data.map((element: any) => ({
      date: new Date(element.Date),
      active: element.Active,
      confirmed: element.Confirmed,
      deaths: element.Deaths,
      recovered: element.Recovered,
    }));

    return dateData;
  }

  async getCountries(): Promise<CountryData[]> {
    const response = await fetch(environment.apiUrl + '/countries');
    if (response.body == null) {
      throw Error('Covid api returned unexpected response');
    }
    const data = await response.json();

    const countries = data.map((element: any) => ({
      country: element.Country,
      countryCode: element.ISO2,
    }));

    return countries;
  }
  async getCountriesList(): Promise<string[]> {
    const response = await fetch(environment.apiUrl + '/countries');
    if (response.body == null) {
      throw Error('Covid api returned unexpected response');
    }
    const data = await response.json();

    const countries: string[] = [];
    data.forEach((element: any) => {
      countries.push(element.Country);
    });
    return countries;
  }
}
