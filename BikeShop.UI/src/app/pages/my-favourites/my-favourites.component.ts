import { BikeService } from '../../bike.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.scss']
})
export class MyFavouritesComponent implements OnInit {
  bikes: any[] = [];
  favouriteBikes: any[] = [];

  constructor(private bikeService: BikeService) { }

  ngOnInit(): void {
    const storedFavourites = localStorage.getItem('favouriteBikes') ?? '[]';

    this.bikeService.list().subscribe({
      next: (response) => {
        this.bikes = response;
        this.updateFavourites(storedFavourites);
      },
      error: (error) => console.log('Error: ', error)
    });
  }

  removeFromFavourites(ref: string) {
    const favourites = JSON.parse(localStorage.getItem('favouriteBikes') || '[]');
    const newFavourites = favourites.filter((bikeRef: string) => bikeRef !== ref);

    localStorage.setItem('favouriteBikes', JSON.stringify(newFavourites));
    this.updateFavourites(JSON.stringify(newFavourites));
  }

  updateFavourites(favourites: string) {
    this.favouriteBikes = [];
    const favouritesArray = JSON.parse(favourites);

    if (favouritesArray && favouritesArray.length) {
      favouritesArray.forEach((ref: string) => {
        const bikeInfo = this.bikes.find((bike: any) => bike.ref === ref);
        this.favouriteBikes.push(bikeInfo);
      });
    }
  }
}
