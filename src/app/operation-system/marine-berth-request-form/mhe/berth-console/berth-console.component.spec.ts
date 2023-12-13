import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerthConsoleComponent } from './berth-console.component';

describe('BerthConsoleComponent', () => {
  let component: BerthConsoleComponent;
  let fixture: ComponentFixture<BerthConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BerthConsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BerthConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
