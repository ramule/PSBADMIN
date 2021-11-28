import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentProductAddComponent } from './investment-product-add.component';

describe('InvestmentProductAddComponent', () => {
  let component: InvestmentProductAddComponent;
  let fixture: ComponentFixture<InvestmentProductAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentProductAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
