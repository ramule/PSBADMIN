import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsDebitPoolAccDetailsEditComponent } from './imps-debit-pool-acc-details-edit.component';

describe('ImpsDebitPoolAccDetailsEditComponent', () => {
  let component: ImpsDebitPoolAccDetailsEditComponent;
  let fixture: ComponentFixture<ImpsDebitPoolAccDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsDebitPoolAccDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsDebitPoolAccDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
