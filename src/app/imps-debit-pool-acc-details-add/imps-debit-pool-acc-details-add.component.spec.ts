import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsDebitPoolAccDetailsAddComponent } from './imps-debit-pool-acc-details-add.component';

describe('ImpsDebitPoolAccDetailsAddComponent', () => {
  let component: ImpsDebitPoolAccDetailsAddComponent;
  let fixture: ComponentFixture<ImpsDebitPoolAccDetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsDebitPoolAccDetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsDebitPoolAccDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
