import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsTransactionDashboardComponent } from './imps-transaction-dashboard.component';

describe('ImpsTransactionDashboardComponent', () => {
  let component: ImpsTransactionDashboardComponent;
  let fixture: ComponentFixture<ImpsTransactionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsTransactionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsTransactionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
