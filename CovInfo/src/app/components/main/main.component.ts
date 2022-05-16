import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Summary from 'src/app/models/summary';
import { CovidApiService } from 'src/app/services/covid-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  globalSummary: Summary;


  constructor(private covidApiService: CovidApiService,
    private SpinnerService: NgxSpinnerService) { 
    this.covidApiService = covidApiService;
    this.globalSummary = {cases: 0, deaths: 0};
   }
   
  ngOnInit(): void {
    
  }

  async getData1(){try {
    this.SpinnerService.show();
    // summaryData.global, .countries
    const summaryData = await this.covidApiService.getSummaryRequest();
    this.globalSummary = summaryData.global;
  } catch (e) {
    // TODO popup
  } finally {
    this.SpinnerService.hide();
  }
  }
  getData2(){
  }
  getData3(){}
  getData4(){}
  async getData5(){
    let data = await this.covidApiService.getCountries();
    console.log(data);
  }

}
