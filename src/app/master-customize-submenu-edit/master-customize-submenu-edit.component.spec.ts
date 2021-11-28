import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCustomizeSubmenuEditComponent } from './master-customize-submenu-edit.component';

describe('MasterCustomizeSubmenuEditComponent', () => {
  let component: MasterCustomizeSubmenuEditComponent;
  let fixture: ComponentFixture<MasterCustomizeSubmenuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCustomizeSubmenuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCustomizeSubmenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
