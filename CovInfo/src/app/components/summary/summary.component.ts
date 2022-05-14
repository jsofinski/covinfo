import { Component, OnInit } from '@angular/core';
import { Summary } from 'src/app/models/summary';
import { CovidApiService } from 'src/app/services/covid-api.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass']
})
export class SummaryComponent implements OnInit {

  showAllCountries = false;
  allSummaries: Array<Summary>;
  globalSummary: Summary;
  constructor(private covidApiService: CovidApiService) { 
    this.covidApiService = covidApiService;
    this.allSummaries = new Array<Summary>();
    this.globalSummary = new Summary("", "", 0, 0);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.covidApiService.showSpinner();
    this.covidApiService.getSummaryRequest().subscribe( data => {
        let globalTotalConfirmed = data.Global.TotalConfirmed;
        let globalTotalDeaths = data.Global.TotalDeaths;
        this.globalSummary = new Summary("Global", "GL", globalTotalConfirmed, globalTotalDeaths);

        data.Countries.forEach((element: any) => {
          let temp = new Summary(element.Country, element.CountryCode, element.TotalConfirmed, element.TotalDeaths);
          this.allSummaries.push(temp);
        });
        this.covidApiService.hideSpinner();
      }
    )
  }

  showHide() {
    this.showAllCountries = !this.showAllCountries;
  }
}
