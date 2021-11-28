import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateServiceRequestComponent } from './corporate-service-request.component';

describe('CorporateServiceRequestComponent', () => {
  let component: CorporateServiceRequestComponent;
  let fixture: ComponentFixture<CorporateServiceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateServiceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
