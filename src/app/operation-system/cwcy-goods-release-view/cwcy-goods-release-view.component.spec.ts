import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwcyGoodsReleaseViewComponent } from './cwcy-goods-release-view.component';

describe('CwcyGoodsReleaseViewComponent', () => {
  let component: CwcyGoodsReleaseViewComponent;
  let fixture: ComponentFixture<CwcyGoodsReleaseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwcyGoodsReleaseViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwcyGoodsReleaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
