import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import Summary, { CountrySummary } from 'src/app/models/summary';
import { CovidApiService } from 'src/app/services/covid-api.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass'],
})
export class SummaryComponent implements OnInit, AfterViewInit {
  showAllCountries = false;
  coutrySummaries: CountrySummary[];
  coutrySummariesToShow: CountrySummary[];
  dataSource = new MatTableDataSource<CountrySummary>();
  globalSummary: Summary;
  countriesList: string[];
  displayedColumns: string[] = ['country', 'cases', 'deaths'];
  constructor(
    private covidApiService: CovidApiService,
    private SpinnerService: NgxSpinnerService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.covidApiService = covidApiService;
    this.coutrySummaries = [];
    this.coutrySummariesToShow = [];
    this.countriesList = [];
    this.dataSource = new MatTableDataSource(this.coutrySummariesToShow);
    this.globalSummary = {cases: 0, deaths: 0};
  }


  @ViewChild(MatSort) sort: MatSort = new MatSort;

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.coutrySummariesToShow);
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getData();
    this.refreshData();
  }

  refreshData() {
    this.dataSource = new MatTableDataSource(this.coutrySummariesToShow);
    this.dataSource.sort = this.sort;
  }

  changeFilter(value: string) {
    this.coutrySummariesToShow = [];
    let temp = this.coutrySummaries;
    this.coutrySummariesToShow = this.coutrySummaries.filter(
      summary => (summary.country).toLowerCase().includes(value.toLowerCase())
    )
    console.log(this.coutrySummariesToShow.length);
    this.refreshData();
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
      this.dataSource = new MatTableDataSource(this.coutrySummariesToShow);
      this.dataSource.sort = this.sort;
    } catch (e) {
      // TODO popup
    } finally {
      this.SpinnerService.hide();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }    
  }

  showHide() {
    this.showAllCountries = !this.showAllCountries;
  }
}
