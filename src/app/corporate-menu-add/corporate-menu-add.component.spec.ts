import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateMenuAddComponent } from './corporate-menu-add.component';

describe('CorporateMenuAddComponent', () => {
  let component: CorporateMenuAddComponent;
  let fixture: ComponentFixture<CorporateMenuAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateMenuAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateMenuAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
