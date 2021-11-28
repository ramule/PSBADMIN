import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLanguageAddComponent } from './master-language-add.component';

describe('MasterLanguageAddComponent', () => {
  let component: MasterLanguageAddComponent;
  let fixture: ComponentFixture<MasterLanguageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLanguageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLanguageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
