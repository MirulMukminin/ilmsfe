import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineFuelwaterRequestFormComponent } from './marine-fuelwater-request-form.component';

describe('MarineFuelwaterRequestFormComponent', () => {
  let component: MarineFuelwaterRequestFormComponent;
  let fixture: ComponentFixture<MarineFuelwaterRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineFuelwaterRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineFuelwaterRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
