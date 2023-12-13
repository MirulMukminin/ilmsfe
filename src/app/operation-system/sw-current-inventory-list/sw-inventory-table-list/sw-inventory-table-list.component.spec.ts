import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwInventoryTableListComponent } from './sw-inventory-table-list.component';

describe('SwInventoryTableListComponent', () => {
  let component: SwInventoryTableListComponent;
  let fixture: ComponentFixture<SwInventoryTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwInventoryTableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwInventoryTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
