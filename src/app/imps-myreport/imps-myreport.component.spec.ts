import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsMyreportComponent } from './imps-myreport.component';

describe('ImpsMyreportComponent', () => {
  let component: ImpsMyreportComponent;
  let fixture: ComponentFixture<ImpsMyreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsMyreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsMyreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
