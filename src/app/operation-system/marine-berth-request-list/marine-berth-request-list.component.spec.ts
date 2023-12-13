import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineBerthRequestListComponent } from './marine-berth-request-list.component';

describe('MarineBerthRequestListComponent', () => {
  let component: MarineBerthRequestListComponent;
  let fixture: ComponentFixture<MarineBerthRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineBerthRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineBerthRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
