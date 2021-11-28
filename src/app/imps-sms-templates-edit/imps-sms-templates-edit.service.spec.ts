import { TestBed } from '@angular/core/testing';

import { ImpsSmsTemplatesEditService } from './imps-sms-templates-edit.service';

describe('ImpsSmsTemplatesEditService', () => {
  let service: ImpsSmsTemplatesEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsSmsTemplatesEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
