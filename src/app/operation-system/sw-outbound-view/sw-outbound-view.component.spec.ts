import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwOutboundViewComponent } from './sw-outbound-view.component';

describe('SwOutboundViewComponent', () => {
  let component: SwOutboundViewComponent;
  let fixture: ComponentFixture<SwOutboundViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwOutboundViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwOutboundViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
