import { TestBed } from '@angular/core/testing';

import { ThemeApplyEditService } from './theme-apply-edit.service';

describe('ThemeApplyEditService', () => {
  let service: ThemeApplyEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeApplyEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
