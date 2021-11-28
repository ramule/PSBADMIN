import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorFormulaAddComponent } from './calculator-formula-add.component';

describe('CalculatorFormulaAddComponent', () => {
  let component: CalculatorFormulaAddComponent;
  let fixture: ComponentFixture<CalculatorFormulaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorFormulaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorFormulaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
