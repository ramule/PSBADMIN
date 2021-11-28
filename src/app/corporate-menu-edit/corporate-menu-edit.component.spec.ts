import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateMenuEditComponent } from './corporate-menu-edit.component';

describe('CorporateMenuEditComponent', () => {
  let component: CorporateMenuEditComponent;
  let fixture: ComponentFixture<CorporateMenuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateMenuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateMenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
