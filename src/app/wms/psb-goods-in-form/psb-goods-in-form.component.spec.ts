import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbGoodsInFormComponent } from './psb-goods-in-form.component';

describe('PsbGoodsInFormComponent', () => {
  let component: PsbGoodsInFormComponent;
  let fixture: ComponentFixture<PsbGoodsInFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbGoodsInFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbGoodsInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
