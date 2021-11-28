import { TestBed } from '@angular/core/testing';

import { ThemeDetailsService } from './theme-details.service';

describe('ThemeDetailsService', () => {
  let service: ThemeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
