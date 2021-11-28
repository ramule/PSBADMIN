import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsCreditPoolAccDetailsAddComponent } from './imps-credit-pool-acc-details-add.component';

describe('ImpsCreditPoolAccDetailsAddComponent', () => {
  let component: ImpsCreditPoolAccDetailsAddComponent;
  let fixture: ComponentFixture<ImpsCreditPoolAccDetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsCreditPoolAccDetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsCreditPoolAccDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
