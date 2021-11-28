import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpDesignationLevelMappingComponent } from './corp-designation-level-mapping.component';

describe('CorpDesignationLevelMappingComponent', () => {
  let component: CorpDesignationLevelMappingComponent;
  let fixture: ComponentFixture<CorpDesignationLevelMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpDesignationLevelMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpDesignationLevelMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
