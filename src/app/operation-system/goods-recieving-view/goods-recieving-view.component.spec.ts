import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsRecievingViewComponent } from './goods-recieving-view.component';

describe('GoodsRecievingViewComponent', () => {
  let component: GoodsRecievingViewComponent;
  let fixture: ComponentFixture<GoodsRecievingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsRecievingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsRecievingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
