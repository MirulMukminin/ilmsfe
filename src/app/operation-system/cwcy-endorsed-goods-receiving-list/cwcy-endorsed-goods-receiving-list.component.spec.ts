import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwcyEndorsedGoodsReceivingListComponent } from './cwcy-endorsed-goods-receiving-list.component';

describe('CwcyEndorsedGoodsReceivingListComponent', () => {
  let component: CwcyEndorsedGoodsReceivingListComponent;
  let fixture: ComponentFixture<CwcyEndorsedGoodsReceivingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwcyEndorsedGoodsReceivingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwcyEndorsedGoodsReceivingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
