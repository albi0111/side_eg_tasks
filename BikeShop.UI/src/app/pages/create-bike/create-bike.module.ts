import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateBikeRoutingModule } from './create-bike-routing.module';
import { CreateBikeComponent } from './create-bike.component';

@NgModule({
  declarations: [CreateBikeComponent],
  imports: [
    CommonModule,
    FormsModule,
    CreateBikeRoutingModule
  ]
})
export class CreateBikeModule { }
