import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwInboundPreviewComponent } from './sw-inbound-preview.component';

describe('SwInboundPreviewComponent', () => {
  let component: SwInboundPreviewComponent;
  let fixture: ComponentFixture<SwInboundPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwInboundPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwInboundPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
