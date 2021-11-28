import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsReportsAddComponent } from './imps-reports-add.component';

describe('ImpsReportsAddComponent', () => {
  let component: ImpsReportsAddComponent;
  let fixture: ComponentFixture<ImpsReportsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsReportsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsReportsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
