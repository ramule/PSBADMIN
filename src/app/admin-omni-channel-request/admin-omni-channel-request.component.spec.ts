import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOmniChannelRequestComponent } from './admin-omni-channel-request.component';

describe('AdminOmniChannelRequestComponent', () => {
  let component: AdminOmniChannelRequestComponent;
  let fixture: ComponentFixture<AdminOmniChannelRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOmniChannelRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOmniChannelRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
