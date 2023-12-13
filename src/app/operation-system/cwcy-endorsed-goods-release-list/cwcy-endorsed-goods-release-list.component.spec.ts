import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwcyEndorsedGoodsReleaseListComponent } from './cwcy-endorsed-goods-release-list.component';

describe('CwcyEndorsedGoodsReleaseListComponent', () => {
  let component: CwcyEndorsedGoodsReleaseListComponent;
  let fixture: ComponentFixture<CwcyEndorsedGoodsReleaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwcyEndorsedGoodsReleaseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwcyEndorsedGoodsReleaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
