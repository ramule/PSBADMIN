import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpAccountUserTypeComponent } from './corp-account-user-type.component';

describe('CorpAccountUserTypeComponent', () => {
  let component: CorpAccountUserTypeComponent;
  let fixture: ComponentFixture<CorpAccountUserTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpAccountUserTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpAccountUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
