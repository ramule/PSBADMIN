import { TestBed } from '@angular/core/testing';

import { KycFolderAddService } from './kyc-folder-add.service';

describe('KycFolderAddService', () => {
  let service: KycFolderAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KycFolderAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
