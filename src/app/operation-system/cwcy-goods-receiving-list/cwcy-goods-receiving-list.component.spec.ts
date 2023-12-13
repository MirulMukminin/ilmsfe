import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwcyGoodsReceivingListComponent } from './cwcy-goods-receiving-list.component';

describe('CwcyGoodsReceivingListComponent', () => {
  let component: CwcyGoodsReceivingListComponent;
  let fixture: ComponentFixture<CwcyGoodsReceivingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwcyGoodsReceivingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwcyGoodsReceivingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
