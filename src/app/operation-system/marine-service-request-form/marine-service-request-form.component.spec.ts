import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineServiceRequestFormComponent } from './marine-service-request-form.component';

describe('MarineServiceRequestFormComponent', () => {
  let component: MarineServiceRequestFormComponent;
  let fixture: ComponentFixture<MarineServiceRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineServiceRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineServiceRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
