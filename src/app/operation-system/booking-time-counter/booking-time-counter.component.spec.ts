import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTimeCounterComponent } from './booking-time-counter.component';

describe('BookingTimeCounterComponent', () => {
  let component: BookingTimeCounterComponent;
  let fixture: ComponentFixture<BookingTimeCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingTimeCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTimeCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
