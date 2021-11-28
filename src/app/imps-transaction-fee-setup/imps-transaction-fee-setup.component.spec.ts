import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsTransactionFeeSetupComponent } from './imps-transaction-fee-setup.component';

describe('ImpsTransactionFeeSetupComponent', () => {
  let component: ImpsTransactionFeeSetupComponent;
  let fixture: ComponentFixture<ImpsTransactionFeeSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsTransactionFeeSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsTransactionFeeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
