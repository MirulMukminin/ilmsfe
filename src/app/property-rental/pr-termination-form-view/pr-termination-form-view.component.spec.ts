import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrTerminationFormViewComponent } from './pr-termination-form-view.component';

describe('PrTerminationFormViewComponent', () => {
  let component: PrTerminationFormViewComponent;
  let fixture: ComponentFixture<PrTerminationFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrTerminationFormViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrTerminationFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
