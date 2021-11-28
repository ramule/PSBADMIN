import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsSmsTemplatesAddComponent } from './imps-sms-templates-add.component';

describe('ImpsSmsTemplatesAddComponent', () => {
  let component: ImpsSmsTemplatesAddComponent;
  let fixture: ComponentFixture<ImpsSmsTemplatesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsSmsTemplatesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsSmsTemplatesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
