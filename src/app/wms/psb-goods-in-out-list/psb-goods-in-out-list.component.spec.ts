import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbGoodsInOutListComponent } from './psb-goods-in-out-list.component';

describe('PsbGoodsInOutListComponent', () => {
  let component: PsbGoodsInOutListComponent;
  let fixture: ComponentFixture<PsbGoodsInOutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbGoodsInOutListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbGoodsInOutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
