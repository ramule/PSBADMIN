import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSchemeMasterComponent } from './account-scheme-master.component';

describe('AccountSchemeMasterComponent', () => {
  let component: AccountSchemeMasterComponent;
  let fixture: ComponentFixture<AccountSchemeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSchemeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSchemeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
