import { TestBed } from '@angular/core/testing';

import { ImpsStationsService } from './imps-stations.service';

describe('ImpsStationsService', () => {
  let service: ImpsStationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsStationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
