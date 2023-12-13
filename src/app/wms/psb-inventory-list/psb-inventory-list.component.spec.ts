import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbInventoryListComponent } from './psb-inventory-list.component';

describe('PsbInventoryListComponent', () => {
  let component: PsbInventoryListComponent;
  let fixture: ComponentFixture<PsbInventoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbInventoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
