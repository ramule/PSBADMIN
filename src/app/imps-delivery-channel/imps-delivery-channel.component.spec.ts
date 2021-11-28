import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsDeliveryChannelComponent } from './imps-delivery-channel.component';

describe('ImpsDeliveryChannelComponent', () => {
  let component: ImpsDeliveryChannelComponent;
  let fixture: ComponentFixture<ImpsDeliveryChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsDeliveryChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsDeliveryChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
