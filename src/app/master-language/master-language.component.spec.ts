import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLanguageComponent } from './master-language.component';

describe('MasterLanguageComponent', () => {
  let component: MasterLanguageComponent;
  let fixture: ComponentFixture<MasterLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
