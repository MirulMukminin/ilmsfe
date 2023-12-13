import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbGoodsInPreviewComponent } from './psb-goods-in-preview.component';

describe('PsbGoodsInPreviewComponent', () => {
  let component: PsbGoodsInPreviewComponent;
  let fixture: ComponentFixture<PsbGoodsInPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbGoodsInPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbGoodsInPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
