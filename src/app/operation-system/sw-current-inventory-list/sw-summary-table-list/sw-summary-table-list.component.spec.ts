import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwSummaryTableListComponent } from './sw-summary-table-list.component';

describe('SwSummaryTableListComponent', () => {
  let component: SwSummaryTableListComponent;
  let fixture: ComponentFixture<SwSummaryTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwSummaryTableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwSummaryTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
