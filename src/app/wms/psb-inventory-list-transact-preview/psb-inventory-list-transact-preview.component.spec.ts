import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbInventoryListTransactPreviewComponent } from './psb-inventory-list-transact-preview.component';

describe('PsbInventoryListTransactPreviewComponent', () => {
  let component: PsbInventoryListTransactPreviewComponent;
  let fixture: ComponentFixture<PsbInventoryListTransactPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbInventoryListTransactPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbInventoryListTransactPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
