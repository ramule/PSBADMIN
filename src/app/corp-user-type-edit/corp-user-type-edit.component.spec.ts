import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpUserTypeEditComponent } from './corp-user-type-edit.component';

describe('CorpUserTypeEditComponent', () => {
  let component: CorpUserTypeEditComponent;
  let fixture: ComponentFixture<CorpUserTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpUserTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpUserTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
