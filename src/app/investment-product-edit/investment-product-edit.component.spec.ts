import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentProductEditComponent } from './investment-product-edit.component';

describe('InvestmentProductEditComponent', () => {
  let component: InvestmentProductEditComponent;
  let fixture: ComponentFixture<InvestmentProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentProductEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
