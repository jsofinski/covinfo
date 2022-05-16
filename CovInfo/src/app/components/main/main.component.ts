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
