import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwTwgPrintComponent } from './sw-twg-print.component';

describe('SwTwgPrintComponent', () => {
  let component: SwTwgPrintComponent;
  let fixture: ComponentFixture<SwTwgPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwTwgPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwTwgPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
