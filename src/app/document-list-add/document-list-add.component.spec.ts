import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListAddComponent } from './document-list-add.component';

describe('DocumentListAddComponent', () => {
  let component: DocumentListAddComponent;
  let fixture: ComponentFixture<DocumentListAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
