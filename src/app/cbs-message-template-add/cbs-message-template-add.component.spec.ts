import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbsMessageTemplateAddComponent } from './cbs-message-template-add.component';

describe('CbsMessageTemplateAddComponent', () => {
  let component: CbsMessageTemplateAddComponent;
  let fixture: ComponentFixture<CbsMessageTemplateAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbsMessageTemplateAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbsMessageTemplateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
