import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbsMessageTemplateEditComponent } from './cbs-message-template-edit.component';

describe('CbsMessageTemplateEditComponent', () => {
  let component: CbsMessageTemplateEditComponent;
  let fixture: ComponentFixture<CbsMessageTemplateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbsMessageTemplateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbsMessageTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
