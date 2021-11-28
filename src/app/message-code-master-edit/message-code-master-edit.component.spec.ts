import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCodeMasterEditComponent } from './message-code-master-edit.component';

describe('MessageCodeMasterEditComponent', () => {
  let component: MessageCodeMasterEditComponent;
  let fixture: ComponentFixture<MessageCodeMasterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCodeMasterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCodeMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
