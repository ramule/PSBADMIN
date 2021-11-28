import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateMenuComponent } from './corporate-menu.component';

describe('CorporateMenuComponent', () => {
  let component: CorporateMenuComponent;
  let fixture: ComponentFixture<CorporateMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
