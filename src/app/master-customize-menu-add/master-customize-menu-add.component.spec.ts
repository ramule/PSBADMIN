import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCustomizeMenuAddComponent } from './master-customize-menu-add.component';

describe('MasterCustomizeMenuAddComponent', () => {
  let component: MasterCustomizeMenuAddComponent;
  let fixture: ComponentFixture<MasterCustomizeMenuAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCustomizeMenuAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCustomizeMenuAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
