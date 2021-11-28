import { TestBed } from '@angular/core/testing';

import { MasterLanguageService } from './master-language.service';

describe('MasterLanguageService', () => {
  let service: MasterLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
