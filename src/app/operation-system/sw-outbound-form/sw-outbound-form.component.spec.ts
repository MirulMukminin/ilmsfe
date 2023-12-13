import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwOutboundFormComponent } from './sw-outbound-form.component';

describe('SwOutboundFormComponent', () => {
  let component: SwOutboundFormComponent;
  let fixture: ComponentFixture<SwOutboundFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwOutboundFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwOutboundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
