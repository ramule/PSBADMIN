import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserLevelSettingAddComponent } from './corporate-user-level-setting-add.component';

describe('CorporateUserLevelSettingAddComponent', () => {
  let component: CorporateUserLevelSettingAddComponent;
  let fixture: ComponentFixture<CorporateUserLevelSettingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserLevelSettingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserLevelSettingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
