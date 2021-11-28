import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserComponent } from './corporate-user.component';

describe('CorporateUserComponent', () => {
  let component: CorporateUserComponent;
  let fixture: ComponentFixture<CorporateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
