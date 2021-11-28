import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsConnectionStatusComponent } from './imps-connection-status.component';

describe('ImpsConnectionStatusComponent', () => {
  let component: ImpsConnectionStatusComponent;
  let fixture: ComponentFixture<ImpsConnectionStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsConnectionStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsConnectionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
