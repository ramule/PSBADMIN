import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAnnouncementAddComponent } from './corporate-announcement-add.component';

describe('CorporateAnnouncementAddComponent', () => {
  let component: CorporateAnnouncementAddComponent;
  let fixture: ComponentFixture<CorporateAnnouncementAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAnnouncementAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAnnouncementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
