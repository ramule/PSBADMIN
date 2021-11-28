import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycFolderAddComponent } from './kyc-folder-add.component';

describe('KycFolderAddComponent', () => {
  let component: KycFolderAddComponent;
  let fixture: ComponentFixture<KycFolderAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycFolderAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycFolderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
