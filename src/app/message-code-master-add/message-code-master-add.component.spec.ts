import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCodeMasterAddComponent } from './message-code-master-add.component';

describe('MessageCodeMasterAddComponent', () => {
  let component: MessageCodeMasterAddComponent;
  let fixture: ComponentFixture<MessageCodeMasterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCodeMasterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCodeMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
