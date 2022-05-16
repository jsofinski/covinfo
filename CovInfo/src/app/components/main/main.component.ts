import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryData } from 'src/app/models/country-data';
import Summary, { CountrySummary } from 'src/app/models/summary';
import { CovidApiService } from 'src/app/services/covid-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  globalSummary: Summary;
  allCountriesSummary: CountrySummary[];
  selectedCountryName = "Poland";
  selectedCountry: CountrySummary = {
    country: "Poland", countryCode: "PL",
    cases: 0, deaths: 0
  };
  allCountriesNames: string[] = []
  constructor(private covidApiService: CovidApiService,
    private SpinnerService: NgxSpinnerService) { 
    this.covidApiService = covidApiService;
    this.globalSummary = {cases: 0, deaths: 0};
    this.allCountriesSummary = [];
   }
   
  async ngOnInit(): Promise<void> {
    await this.fetchData();
    this.setCountry();
  }

  async fetchData(){
    try {
      this.SpinnerService.show();
      // summaryData.global, .countries
      const summaryData = await this.covidApiService.getSummaryRequest();
      this.globalSummary = summaryData.global;
      this.allCountriesSummary = summaryData.countries;
      this.allCountriesNames = summaryData.countries.map(t=>t.country)
    } catch (e) {
      // TODO popup
    } finally {
      this.SpinnerService.hide();
    }
  }

  setCountry() {
    const selectedCountry = this.allCountriesSummary.find(
      summary => summary.country == this.selectedCountryName
    );
    if (selectedCountry != undefined) {
      this.selectedCountry = selectedCountry
    }
    console.log(this.selectedCountry)
  }

}
