import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCalculatorComponent } from './master-calculator.component';

describe('MasterCalculatorComponent', () => {
  let component: MasterCalculatorComponent;
  let fixture: ComponentFixture<MasterCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
