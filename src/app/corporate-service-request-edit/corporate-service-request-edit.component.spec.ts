import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateServiceRequestEditComponent } from './corporate-service-request-edit.component';

describe('CorporateServiceRequestEditComponent', () => {
  let component: CorporateServiceRequestEditComponent;
  let fixture: ComponentFixture<CorporateServiceRequestEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateServiceRequestEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateServiceRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
