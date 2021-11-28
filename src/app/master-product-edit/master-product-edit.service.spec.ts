import { TestBed } from '@angular/core/testing';
import { MasterProductEditService } from './master-product-edit.service';


describe('MasterProductEditService', () => {
  let service: MasterProductEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterProductEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
