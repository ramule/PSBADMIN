import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTransactionsLimitsComponent } from './master-transactions-limits.component';

describe('MasterTransactionsLimitsComponent', () => {
  let component: MasterTransactionsLimitsComponent;
  let fixture: ComponentFixture<MasterTransactionsLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTransactionsLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTransactionsLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
