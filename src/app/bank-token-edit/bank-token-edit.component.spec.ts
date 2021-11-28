import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTokenEditComponent } from './bank-token-edit.component';

describe('BankTokenEditComponent', () => {
  let component: BankTokenEditComponent;
  let fixture: ComponentFixture<BankTokenEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankTokenEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankTokenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
