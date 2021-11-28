import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTokenComponent } from './bank-token.component';

describe('BankTokenComponent', () => {
  let component: BankTokenComponent;
  let fixture: ComponentFixture<BankTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
