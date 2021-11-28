import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLanguageEditComponent } from './master-language-edit.component';

describe('MasterLanguageEditComponent', () => {
  let component: MasterLanguageEditComponent;
  let fixture: ComponentFixture<MasterLanguageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLanguageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLanguageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
