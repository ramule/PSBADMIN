import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsPermissionsComponent } from './imps-permissions.component';

describe('ImpsPermissionsComponent', () => {
  let component: ImpsPermissionsComponent;
  let fixture: ComponentFixture<ImpsPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
