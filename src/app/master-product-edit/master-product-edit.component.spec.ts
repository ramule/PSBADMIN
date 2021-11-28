import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterProductEditComponent } from './master-product-edit.component';


describe('MasterProductEditComponent', () => {
  let component: MasterProductEditComponent;
  let fixture: ComponentFixture<MasterProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterProductEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
