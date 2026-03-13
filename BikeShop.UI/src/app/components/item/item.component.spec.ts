import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';

export const mockBike = {
  "manufacturer": "Carrera",
  "ref": "07e9548b-f35e-4e00-99d7-e49b5fb08907",
  "model": "Karkinos",
  "category": "Mountain Bike",
  "price": "€415.00",
  "colour": "Red",
  "weight": "14kg",
  "img_url": "/assets/images/bikes/Carrera-Karkinos-Mountain-Bike.png"
}

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.bike = mockBike;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a new bike to favourites', () => {
    spyOn(component.addToFavourites, 'emit');
    component.addBikeToFavourites('07e9548b-f35e-4e00-99d7-e49b5fb08907');
    expect(component.addToFavourites.emit).toHaveBeenCalledWith('07e9548b-f35e-4e00-99d7-e49b5fb08907');
  });
});
