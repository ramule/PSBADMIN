import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbsMessageTemplateComponent } from './cbs-message-template.component';

describe('CbsMessageTemplateComponent', () => {
  let component: CbsMessageTemplateComponent;
  let fixture: ComponentFixture<CbsMessageTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbsMessageTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbsMessageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
