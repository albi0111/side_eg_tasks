import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../bike.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bikes: any[] = [];
  favourites: string[] = [];

  constructor(private bikeService: BikeService) { }

  ngOnInit(): void {
    this.bikeService.list().subscribe({
      next: (response) => {
        this.bikes = response;
        
        // Initialize favourites state from local storage
        const existingFavourites = localStorage.getItem('favouriteBikes');
        if (existingFavourites) {
          try {
            const parsedFavourites: string[] = JSON.parse(existingFavourites);
            this.bikes.forEach(bike => {
              if (parsedFavourites.includes(bike.ref)) {
                bike.inFavourites = true;
              }
            });
          } catch (e) {
            console.error('Failed to parse favourites on initialization', e);
          }
        }
      },
      error: (error) => console.log('Error: ', error)
    });
  }

  markBikeAsFavourite(bikeList: any[], favouriteBikeRef: string) {
    const bikeFound = bikeList.find((bike: any) => bike.ref === favouriteBikeRef);
    if (bikeFound) {
      bikeFound.inFavourites = true;
    }
  }

  addBikeToFavourites(ref: string) {
    this.markBikeAsFavourite(this.bikes, ref);

    const existingFavourites = localStorage.getItem('favouriteBikes');

    if (existingFavourites) {
      try {
        let parsedFavourites: string[] = JSON.parse(existingFavourites);
        if (!parsedFavourites.includes(ref)) {
          parsedFavourites.push(ref);
          localStorage.setItem('favouriteBikes', JSON.stringify(parsedFavourites));
        }
      } catch {
        throw new Error('Failed to parse favourites');
      }
    } else {
      localStorage.setItem('favouriteBikes', JSON.stringify([ref]));
    }
  }
}
