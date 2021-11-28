import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFacilityEditComponent } from './master-facility-edit.component';

describe('MasterFacilityEditComponent', () => {
  let component: MasterFacilityEditComponent;
  let fixture: ComponentFixture<MasterFacilityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterFacilityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFacilityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
