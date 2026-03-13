import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeService } from '../../bike.service';
import { HomeComponent } from './home.component';
import { of, throwError } from 'rxjs';
import { ItemComponent } from 'src/app/components/item/item.component';
import { HttpClientModule } from '@angular/common/http';
import { MockBikesService, bikesResponse } from 'src/app/bike.service.spec';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, ItemComponent],
      providers: [{
        provide: BikeService,
        useClass: MockBikesService
      }],
      imports: [HttpClientModule]
    });

    MockBikesService.prototype.list = function() {
      return of(bikesResponse);
    }

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.removeItem('favouriteBikes');
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
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

  it('should mark a bike as favorite', () => {
    component.ngOnInit();
    component.markBikeAsFavourite(bikesResponse, '07e9548b-f35e-4e00-99d7-e49b5fb08907');
    const bikeFound = component.bikes.find((bike) => bike.ref === '07e9548b-f35e-4e00-99d7-e49b5fb08907') || component.bikes[0];
    expect(bikeFound.inFavourites).toBe(true);
  });

  it('method: addBikeToFavourites should add bike to favourites', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(['07e9548b-f35e-4e00-99d7-e49b5fb08907']));
    spyOn(localStorage, 'setItem');

    component.addBikeToFavourites('62343d00-1503-43fb-9db4-80cd06d24345');

    expect(localStorage.setItem).toHaveBeenCalledWith('favouriteBikes', JSON.stringify(['07e9548b-f35e-4e00-99d7-e49b5fb08907', '62343d00-1503-43fb-9db4-80cd06d24345']));
  });

  it('method: addBikeToFavourites should create favourites array if it does not exist', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');

    component.addBikeToFavourites('62343d00-1503-43fb-9db4-80cd06d24345');

    expect(localStorage.setItem).toHaveBeenCalledWith('favouriteBikes', JSON.stringify(['62343d00-1503-43fb-9db4-80cd06d24345']));
  });

  it('method: addBikeToFavourites should throw an error if parsing fails', () => {
    const getItemSpy = spyOn(localStorage, 'getItem').and.returnValue('invalid-json');

    expect(() => {
      component.addBikeToFavourites('123');
    }).toThrowError(Error, 'Failed to parse favourites');

    expect(getItemSpy).toHaveBeenCalledWith('favouriteBikes');
  });

});
