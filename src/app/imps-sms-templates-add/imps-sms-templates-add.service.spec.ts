import { TestBed } from '@angular/core/testing';

import { ImpsSmsTemplatesAddService } from './imps-sms-templates-add.service';

describe('ImpsSmsTemplatesAddService', () => {
  let service: ImpsSmsTemplatesAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsSmsTemplatesAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
