import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskingRulesEditComponent } from './masking-rules-edit.component';

describe('MaskingRulesEditComponent', () => {
  let component: MaskingRulesEditComponent;
  let fixture: ComponentFixture<MaskingRulesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskingRulesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskingRulesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
