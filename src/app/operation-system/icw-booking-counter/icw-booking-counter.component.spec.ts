import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwBookingCounterComponent } from './icw-booking-counter.component';

describe('IcwBookingCounterComponent', () => {
  let component: IcwBookingCounterComponent;
  let fixture: ComponentFixture<IcwBookingCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwBookingCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwBookingCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
