import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserLevelSettingEditComponent } from './corporate-user-level-setting-edit.component';

describe('CorporateUserLevelSettingEditComponent', () => {
  let component: CorporateUserLevelSettingEditComponent;
  let fixture: ComponentFixture<CorporateUserLevelSettingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserLevelSettingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserLevelSettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
