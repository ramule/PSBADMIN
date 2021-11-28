import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLanguageKeyComponent } from './master-language-key.component';

describe('MasterLanguageKeyComponent', () => {
  let component: MasterLanguageKeyComponent;
  let fixture: ComponentFixture<MasterLanguageKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLanguageKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLanguageKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
