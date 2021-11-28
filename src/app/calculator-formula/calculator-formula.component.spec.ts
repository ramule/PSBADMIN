import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorFormulaComponent } from './calculator-formula.component';

describe('CalculatorFormulaComponent', () => {
  let component: CalculatorFormulaComponent;
  let fixture: ComponentFixture<CalculatorFormulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorFormulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
