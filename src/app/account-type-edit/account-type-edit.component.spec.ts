import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTypeEditComponent } from './account-type-edit.component';

describe('AccountTypeEditComponent', () => {
  let component: AccountTypeEditComponent;
  let fixture: ComponentFixture<AccountTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
