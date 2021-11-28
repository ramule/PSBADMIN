import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycDocumentListComponent } from './kyc-document-list.component';

describe('KycDocumentListComponent', () => {
  let component: KycDocumentListComponent;
  let fixture: ComponentFixture<KycDocumentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycDocumentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
