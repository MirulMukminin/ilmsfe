import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrRentalRequestFormComponent } from './pr-rental-request-form.component';

describe('PrRentalRequestFormComponent', () => {
  let component: PrRentalRequestFormComponent;
  let fixture: ComponentFixture<PrRentalRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrRentalRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrRentalRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
