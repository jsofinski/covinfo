import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TotalComponent } from './components/total/total.component';
import { SummaryComponent } from './components/summary/summary.component';
import { NgxSpinnerModule } from "ngx-spinner";  

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GraphsComponent,
    TotalComponent,
    SummaryComponent
  ],
  imports: [
    HttpClientModule,
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,  
    NgxSpinnerModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
