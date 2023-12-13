import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineBerthRequestListPreviewComponent } from './marine-berth-request-list-preview.component';

describe('MarineBerthRequestListPreviewComponent', () => {
  let component: MarineBerthRequestListPreviewComponent;
  let fixture: ComponentFixture<MarineBerthRequestListPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineBerthRequestListPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineBerthRequestListPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
