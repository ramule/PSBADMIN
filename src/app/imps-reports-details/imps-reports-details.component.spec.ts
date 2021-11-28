import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsReportsDetailsComponent } from './imps-reports-details.component';

describe('ImpsReportsDetailsComponent', () => {
  let component: ImpsReportsDetailsComponent;
  let fixture: ComponentFixture<ImpsReportsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsReportsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsReportsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
