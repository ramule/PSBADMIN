import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpCompanyRequestsEditComponent } from './corp-company-requests-edit.component';

describe('CorpCompanyRequestsEditComponent', () => {
  let component: CorpCompanyRequestsEditComponent;
  let fixture: ComponentFixture<CorpCompanyRequestsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpCompanyRequestsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpCompanyRequestsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
