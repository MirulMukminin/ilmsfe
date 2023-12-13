import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MheComponent } from './mhe.component';

describe('MheComponent', () => {
  let component: MheComponent;
  let fixture: ComponentFixture<MheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
