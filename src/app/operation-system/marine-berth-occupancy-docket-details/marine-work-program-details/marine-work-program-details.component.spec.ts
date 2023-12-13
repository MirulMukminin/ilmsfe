import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineWorkProgramDetailsComponent } from './marine-work-program-details.component';

describe('MarineWorkProgramDetailsComponent', () => {
  let component: MarineWorkProgramDetailsComponent;
  let fixture: ComponentFixture<MarineWorkProgramDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineWorkProgramDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineWorkProgramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
