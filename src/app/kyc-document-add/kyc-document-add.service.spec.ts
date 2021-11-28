import { TestBed } from '@angular/core/testing';

import { KycDocumentAddService } from './kyc-document-add.service';

describe('KycDocumentAddService', () => {
  let service: KycDocumentAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KycDocumentAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
