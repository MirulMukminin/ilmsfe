import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsRecievingListComponent } from './goods-recieving-list.component';

describe('GoodsRecievingListComponent', () => {
  let component: GoodsRecievingListComponent;
  let fixture: ComponentFixture<GoodsRecievingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsRecievingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsRecievingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
