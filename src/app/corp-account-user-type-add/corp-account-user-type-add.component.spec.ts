import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpAccountUserTypeAddComponent } from './corp-account-user-type-add.component';

describe('CorpAccountUserTypeAddComponent', () => {
  let component: CorpAccountUserTypeAddComponent;
  let fixture: ComponentFixture<CorpAccountUserTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpAccountUserTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpAccountUserTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
