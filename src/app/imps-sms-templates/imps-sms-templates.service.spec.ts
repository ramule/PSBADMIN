import { TestBed } from '@angular/core/testing';

import { ImpsSmsTemplatesService } from './imps-sms-templates.service';

describe('ImpsSmsTemplatesService', () => {
  let service: ImpsSmsTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsSmsTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
