import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineServiceRequestListPreviewComponent } from './marine-service-request-list-preview.component';

describe('MarineServiceRequestListPreviewComponent', () => {
  let component: MarineServiceRequestListPreviewComponent;
  let fixture: ComponentFixture<MarineServiceRequestListPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineServiceRequestListPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineServiceRequestListPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
