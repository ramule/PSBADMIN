import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsCreditPoolAccDetailsComponent } from './imps-credit-pool-acc-details.component';

describe('ImpsCreditPoolAccDetailsComponent', () => {
  let component: ImpsCreditPoolAccDetailsComponent;
  let fixture: ComponentFixture<ImpsCreditPoolAccDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsCreditPoolAccDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsCreditPoolAccDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
