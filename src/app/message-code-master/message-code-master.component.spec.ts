import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCodeMasterComponent } from './message-code-master.component';

describe('MessageCodeMasterComponent', () => {
  let component: MessageCodeMasterComponent;
  let fixture: ComponentFixture<MessageCodeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCodeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCodeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
