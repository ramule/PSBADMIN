import { TestBed } from '@angular/core/testing';

import { ImpsDeliveryChannelAddService } from './imps-delivery-channel-add.service';

describe('ImpsDeliveryChannelAddService', () => {
  let service: ImpsDeliveryChannelAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsDeliveryChannelAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
