import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsSystemConfigEditComponent } from './imps-system-config-edit.component';

describe('ImpsSystemConfigEditComponent', () => {
  let component: ImpsSystemConfigEditComponent;
  let fixture: ComponentFixture<ImpsSystemConfigEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsSystemConfigEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsSystemConfigEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
