import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessCustomizeMenuDetailsComponent } from './access-customize-menu-details.component';

describe('AccessCustomizeMenuDetailsComponent', () => {
  let component: AccessCustomizeMenuDetailsComponent;
  let fixture: ComponentFixture<AccessCustomizeMenuDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessCustomizeMenuDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessCustomizeMenuDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
