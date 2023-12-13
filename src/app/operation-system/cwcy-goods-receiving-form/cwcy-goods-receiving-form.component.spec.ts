import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwcyGoodsReceivingFormComponent } from './cwcy-goods-receiving-form.component';

describe('CwcyGoodsReceivingFormComponent', () => {
  let component: CwcyGoodsReceivingFormComponent;
  let fixture: ComponentFixture<CwcyGoodsReceivingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwcyGoodsReceivingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwcyGoodsReceivingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
