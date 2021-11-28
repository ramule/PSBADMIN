import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpUserTypeAddComponent } from './corp-user-type-add.component';

describe('CorpUserTypeAddComponent', () => {
  let component: CorpUserTypeAddComponent;
  let fixture: ComponentFixture<CorpUserTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpUserTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpUserTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
