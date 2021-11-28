import { TestBed } from '@angular/core/testing';

import { MasterLanguageKeyService } from './master-language-key.service';

describe('MasterLanguageKeyService', () => {
  let service: MasterLanguageKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterLanguageKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
