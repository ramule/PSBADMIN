import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskingRulesAddComponent } from './masking-rules-add.component';

describe('MaskingRulesAddComponent', () => {
  let component: MaskingRulesAddComponent;
  let fixture: ComponentFixture<MaskingRulesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskingRulesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskingRulesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
