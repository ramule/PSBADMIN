import { TestBed } from '@angular/core/testing';

import { KycDocumentListService } from './kyc-document-list.service';

describe('KycDocumentListService', () => {
  let service: KycDocumentListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KycDocumentListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
