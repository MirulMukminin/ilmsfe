import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerFormPreviewComponent } from './seller-form-preview.component';

describe('SellerFormPreviewComponent', () => {
  let component: SellerFormPreviewComponent;
  let fixture: ComponentFixture<SellerFormPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerFormPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerFormPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
