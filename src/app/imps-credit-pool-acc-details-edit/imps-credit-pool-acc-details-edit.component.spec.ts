import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsCreditPoolAccDetailsEditComponent } from './imps-credit-pool-acc-details-edit.component';

describe('ImpsCreditPoolAccDetailsEditComponent', () => {
  let component: ImpsCreditPoolAccDetailsEditComponent;
  let fixture: ComponentFixture<ImpsCreditPoolAccDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsCreditPoolAccDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsCreditPoolAccDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
