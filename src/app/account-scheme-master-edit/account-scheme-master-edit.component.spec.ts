import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSchemeMasterEditComponent } from './account-scheme-master-edit.component';

describe('AccountSchemeMasterEditComponent', () => {
  let component: AccountSchemeMasterEditComponent;
  let fixture: ComponentFixture<AccountSchemeMasterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSchemeMasterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSchemeMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
