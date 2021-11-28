import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentProductComponent } from './investment-product.component';

describe('InvestmentProductComponent', () => {
  let component: InvestmentProductComponent;
  let fixture: ComponentFixture<InvestmentProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
