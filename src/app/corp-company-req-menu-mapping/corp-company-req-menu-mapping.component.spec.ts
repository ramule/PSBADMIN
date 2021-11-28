import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpCompanyReqMenuMappingComponent } from './corp-company-req-menu-mapping.component';

describe('CorpCompanyReqMenuMappingComponent', () => {
  let component: CorpCompanyReqMenuMappingComponent;
  let fixture: ComponentFixture<CorpCompanyReqMenuMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpCompanyReqMenuMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpCompanyReqMenuMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
