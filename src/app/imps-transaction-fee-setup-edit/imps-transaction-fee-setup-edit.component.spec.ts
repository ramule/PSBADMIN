import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsTransactionFeeSetupEditComponent } from './imps-transaction-fee-setup-edit.component';

describe('ImpsTransactionFeeSetupEditComponent', () => {
  let component: ImpsTransactionFeeSetupEditComponent;
  let fixture: ComponentFixture<ImpsTransactionFeeSetupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsTransactionFeeSetupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsTransactionFeeSetupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
