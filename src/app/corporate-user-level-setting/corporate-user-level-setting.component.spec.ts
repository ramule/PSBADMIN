import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserLevelSettingComponent } from './corporate-user-level-setting.component';

describe('CorporateUserLevelSettingComponent', () => {
  let component: CorporateUserLevelSettingComponent;
  let fixture: ComponentFixture<CorporateUserLevelSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserLevelSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserLevelSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
