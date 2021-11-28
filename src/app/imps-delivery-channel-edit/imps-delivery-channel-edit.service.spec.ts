import { TestBed } from '@angular/core/testing';

import { ImpsDeliveryChannelEditService } from './imps-delivery-channel-edit.service';

describe('ImpsDeliveryChannelEditService', () => {
  let service: ImpsDeliveryChannelEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsDeliveryChannelEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
