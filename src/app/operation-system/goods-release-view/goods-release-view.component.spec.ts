import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReleaseViewComponent } from './goods-release-view.component';

describe('GoodsReleaseViewComponent', () => {
  let component: GoodsReleaseViewComponent;
  let fixture: ComponentFixture<GoodsReleaseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsReleaseViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReleaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
