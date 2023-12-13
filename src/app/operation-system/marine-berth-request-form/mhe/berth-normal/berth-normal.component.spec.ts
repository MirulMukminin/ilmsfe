import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerthNormalComponent } from './berth-normal.component';

describe('BerthNormalComponent', () => {
  let component: BerthNormalComponent;
  let fixture: ComponentFixture<BerthNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BerthNormalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BerthNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
