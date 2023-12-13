import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderdeckComponent } from './underdeck.component';

describe('UnderdeckComponent', () => {
  let component: UnderdeckComponent;
  let fixture: ComponentFixture<UnderdeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderdeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderdeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
