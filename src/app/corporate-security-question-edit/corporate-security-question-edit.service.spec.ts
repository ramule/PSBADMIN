import { TestBed } from '@angular/core/testing';

import { CorporateSecurityQuestionEditService } from './corporate-security-question-edit.service';

describe('CorporateSecurityQuestionEditService', () => {
  let service: CorporateSecurityQuestionEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateSecurityQuestionEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
