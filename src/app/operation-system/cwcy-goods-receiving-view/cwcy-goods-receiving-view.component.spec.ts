import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwcyGoodsReceivingViewComponent } from './cwcy-goods-receiving-view.component';

describe('CwcyGoodsReceivingViewComponent', () => {
  let component: CwcyGoodsReceivingViewComponent;
  let fixture: ComponentFixture<CwcyGoodsReceivingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwcyGoodsReceivingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwcyGoodsReceivingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
