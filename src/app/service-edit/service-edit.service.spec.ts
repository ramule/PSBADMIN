import { TestBed } from '@angular/core/testing';

import { ServiceEditService } from './service-edit.service';

describe('ServiceEditService', () => {
  let service: ServiceEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
