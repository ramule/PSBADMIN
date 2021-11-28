import { TestBed } from '@angular/core/testing';

import { AdminOmniChannelRequestEditService } from './admin-omni-channel-request-edit.service';

describe('AdminOmniChannelRequestEditService', () => {
  let service: AdminOmniChannelRequestEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOmniChannelRequestEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
