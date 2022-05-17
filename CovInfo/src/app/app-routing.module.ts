import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareComponent } from './components/compare/compare.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { MainComponent } from './components/main/main.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'graphs',
    component: GraphsComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
  },
  // {
  //   path: 'compare',
  //   component: CompareComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
