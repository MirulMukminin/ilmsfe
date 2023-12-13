import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbGoodsOutFormComponent } from './psb-goods-out-form.component';

describe('PsbGoodsOutFormComponent', () => {
  let component: PsbGoodsOutFormComponent;
  let fixture: ComponentFixture<PsbGoodsOutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbGoodsOutFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbGoodsOutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
