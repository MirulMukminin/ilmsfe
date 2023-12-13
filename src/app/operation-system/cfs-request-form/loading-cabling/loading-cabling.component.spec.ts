import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCablingComponent } from './loading-cabling.component';

describe('LoadingCablingComponent', () => {
  let component: LoadingCablingComponent;
  let fixture: ComponentFixture<LoadingCablingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingCablingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingCablingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
