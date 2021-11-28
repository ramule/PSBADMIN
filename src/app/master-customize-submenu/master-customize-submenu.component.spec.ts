import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCustomizeSubmenuComponent } from './master-customize-submenu.component';

describe('MasterCustomizeSubmenuComponent', () => {
  let component: MasterCustomizeSubmenuComponent;
  let fixture: ComponentFixture<MasterCustomizeSubmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCustomizeSubmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCustomizeSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
