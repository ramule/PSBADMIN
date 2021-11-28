import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCountryComponent } from './master-country.component';

describe('MasterCountryComponent', () => {
  let component: MasterCountryComponent;
  let fixture: ComponentFixture<MasterCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
