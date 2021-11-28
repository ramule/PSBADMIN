import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessCustomizeMenuComponent } from './access-customize-menu.component';

describe('AccessCustomizeMenuComponent', () => {
  let component: AccessCustomizeMenuComponent;
  let fixture: ComponentFixture<AccessCustomizeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessCustomizeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessCustomizeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
