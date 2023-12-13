import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwInboundViewComponent } from './sw-inbound-view.component';

describe('SwInboundViewComponent', () => {
  let component: SwInboundViewComponent;
  let fixture: ComponentFixture<SwInboundViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwInboundViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwInboundViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
