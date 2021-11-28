import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpDesignationLevelMappingAddComponent } from './corp-designation-level-mapping-add.component';

describe('CorpDesignationLevelMappingAddComponent', () => {
  let component: CorpDesignationLevelMappingAddComponent;
  let fixture: ComponentFixture<CorpDesignationLevelMappingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpDesignationLevelMappingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpDesignationLevelMappingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
