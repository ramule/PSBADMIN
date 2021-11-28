import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiTransactionsComponent } from './upi-transactions.component';

describe('UpiTransactionsComponent', () => {
  let component: UpiTransactionsComponent;
  let fixture: ComponentFixture<UpiTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpiTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpiTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
