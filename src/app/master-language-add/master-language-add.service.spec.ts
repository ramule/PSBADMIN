import { TestBed } from '@angular/core/testing';

import { MasterLanguageAddService } from './master-language-add.service';

describe('MasterLanguageAddService', () => {
  let service: MasterLanguageAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterLanguageAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
