import { TestBed } from '@angular/core/testing';

import { ImpsDeliveryChannelService } from './imps-delivery-channel.service';

describe('ImpsDeliveryChannelService', () => {
  let service: ImpsDeliveryChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsDeliveryChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
