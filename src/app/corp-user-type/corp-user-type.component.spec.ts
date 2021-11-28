import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpUserTypeComponent } from './corp-user-type.component';

describe('CorpUserTypeComponent', () => {
  let component: CorpUserTypeComponent;
  let fixture: ComponentFixture<CorpUserTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpUserTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
