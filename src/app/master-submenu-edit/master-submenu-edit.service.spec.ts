import { TestBed } from '@angular/core/testing';
import { MasterSubMenuEditService } from './master-submenu-edit.service';


describe('MasterMenuEditService', () => {
  let service: MasterSubMenuEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterSubMenuEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
