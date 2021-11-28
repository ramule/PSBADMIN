import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCheckerRequestsComponent } from './corporate-checker-requests.component';

describe('CorporateCheckerRequestsComponent', () => {
  let component: CorporateCheckerRequestsComponent;
  let fixture: ComponentFixture<CorporateCheckerRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCheckerRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCheckerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
