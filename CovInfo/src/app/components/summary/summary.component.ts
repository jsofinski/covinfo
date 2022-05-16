import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Summary, { CountrySummary } from 'src/app/models/summary';
import { CovidApiService } from 'src/app/services/covid-api.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass'],
})
export class SummaryComponent implements OnInit {
  showAllCountries = false;
  coutrySummaries: CountrySummary[];
  coutrySummariesToShow: CountrySummary[];
  globalSummary: Summary;
  countriesList: string[];

  constructor(
    private covidApiService: CovidApiService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.covidApiService = covidApiService;
    this.coutrySummaries = [];
    this.coutrySummariesToShow = [];
    this.countriesList = [];
    this.globalSummary = {cases: 0, deaths: 0};
  }

  ngOnInit(): void {
    this.getData();
  }

  changeFilter(value: string) {
    this.coutrySummariesToShow = [];
    let temp = this.coutrySummaries;
    this.coutrySummariesToShow = this.coutrySummaries.filter(
      summary => (summary.country).toLowerCase().includes(value.toLowerCase())
    )
    console.log(value);
    // this.coutrySummaries.filter();
  }

  async getData() {
    try {
      this.SpinnerService.show();
      // summaryData.global, .countries
      const summaryData = await this.covidApiService.getSummaryRequest();
      this.globalSummary = summaryData.global;
      this.coutrySummaries = summaryData.countries;
      this.coutrySummariesToShow = summaryData.countries;
      this.countriesList = await this.covidApiService.getCountriesList(); 
    } catch (e) {
      // TODO popup
    } finally {
      this.SpinnerService.hide();
    }
  }

  showHide() {
    this.showAllCountries = !this.showAllCountries;
  }
}
