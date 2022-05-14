import { Component, OnInit } from '@angular/core';
import { CovidApiService } from 'src/app/services/covid-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {


  constructor(private covidApiService: CovidApiService) { 
    this.covidApiService = covidApiService
   }
   
  ngOnInit(): void {
    
  }

  getData1(){
    this.covidApiService.getSummaryRequest().subscribe(data => console.log(data));
  }
  getData2(){
    this.covidApiService.getTestRequest().subscribe(data => console.log(data));
  }
  getData3(){}
  getData4(){}
  getData5(){}

}
