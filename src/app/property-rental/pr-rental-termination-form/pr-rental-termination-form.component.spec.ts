import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrRentalTerminationFormComponent } from './pr-rental-termination-form.component';

describe('PrRentalTerminationFormComponent', () => {
  let component: PrRentalTerminationFormComponent;
  let fixture: ComponentFixture<PrRentalTerminationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrRentalTerminationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrRentalTerminationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
