import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwTwgViewComponent } from './sw-twg-view.component';

describe('SwTwgViewComponent', () => {
  let component: SwTwgViewComponent;
  let fixture: ComponentFixture<SwTwgViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwTwgViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwTwgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
