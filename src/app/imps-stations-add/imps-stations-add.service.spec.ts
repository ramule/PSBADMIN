import { TestBed } from '@angular/core/testing';

import { ImpsStationsAddService } from './imps-stations-add.service';

describe('ImpsStationsAddService', () => {
  let service: ImpsStationsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsStationsAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
