import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessSubmenuRightsComponent } from './access-submenu-rights.component';

describe('AccessSubmenuRightsComponent', () => {
  let component: AccessSubmenuRightsComponent;
  let fixture: ComponentFixture<AccessSubmenuRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessSubmenuRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessSubmenuRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
