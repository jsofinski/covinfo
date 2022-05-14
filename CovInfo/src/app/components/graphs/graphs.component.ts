import { Component, OnInit } from '@angular/core';
import { DateData } from 'src/app/models/date-data';
import { CovidApiService } from 'src/app/services/covid-api.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.sass']
})
export class GraphsComponent implements OnInit {
  fromDate: Date;
  toDate: Date = new Date();

  showConfirmed: boolean = false;
  showDeaths: boolean = false;
  showActive: boolean = false;

  countryArray: Array<String>;
  country: string = "poland";
  dataArray: Array<DateData>;
  constructor(private covidApiService: CovidApiService) { 
    this.covidApiService = covidApiService;

    this.fromDate = new Date();
    this.toDate = new Date();
    this.countryArray = new Array<String>();
    this.dataArray = new Array<DateData>();
  }

  ngOnInit(): void {
  }

  setConfirmed(value: boolean) {
    this.showConfirmed = value;
  }
  setDeaths(value: boolean) {
    this.showDeaths = value;
  }
  setActive(value: boolean) {
    this.showActive = value;
  }


  options = {
    title: {
        display: true,
        text: 'My Title',
        fontSize: 16
    },
    legend: {
        position: 'bottom'
    }
  };
  data = {
    labels: ['heh'],
    datasets: [
        {
            label: 'First Dataset',
            data: [0]
        }
    ]
  }
  update(event: Event) {
    console.log("update");
    this.resetChart(); //create new data
  }
  resetChart() {
    console.log("reset");
    this.options.title.text = this.country;
    let newLabels = new Array<string>();
    let dataConfirmed: number[] = [];
    let dataDeath: number[] = [];
    let dataActive: number[] = [];
    this.dataArray.forEach(element => {
      newLabels.push(element.date.toString());
      dataConfirmed.push(element.newConfirmed);
      dataDeath.push(element.newDeaths);
      dataActive.push(element.active);
    })
    dataConfirmed[0] = 0;
    dataDeath[0] = 0;
    dataActive[0] = 0;

    let datasets = [];

    if (this.showConfirmed)
      datasets.push({
        label: 'Confirmed',
        data: dataConfirmed});
    if (this.showDeaths)
      datasets.push({
        label: 'Deaths',
        data: dataDeath
      });
    if (this.showActive)
      datasets.push({
        label: 'Active',
        data: dataActive
      });

      
    this.data = {
      labels: newLabels,
      datasets: datasets
    }
  }

  dateRangeChange(startDate: HTMLInputElement, endDate: HTMLInputElement) {
    let temp = new Date()
    let splitted = startDate.value.split("/", 3); 
    temp.setUTCHours(0,0,0,0);
    temp.setMonth(parseInt(splitted[0])-1);
    temp.setDate(parseInt(splitted[1]));
    temp.setFullYear(parseInt(splitted[2]));
    this.fromDate = temp;

    temp = new Date()
    splitted = endDate.value.split("/", 3); 
    temp.setUTCHours(0,0,0,0);
    temp.setMonth(parseInt(splitted[0])-1);
    temp.setDate(parseInt(splitted[1]));
    temp.setFullYear(parseInt(splitted[2]));
    this.toDate = temp;
  }

  
  getData() {
    // console.log(this.fromDate.toISOString());
    // console.log(this.toDate.toISOString());
    // console.log(this.fromDate.toISOString());
    this.dataArray = new Array<DateData>();
    this.covidApiService.showSpinner();
    this.covidApiService.getCountryFromTo(this.country, this.fromDate.toISOString(), this.toDate.toISOString()).subscribe(data => {
      console.log(data);
      let lastConfirmed = 0;
      let lastDeaths = 0;
      let lastRecovered = 0;
      let lastActive = 0;
      data.forEach((element: any) => {
        let currentConfirmed = element.Confirmed;
        let currentDeaths = element.Deaths;
        let currentActive = element.Active;
        let currentRecovered = element.Recovered;
        let date = element.Date
        let dateData = new DateData(date, currentActive, currentConfirmed, currentRecovered, currentDeaths);
        dateData.setNewConfirmed(lastConfirmed);
        dateData.setNewDeaths(lastDeaths);
        dateData.setNewRecovered(lastRecovered);
        dateData.setActive(lastActive);
        this.dataArray.push(dateData);

        lastConfirmed = currentConfirmed;
        lastDeaths = currentDeaths;
        lastRecovered = currentRecovered;
        lastActive = currentActive;

      });
      this.covidApiService.hideSpinner();
      console.log(this.dataArray)
    })
  }

}
