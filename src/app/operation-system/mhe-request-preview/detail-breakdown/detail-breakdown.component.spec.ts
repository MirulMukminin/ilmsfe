import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBreakdownComponent } from './detail-breakdown.component';

describe('DetailBreakdownComponent', () => {
  let component: DetailBreakdownComponent;
  let fixture: ComponentFixture<DetailBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBreakdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
