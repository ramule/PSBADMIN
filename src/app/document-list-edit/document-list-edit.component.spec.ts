import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListEditComponent } from './document-list-edit.component';

describe('DocumentListEditComponent', () => {
  let component: DocumentListEditComponent;
  let fixture: ComponentFixture<DocumentListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
