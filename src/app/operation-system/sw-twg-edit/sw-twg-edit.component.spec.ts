import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwTwgEditComponent } from './sw-twg-edit.component';

describe('SwTwgEditComponent', () => {
  let component: SwTwgEditComponent;
  let fixture: ComponentFixture<SwTwgEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwTwgEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwTwgEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
