import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAnnouncementEditComponent } from './corporate-announcement-edit.component';

describe('CorporateAnnouncementEditComponent', () => {
  let component: CorporateAnnouncementEditComponent;
  let fixture: ComponentFixture<CorporateAnnouncementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAnnouncementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAnnouncementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
