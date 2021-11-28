import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCustomizeSubmenuAddComponent } from './master-customize-submenu-add.component';

describe('MasterCustomizeSubmenuAddComponent', () => {
  let component: MasterCustomizeSubmenuAddComponent;
  let fixture: ComponentFixture<MasterCustomizeSubmenuAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCustomizeSubmenuAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCustomizeSubmenuAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
