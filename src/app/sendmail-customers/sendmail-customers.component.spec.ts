import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmailCustomersComponent } from './sendmail-customers.component';

describe('SendmailCustomersComponent', () => {
  let component: SendmailCustomersComponent;
  let fixture: ComponentFixture<SendmailCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendmailCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendmailCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
