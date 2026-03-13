import { MyFavouritesComponent } from './my-favourites.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFavouritesRoutingModule } from './my-favourites-routing.module';

@NgModule({
  declarations: [MyFavouritesComponent],
  imports: [
    CommonModule,
    MyFavouritesRoutingModule
  ]
})
export class MyFavouritesModule { }
