import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwcyGoodsReleaseFormComponent } from './cwcy-goods-release-form.component';

describe('CwcyGoodsReleaseFormComponent', () => {
  let component: CwcyGoodsReleaseFormComponent;
  let fixture: ComponentFixture<CwcyGoodsReleaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwcyGoodsReleaseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwcyGoodsReleaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
