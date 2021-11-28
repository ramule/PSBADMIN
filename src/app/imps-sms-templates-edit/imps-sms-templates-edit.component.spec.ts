import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsSmsTemplatesEditComponent } from './imps-sms-templates-edit.component';

describe('ImpsSmsTemplatesEditComponent', () => {
  let component: ImpsSmsTemplatesEditComponent;
  let fixture: ComponentFixture<ImpsSmsTemplatesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsSmsTemplatesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsSmsTemplatesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
