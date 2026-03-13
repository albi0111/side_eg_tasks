import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyFavouritesComponent } from './my-favourites.component';

const routes: Routes = [{ path: '', component: MyFavouritesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFavouritesRoutingModule { }
