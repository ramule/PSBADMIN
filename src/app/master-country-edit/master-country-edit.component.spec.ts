import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCountryEditComponent } from './master-country-edit.component';

describe('MasterCountryEditComponent', () => {
  let component: MasterCountryEditComponent;
  let fixture: ComponentFixture<MasterCountryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCountryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCountryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
