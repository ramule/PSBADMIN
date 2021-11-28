import { TestBed } from '@angular/core/testing';

import { DocumentListAddService } from './document-list-add.service';

describe('DocumentListAddService', () => {
  let service: DocumentListAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentListAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
