import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsLogsComponent } from './transactions-logs.component';

describe('TransactionsLogsComponent', () => {
  let component: TransactionsLogsComponent;
  let fixture: ComponentFixture<TransactionsLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
