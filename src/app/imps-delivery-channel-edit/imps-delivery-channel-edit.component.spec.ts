import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsDeliveryChannelEditComponent } from './imps-delivery-channel-edit.component';

describe('ImpsDeliveryChannelEditComponent', () => {
  let component: ImpsDeliveryChannelEditComponent;
  let fixture: ComponentFixture<ImpsDeliveryChannelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsDeliveryChannelEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsDeliveryChannelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
