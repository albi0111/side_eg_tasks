import { Component } from '@angular/core';
import { BikeService } from '../../bike.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-bike',
  templateUrl: './create-bike.component.html',
  styleUrls: []
})
export class CreateBikeComponent {
  bike: any = {
    manufacturer: '',
    model: '',
    category: 'Mountain Bike',
    price: '',
    colour: '',
    weight: '',
    img_url: '/assets/images/bikes/Assist-Hybrid-Electric-Bike.png' // Default placeholder image
  };

  constructor(private bikeService: BikeService, private router: Router) { }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.bike.img_url = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.bikeService.create(this.bike).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Failed to create bike', err);
      }
    });
  }
}
