import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlugOnOffComponent } from './plug-on-off.component';

describe('PlugOnOffComponent', () => {
  let component: PlugOnOffComponent;
  let fixture: ComponentFixture<PlugOnOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlugOnOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlugOnOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
