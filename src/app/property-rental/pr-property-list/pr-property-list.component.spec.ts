import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrPropertyListComponent } from './pr-property-list.component';

describe('PrPropertyListComponent', () => {
  let component: PrPropertyListComponent;
  let fixture: ComponentFixture<PrPropertyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrPropertyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrPropertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
