import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolePreviewComponent } from './console-preview.component';

describe('ConsolePreviewComponent', () => {
  let component: ConsolePreviewComponent;
  let fixture: ComponentFixture<ConsolePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
