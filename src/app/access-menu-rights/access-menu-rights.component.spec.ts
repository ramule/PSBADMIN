import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessMenuRightsComponent } from './access-menu-rights.component';

describe('AccessMenuRightsComponent', () => {
  let component: AccessMenuRightsComponent;
  let fixture: ComponentFixture<AccessMenuRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessMenuRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessMenuRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
