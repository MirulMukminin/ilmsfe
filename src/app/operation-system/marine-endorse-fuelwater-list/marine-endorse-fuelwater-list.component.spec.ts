import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineEndorseFuelwaterListComponent } from './marine-endorse-fuelwater-list.component';

describe('MarineEndorseFuelwaterListComponent', () => {
  let component: MarineEndorseFuelwaterListComponent;
  let fixture: ComponentFixture<MarineEndorseFuelwaterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineEndorseFuelwaterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineEndorseFuelwaterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
