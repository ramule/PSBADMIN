import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsReportsEditComponent } from './imps-reports-edit.component';

describe('ImpsReportsEditComponent', () => {
  let component: ImpsReportsEditComponent;
  let fixture: ComponentFixture<ImpsReportsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsReportsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsReportsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
