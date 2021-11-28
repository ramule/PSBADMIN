import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsPermissionsEditComponent } from './imps-permissions-edit.component';

describe('ImpsPermissionsEditComponent', () => {
  let component: ImpsPermissionsEditComponent;
  let fixture: ComponentFixture<ImpsPermissionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsPermissionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsPermissionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
