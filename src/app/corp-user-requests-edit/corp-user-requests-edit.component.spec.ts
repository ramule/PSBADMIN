import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpUserRequestsEditComponent } from './corp-user-requests-edit.component';

describe('CorpUserRequestsEditComponent', () => {
  let component: CorpUserRequestsEditComponent;
  let fixture: ComponentFixture<CorpUserRequestsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpUserRequestsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpUserRequestsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
