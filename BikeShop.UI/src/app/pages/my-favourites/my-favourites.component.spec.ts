import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeService } from '../../bike.service';
import { MyFavouritesComponent } from './my-favourites.component';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MockBikesService, bikesResponse } from 'src/app/bike.service.spec';

describe('MyFavouritesComponent', () => {
  let component: MyFavouritesComponent;
  let fixture: ComponentFixture<MyFavouritesComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [MyFavouritesComponent],
      imports: [HttpClientModule],
      providers: [{
        provide: BikeService,
        useClass: MockBikesService
      }]
    });

    MockBikesService.prototype.list = function() {
      return of(bikesResponse);
    }

    fixture = TestBed.createComponent(MyFavouritesComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.removeItem('favouriteBikes');
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call bike service and set variable on method: ngOnInit', () => {
    component.ngOnInit();
    expect(component.bikes).toEqual(bikesResponse);
  });

  it('should handle error after calling bike service on method: ngOnInit', () => {
    spyOn(console, 'log');
    MockBikesService.prototype.list = function() {
      return throwError(() => {return {message: 'Error occured'}});
    }
    component.ngOnInit();
    expect(component.bikes).toEqual([]);
    expect(console.log).toHaveBeenCalled();
  });

  it('should remove bike from favourites', () => {
    const favouriteBikes = ['79204036-aa35-405b-8030-f1562d7a4f18','91d0a29b-f352-47a1-a2b7-1b21f4e8d187'];
    const bikeToRemove = '79204036-aa35-405b-8030-f1562d7a4f18';

    localStorage.setItem('favouriteBikes', JSON.stringify(favouriteBikes));

    component.removeFromFavourites(bikeToRemove);

    const updatedFavourites = JSON.parse(localStorage.getItem('favouriteBikes') || '[]');
    expect(updatedFavourites).toEqual(['91d0a29b-f352-47a1-a2b7-1b21f4e8d187']);
  });

  it('should call updateFavourites after removing from favourites', () => {
    const bikeToRemove = '79204036-aa35-405b-8030-f1562d7a4f18';
    spyOn(component, 'updateFavourites');
    const favouriteBikes = ['79204036-aa35-405b-8030-f1562d7a4f18','91d0a29b-f352-47a1-a2b7-1b21f4e8d187'];
    localStorage.setItem('favouriteBikes', JSON.stringify(favouriteBikes));

    component.removeFromFavourites(bikeToRemove);

    expect(component.updateFavourites).toHaveBeenCalledWith(JSON.stringify(['91d0a29b-f352-47a1-a2b7-1b21f4e8d187']));
  });

  it('should update favourites', () => {
    fixture.detectChanges();
    const favouriteBikes = ['79204036-aa35-405b-8030-f1562d7a4f18','91d0a29b-f352-47a1-a2b7-1b21f4e8d187'];

    component.updateFavourites(JSON.stringify(favouriteBikes));
    fixture.detectChanges();

    expect(component.favouriteBikes).toEqual([
      {
        "manufacturer": "Boardman",
        "ref": "79204036-aa35-405b-8030-f1562d7a4f18",
        "model": "HYB 8.8",
        "category": "Hybrid Electric Bike",
        "price": "€1,020.00",
        "colour": "Blue",
        "weight": "17.5kg",
        "img_url": "/assets/images/bikes/Boardman-HYB-8.png"
      },
      {
        "manufacturer": "Boardman",
        "ref": "91d0a29b-f352-47a1-a2b7-1b21f4e8d187",
        "model": "MHT 8.6",
        "category": "Mountain Bike",
        "price": "€760.00",
        "colour": "Red",
        "weight": "13.5kg",
        "img_url": "/assets/images/bikes/Boardman-MHT-8.png"
      }
    ]);
  });
});
