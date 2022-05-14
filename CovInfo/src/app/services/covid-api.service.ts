import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";  

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {

  constructor(private http: HttpClient, private SpinnerService: NgxSpinnerService) { }


  getTestRequest() {
    this.SpinnerService.show();
    let link = "/country/poland?from=2020-03-01T00:00:00Z&to=2021-04-01T00:00:00Z";
    return this.http.get<any>(environment.apiUrl + link);
  }

  getSummaryRequest() {
    return this.http.get<any>(environment.apiUrl + '/summary');
  }

  showSpinner() {
    this.SpinnerService.show();
  }
  hideSpinner() {
    this.SpinnerService.hide();
  }
}
