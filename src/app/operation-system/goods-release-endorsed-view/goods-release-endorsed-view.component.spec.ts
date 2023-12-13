import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReleaseEndorsedViewComponent } from './goods-release-endorsed-view.component';

describe('GoodsReleaseEndorsedViewComponent', () => {
  let component: GoodsReleaseEndorsedViewComponent;
  let fixture: ComponentFixture<GoodsReleaseEndorsedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsReleaseEndorsedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReleaseEndorsedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
