import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLimitsComponent } from './master-limits.component';

describe('MasterLimitsComponent', () => {
  let component: MasterLimitsComponent;
  let fixture: ComponentFixture<MasterLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
