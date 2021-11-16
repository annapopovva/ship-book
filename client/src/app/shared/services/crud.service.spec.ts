import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ShipModel } from '../models/ship';
import { CrudService } from './crud.service';
import { ErrorHandlingService } from './error-handling.service';

describe('CrudService', () => {
  let injector: TestBed,
      service: CrudService,
      httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CrudService,
        ErrorHandlingService
      ]
    });

    injector = getTestBed();
    service = injector.get(CrudService); //&& TestBed.get(ErrorHandlingService)
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Get ALL SHIPS
  const dummyShipsListResponse: ShipModel[] = [
    {
        "_id": "61783c28ca079ee2e5e1887b",
        "name": "TestShip",
        "imo": "34563456",
        "type": "container",
        "owner": "Anna",
        "email": "anna@abv.bg",
        "pictures": [
            "http://localhost:5000/uploads/Left_Right_Brain.jpg.jpeg"
        ]
    },
    {
        "_id": "6179b6b7a30a1380afd4fae3",
        "name": "Multiple",
        "imo": "IMO",
        "type": "container",
        "owner": "Pictures",
        "email": "pictures@icb.bg",
        "pictures": [
            "http://localhost:5000/uploads/1635366583737_396407.jpg"
        ]
    },
    {
        "_id": "6179ca98ed1e19de3e1dc669",
        "name": "TestPictures",
        "imo": "IMO",
        "type": "cruise",
        "owner": "Anna",
        "email": "pictures@icb.bg",
        "pictures": [
            "http://localhost:5000/uploads/1635371672189_1_ALAe2FzCrCWY5j8_kUzY7A.png",
            "http://localhost:5000/uploads/1635371672217_18-189506_desktopography-creative-hd-4k-wallpapers-for-pc.jpg",
            "http://localhost:5000/uploads/1635371672233_396407.jpg"
        ]
    }
];
       

  it('should retrieve data for all ships', () => {
    service.getAllShips().subscribe(res => {
      expect(res).toEqual(dummyShipsListResponse);
    });

    const req = httpMock.expectOne('http://localhost:5000/ships');
    expect(req.request.method).toBe('GET');
    req.flush(dummyShipsListResponse);
  });

  // Get ONE SHIP
  const dummyShipDataResponse: ShipModel = 
    {
        "_id": "61783c28ca079ee2e5e1887b",
        "name": "TestShip",
        "imo": "34563456",
        "type": "container",
        "owner": "Anna",
        "email": "anna@abv.bg",
        "pictures": [
            "http://localhost:5000/uploads/Left_Right_Brain.jpg.jpeg"
        ]
    };
    
    const shipId = '61783c28ca079ee2e5e1887b';

  it('should return data for one specific ship', () => {
    service.getShipById(shipId).subscribe(res => {
      expect(res).toEqual(dummyShipDataResponse)
    });

    const req = httpMock.expectOne(`http://localhost:5000/ships/read/${shipId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyShipDataResponse);
  });

  // Add NEW SHIP
  const dummyShipFormData: FormData =  
  {
    "name": "TestShip",
    "imo": "34563456",
    "type": "container",
    "owner": "Anna",
    "email": "anna@abv.bg",
    "pictures": [
        "http://localhost:5000/uploads/Left_Right_Brain.jpg.jpeg"
    ]
  };

  it('should save a new ship to the database', () => {
    service.createShip(dummyShipFormData).subscribe(res => {
      expect(res).toEqual(dummyShipFormData);
    });

    const req = httpMock.expectOne('http://localhost:5000/ships/create', dummyShipFormData);
    expect(req.request.method).toBe('POST')
    req.flush({ msg: 'Success' });
  })
});
