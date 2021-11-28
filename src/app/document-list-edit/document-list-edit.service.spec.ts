import { TestBed } from '@angular/core/testing';

import { DocumentListEditService } from './document-list-edit.service';

describe('DocumentListEditService', () => {
  let service: DocumentListEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentListEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
