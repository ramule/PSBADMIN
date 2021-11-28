import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpCompanyRequestsComponent } from './corp-company-requests.component';

describe('CorpCompanyRequestsComponent', () => {
  let component: CorpCompanyRequestsComponent;
  let fixture: ComponentFixture<CorpCompanyRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpCompanyRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpCompanyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
