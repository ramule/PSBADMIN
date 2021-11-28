import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessMenuRightDetailsComponent } from './access-menu-right-details.component';

describe('AccessMenuRightDetailsComponent', () => {
  let component: AccessMenuRightDetailsComponent;
  let fixture: ComponentFixture<AccessMenuRightDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessMenuRightDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessMenuRightDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
