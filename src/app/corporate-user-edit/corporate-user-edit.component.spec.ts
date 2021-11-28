import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserEditComponent } from './corporate-user-edit.component';

describe('CorporateUserEditComponent', () => {
  let component: CorporateUserEditComponent;
  let fixture: ComponentFixture<CorporateUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
