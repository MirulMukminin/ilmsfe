import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwTwgFormComponent } from './sw-twg-form.component';

describe('SwTwgFormComponent', () => {
  let component: SwTwgFormComponent;
  let fixture: ComponentFixture<SwTwgFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwTwgFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwTwgFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
