import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsRecievingFormComponent } from './goods-recieving-form.component';

describe('GoodsRecievingFormComponent', () => {
  let component: GoodsRecievingFormComponent;
  let fixture: ComponentFixture<GoodsRecievingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsRecievingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsRecievingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
