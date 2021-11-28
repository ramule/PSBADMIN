import { TestBed } from '@angular/core/testing';

import { MasterLanguageEditService } from './master-language-edit.service';

describe('MasterLanguageEditService', () => {
  let service: MasterLanguageEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterLanguageEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
