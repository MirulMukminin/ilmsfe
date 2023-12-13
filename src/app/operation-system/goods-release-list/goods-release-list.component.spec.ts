import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReleaseListComponent } from './goods-release-list.component';

describe('GoodsReleaseListComponent', () => {
  let component: GoodsReleaseListComponent;
  let fixture: ComponentFixture<GoodsReleaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsReleaseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReleaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
