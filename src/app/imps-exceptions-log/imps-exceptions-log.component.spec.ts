import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsExceptionsLogComponent } from './imps-exceptions-log.component';

describe('ImpsExceptionsLogComponent', () => {
  let component: ImpsExceptionsLogComponent;
  let fixture: ComponentFixture<ImpsExceptionsLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsExceptionsLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsExceptionsLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
