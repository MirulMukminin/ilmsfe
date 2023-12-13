import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReleaseFormComponent } from './goods-release-form.component';

describe('GoodsReleaseFormComponent', () => {
  let component: GoodsReleaseFormComponent;
  let fixture: ComponentFixture<GoodsReleaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsReleaseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReleaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
