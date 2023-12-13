import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrTerminationListComponent } from './pr-termination-list.component';

describe('PrTerminationListComponent', () => {
  let component: PrTerminationListComponent;
  let fixture: ComponentFixture<PrTerminationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrTerminationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrTerminationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
