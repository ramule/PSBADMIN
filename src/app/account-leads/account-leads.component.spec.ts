import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLeadsComponent } from './account-leads.component';

describe('AccountLeadsComponent', () => {
  let component: AccountLeadsComponent;
  let fixture: ComponentFixture<AccountLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
