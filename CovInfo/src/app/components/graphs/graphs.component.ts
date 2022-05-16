import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DateData } from 'src/app/models/date-data';
import { CovidApiService } from 'src/app/services/covid-api.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.sass'],
})
export class GraphsComponent implements OnInit {
  fromDate: Date;
  toDate: Date;

  showConfirmed: boolean = false;
  showDeaths: boolean = false;
  showActive: boolean = false;

  countryArray: Array<String>;
  country: string = 'poland';
  dataArray: DateData[];
  constructor(
    private covidApiService: CovidApiService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.covidApiService = covidApiService;

    this.toDate = new Date();
    this.fromDate = new Date();
    this.fromDate.setMonth(this.toDate.getMonth() - 1);
    this.countryArray = new Array<String>();
    this.dataArray = [];
  }

  ngOnInit(): void {}

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
      fontSize: 16,
    },
    legend: {
      position: 'bottom',
    },
  };
  data = {
    labels: ['heh'],
    datasets: [
      {
        label: 'First Dataset',
        data: [0],
      },
    ],
  };
  update(event: Event) {
    console.log('update');
    this.resetChart(); //create new data
  }
  resetChart() {
    this.options.title.text = this.country;
    let newLabels: string[] = [];
    let dataConfirmed: number[] = [];
    let dataDeath: number[] = [];
    let dataActive: number[] = [];
    // api only stores number of total cases up to date. It is necceasary to calculate difference
    let lastElement = this.dataArray[0];
    this.dataArray.forEach((element, index) => {
      // first index is a day before fromDate
      if (index === 0) return;
      newLabels.push(element.date.toString());
      dataConfirmed.push(element.confirmed - lastElement.confirmed);
      dataDeath.push(element.deaths - lastElement.deaths);
      dataActive.push(element.recovered - lastElement.recovered);
      lastElement = element;
    });

    let datasets = [];
    if (this.showConfirmed)
      datasets.push({
        label: 'Confirmed',
        data: dataConfirmed,
        borderColor: 'green',
      });
    if (this.showDeaths)
      datasets.push({
        label: 'Deaths',
        data: dataDeath,
        borderColor: 'black',
      });
    if (this.showActive)
      datasets.push({
        label: 'Active',
        data: dataActive,
        borderColor: 'red',
      });
    this.data = {
      labels: newLabels,
      datasets: datasets,
    };
  }

  dateRangeChange(startDate: HTMLInputElement, endDate: HTMLInputElement) {
    let temp = new Date();
    let splitted = startDate.value.split('/', 3);
    temp.setUTCHours(0, 0, 0, 0);
    temp.setMonth(parseInt(splitted[0]) - 1);
    temp.setDate(parseInt(splitted[1]));
    temp.setFullYear(parseInt(splitted[2]));
    temp.setDate(temp.getDate() - 1);
    this.fromDate = temp;

    temp = new Date();
    splitted = endDate.value.split('/', 3);
    temp.setUTCHours(0, 0, 0, 0);
    temp.setMonth(parseInt(splitted[0]) - 1);
    temp.setDate(parseInt(splitted[1]));
    temp.setFullYear(parseInt(splitted[2]));
    this.toDate = temp;
  }

  async getData() {
    this.dataArray = new Array<DateData>();
    this.SpinnerService.show();
    try {
      this.SpinnerService.show();
      // summaryData.global, .countries
      this.dataArray = await this.covidApiService.getCountryFromTo(
        this.country,
        this.fromDate.toISOString(),
        this.toDate.toISOString()
      );
    } catch (e) {
      // TODO popup
    } finally {
      this.SpinnerService.hide();
    }
  }
}
