import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwTwgListComponent } from './sw-twg-list.component';

describe('SwTwgListComponent', () => {
  let component: SwTwgListComponent;
  let fixture: ComponentFixture<SwTwgListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwTwgListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwTwgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
