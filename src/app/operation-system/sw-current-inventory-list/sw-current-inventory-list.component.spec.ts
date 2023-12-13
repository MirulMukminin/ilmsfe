import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwCurrentInventoryListComponent } from './sw-current-inventory-list.component';

describe('SwCurrentInventoryListComponent', () => {
  let component: SwCurrentInventoryListComponent;
  let fixture: ComponentFixture<SwCurrentInventoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwCurrentInventoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwCurrentInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
