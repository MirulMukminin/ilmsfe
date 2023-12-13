import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineServiceRequestListComponent } from './marine-service-request-list.component';

describe('MarineBerthRequestListComponent', () => {
  let component: MarineServiceRequestListComponent;
  let fixture: ComponentFixture<MarineServiceRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineServiceRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineServiceRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
