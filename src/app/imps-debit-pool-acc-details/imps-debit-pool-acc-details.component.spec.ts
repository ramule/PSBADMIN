import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsDebitPoolAccDetailsComponent } from './imps-debit-pool-acc-details.component';

describe('ImpsDebitPoolAccDetailsComponent', () => {
  let component: ImpsDebitPoolAccDetailsComponent;
  let fixture: ComponentFixture<ImpsDebitPoolAccDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsDebitPoolAccDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsDebitPoolAccDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
