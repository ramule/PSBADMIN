import { TestBed } from '@angular/core/testing';
import { MasterSecurityQuestionEditService } from './master-security-question-edit.service';

describe('MasterSecurityQuestionEditService', () => {
  let service: MasterSecurityQuestionEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterSecurityQuestionEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
