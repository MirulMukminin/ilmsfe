import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwcyGoodsReleaseRequestListComponent } from './cwcy-goods-release-request-list.component';

describe('CwcyGoodsReleaseRequestListComponent', () => {
  let component: CwcyGoodsReleaseRequestListComponent;
  let fixture: ComponentFixture<CwcyGoodsReleaseRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwcyGoodsReleaseRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwcyGoodsReleaseRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
