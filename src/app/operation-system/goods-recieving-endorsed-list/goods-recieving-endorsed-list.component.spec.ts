import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsRecievingEndorsedListComponent } from './goods-recieving-endorsed-list.component';

describe('GoodsRecievingEndorsedListComponent', () => {
  let component: GoodsRecievingEndorsedListComponent;
  let fixture: ComponentFixture<GoodsRecievingEndorsedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsRecievingEndorsedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsRecievingEndorsedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
