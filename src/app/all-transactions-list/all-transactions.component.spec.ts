import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllTranscationListComponent } from './all-transactions.component';


describe('AllTranscationListComponent', () => {
  let component: AllTranscationListComponent;
  let fixture: ComponentFixture<AllTranscationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTranscationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTranscationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
