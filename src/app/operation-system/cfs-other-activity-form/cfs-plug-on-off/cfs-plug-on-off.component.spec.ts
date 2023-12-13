import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsPlugOnOffComponent } from './cfs-plug-on-off.component';

describe('CfsPlugOnOffComponent', () => {
  let component: CfsPlugOnOffComponent;
  let fixture: ComponentFixture<CfsPlugOnOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfsPlugOnOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsPlugOnOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
