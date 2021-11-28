import { TestBed } from '@angular/core/testing';
import { MasterSubMenuService } from './master-submenu.service';


describe('MasterMenuService', () => {
  let service: MasterSubMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterSubMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
