import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerRewardPointsComponent } from './customer-reward-points.component';


describe('CustomerRewardPointsComponent', () => {
  let component: CustomerRewardPointsComponent;
  let fixture: ComponentFixture<CustomerRewardPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRewardPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRewardPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
