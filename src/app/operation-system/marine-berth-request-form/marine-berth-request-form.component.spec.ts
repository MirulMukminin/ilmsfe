import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineBerthRequestFormComponent } from './marine-berth-request-form.component';

describe('MarineBerthRequestFormComponent', () => {
  let component: MarineBerthRequestFormComponent;
  let fixture: ComponentFixture<MarineBerthRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineBerthRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineBerthRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
