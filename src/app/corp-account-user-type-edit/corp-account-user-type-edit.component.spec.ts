import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpAccountUserTypeEditComponent } from './corp-account-user-type-edit.component';

describe('CorpAccountUserTypeEditComponent', () => {
  let component: CorpAccountUserTypeEditComponent;
  let fixture: ComponentFixture<CorpAccountUserTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpAccountUserTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpAccountUserTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
