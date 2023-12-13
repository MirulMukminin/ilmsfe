import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbGoodsOutPreviewComponent } from './psb-goods-out-preview.component';

describe('PsbGoodsOutPreviewComponent', () => {
  let component: PsbGoodsOutPreviewComponent;
  let fixture: ComponentFixture<PsbGoodsOutPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbGoodsOutPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbGoodsOutPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
