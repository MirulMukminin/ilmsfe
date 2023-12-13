import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwInboundOutboundListComponent } from './sw-inbound-outbound-list.component';

describe('SwInboundOutboundListComponent', () => {
  let component: SwInboundOutboundListComponent;
  let fixture: ComponentFixture<SwInboundOutboundListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwInboundOutboundListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwInboundOutboundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
