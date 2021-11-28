import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCountryAddComponent } from './master-country-add.component';

describe('MasterCountryAddComponent', () => {
  let component: MasterCountryAddComponent;
  let fixture: ComponentFixture<MasterCountryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCountryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCountryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
