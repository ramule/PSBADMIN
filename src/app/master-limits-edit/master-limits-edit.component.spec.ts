import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLimitsEditComponent } from './master-limits-edit.component';

describe('MasterLimitsEditComponent', () => {
  let component: MasterLimitsEditComponent;
  let fixture: ComponentFixture<MasterLimitsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLimitsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLimitsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
