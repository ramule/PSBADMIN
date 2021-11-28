import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySettingEditComponent } from './activity-setting-edit.component';

describe('ActivitySettingEditComponent', () => {
  let component: ActivitySettingEditComponent;
  let fixture: ComponentFixture<ActivitySettingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitySettingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
