import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReleaseEndorsedListComponent } from './goods-release-endorsed-list.component';

describe('GoodsReleaseEndorsedListComponent', () => {
  let component: GoodsReleaseEndorsedListComponent;
  let fixture: ComponentFixture<GoodsReleaseEndorsedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsReleaseEndorsedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReleaseEndorsedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
