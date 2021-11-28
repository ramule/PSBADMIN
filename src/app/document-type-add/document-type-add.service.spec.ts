import { TestBed } from '@angular/core/testing';

import { DocumentTypeAddService } from './document-type-add.service';

describe('DocumentTypeAddService', () => {
  let service: DocumentTypeAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentTypeAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
