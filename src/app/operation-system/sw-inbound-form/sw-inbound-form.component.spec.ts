import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwInboundFormComponent } from './sw-inbound-form.component';

describe('SwInboundFormComponent', () => {
  let component: SwInboundFormComponent;
  let fixture: ComponentFixture<SwInboundFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwInboundFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwInboundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
