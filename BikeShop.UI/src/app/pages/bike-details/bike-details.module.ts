import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BikeDetailsRoutingModule } from './bike-details-routing.module';
import { BikeDetailsComponent } from './bike-details.component';

@NgModule({
  declarations: [BikeDetailsComponent],
  imports: [
    CommonModule,
    BikeDetailsRoutingModule
  ]
})
export class BikeDetailsModule { }
