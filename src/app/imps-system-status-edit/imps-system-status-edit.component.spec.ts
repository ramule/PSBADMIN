import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsSystemStatusEditComponent } from './imps-system-status-edit.component';

describe('ImpsSystemStatusEditComponent', () => {
  let component: ImpsSystemStatusEditComponent;
  let fixture: ComponentFixture<ImpsSystemStatusEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsSystemStatusEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsSystemStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
