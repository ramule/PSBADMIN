import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOmniChannelRequestEditComponent } from './admin-omni-channel-request-edit.component';

describe('AdminOmniChannelRequestEditComponent', () => {
  let component: AdminOmniChannelRequestEditComponent;
  let fixture: ComponentFixture<AdminOmniChannelRequestEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOmniChannelRequestEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOmniChannelRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
