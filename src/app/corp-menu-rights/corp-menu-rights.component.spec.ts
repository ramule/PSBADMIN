import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpMenuRightsComponent } from './corp-menu-rights.component';

describe('CorpMenuRightsComponent', () => {
  let component: CorpMenuRightsComponent;
  let fixture: ComponentFixture<CorpMenuRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpMenuRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpMenuRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
