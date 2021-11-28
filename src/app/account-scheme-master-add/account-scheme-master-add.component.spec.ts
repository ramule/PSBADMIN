import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSchemeMasterAddComponent } from './account-scheme-master-add.component';

describe('AccountSchemeMasterAddComponent', () => {
  let component: AccountSchemeMasterAddComponent;
  let fixture: ComponentFixture<AccountSchemeMasterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSchemeMasterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSchemeMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
