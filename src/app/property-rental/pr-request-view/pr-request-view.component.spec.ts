import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrRequestViewComponent } from './pr-request-view.component';

describe('PrRequestViewComponent', () => {
  let component: PrRequestViewComponent;
  let fixture: ComponentFixture<PrRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrRequestViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
