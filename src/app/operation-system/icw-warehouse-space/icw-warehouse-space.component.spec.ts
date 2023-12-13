import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwWarehouseSpaceComponent } from './icw-warehouse-space.component';

describe('IcwWarehouseSpaceComponent', () => {
  let component: IcwWarehouseSpaceComponent;
  let fixture: ComponentFixture<IcwWarehouseSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwWarehouseSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwWarehouseSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
