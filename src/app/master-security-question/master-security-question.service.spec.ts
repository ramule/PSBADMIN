import { TestBed } from '@angular/core/testing';
import { MasterSecurityQuestionService } from './master-security-question.service';

describe('MasterSecurityQuestionService', () => {
  let service: MasterSecurityQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterSecurityQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
