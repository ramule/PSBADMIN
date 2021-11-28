import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTokenGenerationComponent } from './bank-token-generation.component';

describe('BankTokenGenerationComponent', () => {
  let component: BankTokenGenerationComponent;
  let fixture: ComponentFixture<BankTokenGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankTokenGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankTokenGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
