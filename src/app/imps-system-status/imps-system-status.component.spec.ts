import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsSystemStatusComponent } from './imps-system-status.component';

describe('ImpsSystemStatusComponent', () => {
  let component: ImpsSystemStatusComponent;
  let fixture: ComponentFixture<ImpsSystemStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsSystemStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsSystemStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
