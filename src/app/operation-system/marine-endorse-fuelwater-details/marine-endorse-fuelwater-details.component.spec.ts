import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineEndorseFuelwaterDetailsComponent } from './marine-endorse-fuelwater-details.component';

describe('MarineEndorseFuelwaterDetailsComponent', () => {
  let component: MarineEndorseFuelwaterDetailsComponent;
  let fixture: ComponentFixture<MarineEndorseFuelwaterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineEndorseFuelwaterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineEndorseFuelwaterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
