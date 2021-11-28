import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCalculatorEditComponent } from './master-calculator-edit.component';

describe('MasterCalculatorEditComponent', () => {
  let component: MasterCalculatorEditComponent;
  let fixture: ComponentFixture<MasterCalculatorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCalculatorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCalculatorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
