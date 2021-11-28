import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsSmsTemplatesComponent } from './imps-sms-templates.component';

describe('ImpsSmsTemplatesComponent', () => {
  let component: ImpsSmsTemplatesComponent;
  let fixture: ComponentFixture<ImpsSmsTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsSmsTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsSmsTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
