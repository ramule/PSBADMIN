import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDetailsTableComponent } from './registration-details-table.component';

describe('RegistrationDetailsTableComponent', () => {
  let component: RegistrationDetailsTableComponent;
  let fixture: ComponentFixture<RegistrationDetailsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationDetailsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
