import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLimitsAddComponent } from './master-limits-add.component';

describe('MasterLimitsAddComponent', () => {
  let component: MasterLimitsAddComponent;
  let fixture: ComponentFixture<MasterLimitsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLimitsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLimitsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
