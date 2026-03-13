import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikeDetailsComponent } from './bike-details.component';

const routes: Routes = [
  {
    path: '',
    component: BikeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BikeDetailsRoutingModule { }
