import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycDocumentAddComponent } from './kyc-document-add.component';

describe('KycDocumentAddComponent', () => {
  let component: KycDocumentAddComponent;
  let fixture: ComponentFixture<KycDocumentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycDocumentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycDocumentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
