import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsSearchTransactionComponent } from './imps-search-transaction.component';

describe('ImpsSearchTransactionComponent', () => {
  let component: ImpsSearchTransactionComponent;
  let fixture: ComponentFixture<ImpsSearchTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsSearchTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsSearchTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
