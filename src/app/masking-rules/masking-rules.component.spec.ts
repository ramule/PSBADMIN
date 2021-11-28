import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskingRulesComponent } from './masking-rules.component';

describe('MaskingRulesComponent', () => {
  let component: MaskingRulesComponent;
  let fixture: ComponentFixture<MaskingRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskingRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskingRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
