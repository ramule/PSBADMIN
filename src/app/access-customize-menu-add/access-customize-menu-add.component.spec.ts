import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessCustomizeMenuAddComponent } from './access-customize-menu-add.component';

describe('AccessCustomizeMenuAddComponent', () => {
  let component: AccessCustomizeMenuAddComponent;
  let fixture: ComponentFixture<AccessCustomizeMenuAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessCustomizeMenuAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessCustomizeMenuAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
