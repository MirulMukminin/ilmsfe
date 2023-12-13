import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsRecievingEndorsedViewComponent } from './goods-recieving-endorsed-view.component';

describe('GoodsRecievingEndorsedViewComponent', () => {
  let component: GoodsRecievingEndorsedViewComponent;
  let fixture: ComponentFixture<GoodsRecievingEndorsedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsRecievingEndorsedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsRecievingEndorsedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
