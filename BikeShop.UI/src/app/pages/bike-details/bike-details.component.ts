import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../bike.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bike-details',
  templateUrl: './bike-details.component.html',
  styleUrls: []
})
export class BikeDetailsComponent implements OnInit {
  bike: any;
  loading: boolean = true;

  constructor(private bikeService: BikeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bikeService.getById(id).subscribe({
        next: (res) => {
          this.bike = res;
          this.checkIfFavourite();
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load bike details', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  checkIfFavourite(): void {
    if (this.bike) {
      const existingFavourites = localStorage.getItem('favouriteBikes');
      if (existingFavourites) {
        try {
          const parsedFavourites: string[] = JSON.parse(existingFavourites);
          if (parsedFavourites.includes(this.bike.ref)) {
            this.bike.inFavourites = true;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  toggleFavourite(): void {
    if (!this.bike) return;

    const existingFavourites = localStorage.getItem('favouriteBikes');
    let parsedFavourites: string[] = [];

    if (existingFavourites) {
      try {
        parsedFavourites = JSON.parse(existingFavourites);
      } catch (e) {
        console.error(e);
      }
    }

    if (this.bike.inFavourites) {
      parsedFavourites = parsedFavourites.filter(ref => ref !== this.bike.ref);
      this.bike.inFavourites = false;
    } else {
      if (!parsedFavourites.includes(this.bike.ref)) {
        parsedFavourites.push(this.bike.ref);
      }
      this.bike.inFavourites = true;
    }

    localStorage.setItem('favouriteBikes', JSON.stringify(parsedFavourites));
  }
}
