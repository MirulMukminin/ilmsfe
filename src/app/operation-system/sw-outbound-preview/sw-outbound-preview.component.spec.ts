import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwOutboundPreviewComponent } from './sw-outbound-preview.component';

describe('SwOutboundPreviewComponent', () => {
  let component: SwOutboundPreviewComponent;
  let fixture: ComponentFixture<SwOutboundPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwOutboundPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwOutboundPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
