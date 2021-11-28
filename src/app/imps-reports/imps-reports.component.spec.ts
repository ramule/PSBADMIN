import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsReportsComponent } from './imps-reports.component';

describe('ImpsReportsComponent', () => {
  let component: ImpsReportsComponent;
  let fixture: ComponentFixture<ImpsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
