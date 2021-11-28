import { TestBed } from '@angular/core/testing';

import { CorporateSecurityQuestionService } from './corporate-security-question.service';

describe('CorporateSecurityQuestionService', () => {
  let service: CorporateSecurityQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateSecurityQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
