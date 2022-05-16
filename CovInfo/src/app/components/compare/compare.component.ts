import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CovidApiService } from 'src/app/services/covid-api.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.sass']
})
export class CompareComponent implements OnInit {

  
  constructor(
    private covidApiService: CovidApiService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.covidApiService = covidApiService;
  }

  ngOnInit(): void {

  }

}
