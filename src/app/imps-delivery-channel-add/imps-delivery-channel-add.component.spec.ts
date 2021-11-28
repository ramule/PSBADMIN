import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsDeliveryChannelAddComponent } from './imps-delivery-channel-add.component';

describe('ImpsDeliveryChannelAddComponent', () => {
  let component: ImpsDeliveryChannelAddComponent;
  let fixture: ComponentFixture<ImpsDeliveryChannelAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsDeliveryChannelAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsDeliveryChannelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
