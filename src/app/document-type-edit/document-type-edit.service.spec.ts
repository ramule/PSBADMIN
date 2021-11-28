import { TestBed } from '@angular/core/testing';

import { DocumentTypeEditService } from './document-type-edit.service';

describe('DocumentTypeEditService', () => {
  let service: DocumentTypeEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentTypeEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
