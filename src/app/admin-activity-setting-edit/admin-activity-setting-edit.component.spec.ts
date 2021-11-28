import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActivitySettingEditComponent } from './admin-activity-setting-edit.component';

describe('AdminActivitySettingEditComponent', () => {
  let component: AdminActivitySettingEditComponent;
  let fixture: ComponentFixture<AdminActivitySettingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActivitySettingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActivitySettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
