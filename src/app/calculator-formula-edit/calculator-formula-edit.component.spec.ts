import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorFormulaEditComponent } from './calculator-formula-edit.component';

describe('CalculatorFormulaEditComponent', () => {
  let component: CalculatorFormulaEditComponent;
  let fixture: ComponentFixture<CalculatorFormulaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorFormulaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorFormulaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
