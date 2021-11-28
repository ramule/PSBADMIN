import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateActivitySettingsComponent } from './corporate-activity-settings.component';

describe('CorporateActivitySettingsComponent', () => {
  let component: CorporateActivitySettingsComponent;
  let fixture: ComponentFixture<CorporateActivitySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateActivitySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateActivitySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
