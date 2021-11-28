import { TestBed } from '@angular/core/testing';

import { ThemeApplyService } from './theme-apply.service';

describe('ThemeApplyService', () => {
  let service: ThemeApplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeApplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
