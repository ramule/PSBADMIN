import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpDesignationLevelMappingEditComponent } from './corp-designation-level-mapping-edit.component';

describe('CorpDesignationLevelMappingEditComponent', () => {
  let component: CorpDesignationLevelMappingEditComponent;
  let fixture: ComponentFixture<CorpDesignationLevelMappingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpDesignationLevelMappingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpDesignationLevelMappingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
