import { TestBed } from '@angular/core/testing';

import { ImpsStationsEditService } from './imps-stations-edit.service';

describe('ImpsStationsEditService', () => {
  let service: ImpsStationsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsStationsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
